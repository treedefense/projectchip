package main

//go:generate go run github.com/opendoor/pggen/cmd/pggen -o db/models.gen.go -c $DB_URL pggen.toml
//go:generate go run github.com/99designs/gqlgen

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/jackc/pgx/v4/stdlib"
	"github.com/treedefense/projectchip/db"
	"github.com/treedefense/projectchip/graph"
	"github.com/treedefense/projectchip/resolvers"
)

const defaultPort = "8080"

func main() {
	// TODO: configs
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	dbUrl := os.Getenv("DB_URL")
	if dbUrl == "" {
		dbUrl = "postgres://postgres:password@localhost/projectchip"
	}

	conn, err := sql.Open("pgx", dbUrl)
	if err != nil {
		log.Fatal(err)
	}

	pgClient := db.NewPGClient(conn)

	schemaConfig := graph.Config{
		Resolvers: &resolvers.Resolver{
			Db: pgClient,
		},
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(schemaConfig))

	http.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/playground for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
