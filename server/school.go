package server

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/royletron/tapp/database"
)

type SchoolHandler struct {
	Schools *database.SchoolCollection
}

// Request type for creating or updating a school
type SchoolInputRequest struct {
	Name string `json:"name"`
}

// Context key type and consts
type key int
const (
	SchoolID key = iota
)

// API handler to create a new school
func (h SchoolHandler) Create(w http.ResponseWriter, r *http.Request) {
	var input SchoolInputRequest
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	newSchool, err := h.Schools.AddSchool(input.Name)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	writeJSON(w, newSchool)
}

// API handler to retrieve a single school
func (h SchoolHandler) Retrieve(w http.ResponseWriter, r *http.Request) {
	id := r.Context().Value(SchoolID).(string)
	school := h.Schools.GetSchool(id)
	if school == nil {
		http.Error(w, "unable to find school", http.StatusNotFound)
		return
	}
	writeJSON(w, school)
}

// API handler to update a single school
func (h SchoolHandler) Update(w http.ResponseWriter, r *http.Request) {
	var input SchoolInputRequest
	id := r.Context().Value(SchoolID).(string)
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	updatedSchool, err := h.Schools.UpdateSchool(id, input.Name)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	writeJSON(w, updatedSchool)
}

// API handler to delete a single school
func (h SchoolHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id := r.Context().Value(SchoolID).(string)
	err := h.Schools.DeleteSchool(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Write([]byte("deleted"))
}

// API handler to list all schools
func (h SchoolHandler) List(w http.ResponseWriter, r *http.Request) {
	schools := h.Schools.ListSchools()
	writeJSON(w, schools)
}

// Middleware to extract the schoolID from the URL and put into context
func SchoolCtx(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    ctx := context.WithValue(r.Context(), SchoolID, chi.URLParam(r, "schoolID"))
    next.ServeHTTP(w, r.WithContext(ctx))
  })
}

// Routes for the school API
func (h SchoolHandler) Routes(r chi.Router) {
	r.Get("/", h.List)
	r.Post("/", h.Create)
	r.Route("/{schoolID}", func(r chi.Router) {
		r.Use(SchoolCtx)
		r.Get("/", h.Retrieve)
		r.Put("/", h.Update)
		r.Delete("/", h.Delete)
	})
}