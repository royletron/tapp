package server

import (
	"encoding/json"
	"net/http"
)

// Marshals the data to JSON and writes it to the response, or errors nicely if the data is not JSON-able
func writeJSON(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	b, err := json.Marshal(data)
	if err != nil {
		http.Error(w, err.Error(), 422)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write(b)
}