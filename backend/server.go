package main

//go:generate go run github.com/99designs/gqlgen
//go:generate go run github.com/kyleconroy/sqlc/cmd/sqlc generate

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/treedefense/projectchip/graph/generated"
	"github.com/treedefense/projectchip/resolvers"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// Entry point:
	// Build all necessary connections

	// Repositories: Interfaces to our database
	// Repo Implementations: our actual databases, built in the entry point
	// Resolvers: External requests, convert to the proper types and handled

	/* DONT DO
	type LocationDatabase struct {
		postgres DB
	}

	func (ld *LocationDatabase) GetLocation(id string) *Location {
		panic("asdfasdf")
	}
	*/

	/* Do
	type LocationRepository interface {
		GetLocation(id string): *Location
	}

	type locationDatabase struct {
		postgres DB
	}

	func NewPostgresLocationDatabase(db *DB) *locationDatabase {
		return &locationDatabase{
			postgres: db,
		}
	}

	func (ld *locationDatabase) GetLocation(id string) *Location {
		panic("asdfasdf")
	}

	type cachedLocationDatabase struct {
		cache map[string]*Location
		implementation LocationRepository
	}

	func NewCachedLocationDatabase(repo LocationRepository) *cachedLocationDatabase {
		return &cachedLocationDatabase{
			implementation: repo,
		}
	}

	func (ld *cachedLocationDatabase) GetLocation(id string) *Location {
		// if we have it in our map just return it
		// otherwise grab it from the implementation
		// cache then
		// then return it
	}
	*/

	schemaConfig := generated.Config{
		Resolvers: &resolvers.Resolver{},
	}

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(schemaConfig))

	http.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/playground for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
