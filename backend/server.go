package main

//go:generate go run github.com/opendoor/pggen/cmd/pggen -o db/models.gen.go -c $DB_URL pggen.toml
//go:generate go run github.com/99designs/gqlgen

import (
	"context"
	"crypto/rand"
	"database/sql"
	"embed"
	"encoding/base64"
	"errors"
	"fmt"
	"io/fs"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/coreos/go-oidc/v3/oidc"
	"github.com/gorilla/sessions"
	"golang.org/x/oauth2"

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
	SessionKey       string `env:"SESSION_KEY"`
}

type Server struct {
	config       *Config
	sessions     sessions.Store
	oidcProvider *oidc.Provider
	oauthConfig  oauth2.Config
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

	provider, err := oidc.NewProvider(
		context.Background(),
		fmt.Sprintf("https://%v/", config.AuthDomain),
	)
	if err != nil {
		return nil, err
	}

	s := &Server{
		config:       config,
		sessions:     sessions.NewCookieStore([]byte(config.SessionKey)),
		oidcProvider: provider,
		oauthConfig: oauth2.Config{
			ClientID:     config.AuthClientID,
			ClientSecret: config.AuthSecret,
			RedirectURL: fmt.Sprintf(
				"http://%v:%v/%v",
				config.Address,
				config.Port,
				config.AuthCallbackPath,
			),
			Endpoint: provider.Endpoint(),
			Scopes:   []string{oidc.ScopeOpenID, "profile"},
		},
	}

	http.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", graphQLServer)

	// auth routes
	http.HandleFunc("/"+config.AuthLoginPath, s.HandleLogin)
	http.HandleFunc("/"+config.AuthLogoutPath, s.HandleLogout)
	http.HandleFunc("/"+config.AuthCallbackPath, s.HandleAuthorize)

	var htmlFS, _ = fs.Sub(resources, "resources")
	indexFile, _ := htmlFS.Open("index.html")
	indexBytes, _ := ioutil.ReadAll(indexFile)
	htmlFileServer := http.FileServer(http.FS(htmlFS))

	// handle all other routes as either a file or our index page
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

func generateRandomState() (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}

	state := base64.StdEncoding.EncodeToString(b)

	return state, nil
}

func (s *Server) HandleLogin(w http.ResponseWriter, req *http.Request) {
	state, err := generateRandomState()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Save the state inside the session.
	session, _ := s.sessions.Get(req, "session")
	session.Values["state"] = state
	if err := session.Save(req, w); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	redirectUri := s.oauthConfig.AuthCodeURL(state)
	http.Redirect(w, req, redirectUri, http.StatusPermanentRedirect)
}

func (s *Server) HandleLogout(w http.ResponseWriter, req *http.Request) {
	w.Write([]byte("logout"))
}

// VerifyIDToken verifies that an *oauth2.Token is a valid *oidc.IDToken.
func (s *Server) VerifyIDToken(ctx context.Context, token *oauth2.Token) (*oidc.IDToken, error) {
	rawIDToken, ok := token.Extra("id_token").(string)
	if !ok {
		return nil, errors.New("no id_token field in oauth2 token")
	}

	oidcConfig := &oidc.Config{
		ClientID: s.config.AuthClientID,
	}

	return s.oidcProvider.Verifier(oidcConfig).Verify(ctx, rawIDToken)
}

func (s *Server) HandleAuthorize(w http.ResponseWriter, req *http.Request) {
	session, err := s.sessions.Get(req, "session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	queryState := req.URL.Query().Get("state")
	sessionState := session.Values["state"]
	if queryState != fmt.Sprint(sessionState) {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Exchange an authorization code for a token.
	queryCode := req.URL.Query().Get("code")
	token, err := s.oauthConfig.Exchange(req.Context(), queryCode)
	if err != nil {
		http.Error(w, "Failed to exchange an authorization code for a token", http.StatusUnauthorized)
		return
	}

	/* here is our email
	idToken, err := s.VerifyIDToken(req.Context(), token)
	if err != nil {
		http.Error(w, "Failed to verify ID Token.", http.StatusInternalServerError)
		return
	}

	var profile map[string]interface{}
	if err := idToken.Claims(&profile); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	email := profile["email"]
	fmt.Println("email:", email)
	*/

	session.Values["access_token"] = token.AccessToken
	if err := session.Save(req, w); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Redirect to the home page.
	http.Redirect(w, req, "/", http.StatusPermanentRedirect)
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
