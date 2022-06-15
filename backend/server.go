package main

//go:generate go run github.com/opendoor/pggen/cmd/pggen -o db/models.gen.go -c $DB_URL pggen.toml
//go:generate go run github.com/99designs/gqlgen

import (
	"database/sql"
	"embed"
	"fmt"
	"io/fs"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"

	// "encoding/json"
	"time"

	"github.com/auth0/go-jwt-middleware/v2/jwks"
	"github.com/auth0/go-jwt-middleware/v2/validator"

	"github.com/caarlos0/env/v6"
	"github.com/joho/godotenv"

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
	Address          string `env:"ADDRESS" envDefault:"localhost"`
	Port             string `env:"PORT" envDefault:"8080"`
	DatabaseUrl      string `env:"DB_URL" envDefault:"postgres://postgres:password@localhost/projectchip"`
	AuthDomain       string `env:"AUTH0_DOMAIN"`
	AuthClientID     string `env:"AUTH0_CLIENT_ID"`
	AuthSecret       string `env:"AUTH0_CLIENT_SECRET"`
	AuthAudience     string `env:"AUTH0_AUDIENCE"`
	AuthCallbackPath string `env:"CALLBACK_PATH"`
	AuthLoginPath    string `env:"LOGIN_PATH"`
	AuthLogoutPath   string `env:"LOGOUT_PATH"`
}

type Server struct {
	config       *Config
	jwtProvider  *jwks.CachingProvider
	jwtValidator *validator.Validator
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

	http.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", graphQLServer)
	http.HandleFunc("/"+config.AuthLoginPath, func(w http.ResponseWriter, req *http.Request) {
		redirectUri := fmt.Sprintf(
			"https://%v/authorize?client_id=%v&redirect_uri=http://%v:%v/%v&%v&%v&%v",
			config.AuthDomain,
			config.AuthClientID,
			config.Address,
			config.Port,
			config.AuthCallbackPath,
			"response_type=token",
			"response_mode=query",
			"audience="+config.AuthAudience,
		)
		fmt.Println(redirectUri)
		http.Redirect(w, req, redirectUri, http.StatusPermanentRedirect)
	})
	http.HandleFunc("/"+config.AuthLogoutPath, func(w http.ResponseWriter, req *http.Request) {
		w.Write([]byte("trying to logout"))
	})
	http.HandleFunc("/"+config.AuthCallbackPath, func(w http.ResponseWriter, req *http.Request) {
		rawToken := req.URL.Query().Get("access_token")
		fmt.Println("token:", rawToken)
		token, err := s.jwtValidator.ValidateToken(req.Context(), rawToken)
		if err != nil {
			fmt.Printf("failed to parse payload: %s\n", err)
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		fmt.Println(token)
		w.Write([]byte("worked"))
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

	issuerURL, err := url.Parse(fmt.Sprintf("https://%v/", config.AuthDomain))
	if err != nil {
		return s, fmt.Errorf("failed to parse the issuer url: %w", err)
	}

	s.jwtProvider = jwks.NewCachingProvider(issuerURL, 5*time.Minute)

	// Set up the validator.
	jwtValidator, err := validator.New(
		s.jwtProvider.KeyFunc,
		validator.RS256,
		issuerURL.String(),
		[]string{config.AuthAudience},
		validator.WithAllowedClockSkew(time.Minute),
	)
	if err != nil {
		return s, fmt.Errorf("failed to set up the validator: %w", err)
	}

	s.jwtValidator = jwtValidator

	return s, nil
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
