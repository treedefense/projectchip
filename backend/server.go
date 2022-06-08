package main

//go:generate go run github.com/opendoor/pggen/cmd/pggen -o db/models.gen.go -c $DB_URL pggen.toml
//go:generate go run github.com/99designs/gqlgen

import (
	"context"
	"database/sql"
	"embed"
	"errors"
	"fmt"
	"io/fs"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/caarlos0/env/v6"
	"github.com/joho/godotenv"

	"github.com/lestrrat-go/jwx/jwk"
	"github.com/lestrrat-go/jwx/jwt"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/jackc/pgx/v4/stdlib"
	"github.com/treedefense/projectchip/db"
	"github.com/treedefense/projectchip/graph"
	"github.com/treedefense/projectchip/resolvers"
)

const (
	authHeader  = "Authorization"
	ctxTokenKey = "Auth0Token"
)

var (
	//go:embed resources
	resources embed.FS
)

type Config struct {
	Address         string `env:"ADDRESS" envDefault:"localhost"`
	Port            string `env:"PORT" envDefault:"8080"`
	DatabaseUrl     string `env:"DB_URL" envDefault:"postgres://postgres:password@localhost/projectchip"`
	AuthDomain      string `env:"AUTH0_DOMAIN"`
	AuthClientID    string `env:"AUTH0_CLIENT_ID"`
	AuthSecret      string `env:"AUTH0_CLIENT_SECRET"`
	AuthCallbackUrl string `env:"AUTH0_CALLBACK_URL"`
	AuthAudience    string `env:"AUTH0_AUDIENCE"`
}

type Server struct {
	config     *Config
	tenantKeys jwk.Set
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

	graphQLServer := handler.NewDefaultServer(graph.NewExecutableSchema(schemaConfig))

	s := &Server{
		config: config,
	}

	set, err := jwk.Fetch(
		context.Background(),
		fmt.Sprintf("https://%s/.well-known/jwks.json", config.AuthDomain),
	)
	if err != nil {
		log.Fatalf("failed to parse tenant json web keys: %s\n", err)
	}
	s.tenantKeys = set

	http.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", s.validateToken(graphQLServer))
	http.HandleFunc("/login", func(w http.ResponseWriter, req *http.Request) {
		w.Write([]byte("trying to login"))
	})
	http.HandleFunc("/logout", func(w http.ResponseWriter, req *http.Request) {
		w.Write([]byte("trying to logout"))
	})

	var htmlFS, _ = fs.Sub(resources, "resources")
	indexFile, _ := htmlFS.Open("index.html")
	indexBytes, _ := ioutil.ReadAll(indexFile)
	htmlFileServer := http.FileServer(http.FS(htmlFS))

	http.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		_, err := htmlFS.Open(strings.TrimLeft(req.URL.Path, "/"))
		if err != nil {
			// file not found, load the index instead
			w.Write(indexBytes)
		} else {
			htmlFileServer.ServeHTTP(w, req)
		}
	})

	return s, nil
}

func (s *Server) validateToken(next http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		token, err := s.extractToken(req)
		if err != nil {
			fmt.Printf("failed to parse payload: %s\n", err)
			rw.WriteHeader(http.StatusUnauthorized)
			return
		}
		ctxWithToken := context.WithValue(req.Context(), ctxTokenKey, token)
		next.ServeHTTP(rw, req.WithContext(ctxWithToken))
	})
}

// extractToken parses the Authorization HTTP header for valid JWT token and
// validates it with AUTH0 JWK keys. Also verifies if the audience present in
// the token matches with the designated audience as per current configuration.
func (s *Server) extractToken(req *http.Request) (jwt.Token, error) {
	authorization := req.Header.Get(authHeader)
	if authorization == "" {
		return nil, errors.New("authorization header missing")
	}

	bearerAndToken := strings.Split(authorization, " ")
	if len(bearerAndToken) < 2 {
		return nil, errors.New("malformed authorization header: " + authorization)
	}

	token, err := jwt.Parse(
		[]byte(bearerAndToken[1]),
		jwt.WithKeySet(s.tenantKeys),
		jwt.WithValidate(true),
		jwt.WithAudience(s.config.AuthAudience),
	)

	if err != nil {
		return nil, err
	}

	return token, nil
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
