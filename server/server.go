package server

import (
	"github.com/go-chi/chi"
	"github.com/royletron/tapp/database"
)

type Server struct {
	Router *chi.Mux
	Db 	 *database.Database
}

// Sets up all of the routes
func (s Server) SetupRoutes() {
	apiRouter := chi.NewRouter()
	schoolHandler := SchoolHandler{
		Schools: s.Db.Schools,
	}
	apiRouter.Route("/school", schoolHandler.Routes)
	s.Router.Mount("/api", apiRouter)
}

// Creates a default server with no data
func CreateNewServer() *Server {
	s := &Server{}
	s.Router = chi.NewRouter()
	s.Db = database.NewDatabase()
	s.SetupRoutes()
	return s
}

// Creates a server with fake schools provided as a string slice
func CreateServerWithFakeSchools(names []string) *Server {
	s := CreateNewServer()
	for _, name := range names {
		s.Db.Schools.AddSchool(name)
	}
	return s
}