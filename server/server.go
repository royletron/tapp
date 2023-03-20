package server

import (
	"github.com/go-chi/chi"
	"github.com/royletron/tapp/database"
)

type Server struct {
	Router *chi.Mux
	Db 	 *database.Database
}

func (s Server) SetupRoutes() {
	apiRouter := chi.NewRouter()
	schoolHandler := SchoolHandler{
		Schools: s.Db.Schools,
	}
	apiRouter.Route("/school", schoolHandler.Routes)
	s.Router.Mount("/api", apiRouter)
}

func CreateNewServer() *Server {
	s := &Server{}
	s.Router = chi.NewRouter()
	s.Db = database.NewDatabase()
	s.SetupRoutes()
	return s
}

func CreateServerWithFakeSchools(names []string) *Server {
	s := CreateNewServer()
	for _, name := range names {
		s.Db.Schools.AddSchool(name)
	}
	return s
}