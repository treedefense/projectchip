package main

//go:generate go run github.com/opendoor/pggen/cmd/pggen -o db/models.gen.go -c $DB_URL pggen.toml
//go:generate go run github.com/99designs/gqlgen

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/caarlos0/env/v6"
	"github.com/joho/godotenv"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/jackc/pgx/v4/stdlib"
	"github.com/rs/cors"
	"github.com/treedefense/projectchip/db"
	"github.com/treedefense/projectchip/graph"
	"github.com/treedefense/projectchip/resolvers"
)

type Config struct {
	Address     string `env:"ADDRESS" envDefault:"localhost"`
	Port        string `env:"PORT" envDefault:"8080"`
	DatabaseUrl string `env:"DB_URL" envDefault:"postgres://postgres:password@localhost/projectchip"`
	// add auth stuff
}

type Server struct {
	config *Config
}

func NewServer(config *Config) (*Server, error) {
	conn, err := sql.Open("pgx", config.DatabaseUrl)
	if err != nil {
		return nil, fmt.Errorf("unable to connect to db: %w", err)
	}

	pgClient := db.NewPGClient(conn)

	schemaConfig := graph.Config{
		Resolvers: &resolvers.Resolver{
			Db: pgClient,
		},
	}

	// Add CORS middleware around every request
	// See https://github.com/rs/cors for full option listing
	// TODO: Disable cors when we use a single domain
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
		Debug:            true,
	})

	graphQLServer := handler.NewDefaultServer(graph.NewExecutableSchema(schemaConfig))

	s := &Server{
		config: config,
	}

	http.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", c.Handler(graphQLServer))
	http.HandleFunc("/callback", s.AuthCallback)
	http.HandleFunc("/logout", s.AuthLogout)

	return s, nil
}

func (s *Server) AuthCallback(w http.ResponseWriter, req *http.Request) {
}

func (s *Server) AuthLogout(w http.ResponseWriter, req *http.Request) {
}

func (s *Server) ServeHTTP() error {
	log.Printf("http://%s:%s/playground for GraphQL playground", s.config.Address, s.config.Port)
	return http.ListenAndServe(fmt.Sprintf("%v:%v", s.config.Address, s.config.Port), nil)
}

func main() {
	_ = godotenv.Load()

	config := &Config{}
	if err := env.Parse(config); err != nil {
		log.Fatal(fmt.Errorf("unable to load config: %w", err))
	}

	server, err := NewServer(config)
	if err != nil {
		log.Fatal(fmt.Errorf("unable to create server: %w", err))
	}

	log.Fatal(server.ServeHTTP())
}
