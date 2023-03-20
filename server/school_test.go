package server

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/royletron/tapp/database"
	"github.com/stretchr/testify/require"
)

// executeRequest, creates a new ResponseRecorder
// then executes the request by calling ServeHTTP in the router
// after which the handler writes the response to the response recorder
// which we can then inspect.
func executeRequest(req *http.Request, s *Server) *httptest.ResponseRecorder {
	rr := httptest.NewRecorder()
	s.Router.ServeHTTP(rr, req)

	return rr
}

// checkResponseCode is a simple utility to check the response code
// of the response
func checkResponseCode(t *testing.T, expected, actual int) {
	if expected != actual {
			t.Errorf("Expected response code %d. Got %d\n", expected, actual)
	}
}

func TestSchoolList(t *testing.T) {
	// Create a New Server Struct
	s := CreateNewServer()
	s.Db.Schools.Schools = []*database.School{
		{Name: "St Richards", ID: "1"},
		{Name: "Carswell", ID: "2"},
	}

	// Create a New Request
	req, _ := http.NewRequest("GET", "/api/school", nil)

	// Execute Request
	response := executeRequest(req, s)

	// Check the response code
	checkResponseCode(t, http.StatusOK, response.Code)

	// Check that the response contains the correct data
	require.JSONEq(t, `[{"id": "1", "name": "St Richards"},{"id": "2", "name": "Carswell"}]`, response.Body.String())
}

func TestGetSchool(t *testing.T) {
	// Create a New Server Struct
	s := CreateNewServer()
	s.Db.Schools.Schools = []*database.School{
		{Name: "St Richards", ID: "1"},
	}

	// Create a New Request
	req, _ := http.NewRequest("GET", "/api/school/1", nil)

	// Execute Request
	response := executeRequest(req, s)

	// Check the response code
	checkResponseCode(t, http.StatusOK, response.Code)

	// Check that the response contains the correct data
	require.JSONEq(t, `{"id": "1", "name": "St Richards"}`, response.Body.String())
}

func TestCreateSchool(t *testing.T) {
	// Create a New Server Struct
	s := CreateNewServer()

	// Create a request body
	body, _ := json.Marshal(map[string]interface{}{
		"name": "St Richards",
	})

	// Create a New Request
	req, _ := http.NewRequest("POST", "/api/school", bytes.NewReader(body))

	// Execute Request
	response := executeRequest(req, s)

	// Check the response code
	checkResponseCode(t, http.StatusOK, response.Code)

	// Check that the school has ended up in the database
	require.Equal(t, s.Db.Schools.Schools[0].Name, "St Richards")

	// Check that the response contains the correct data
	require.JSONEq(t, fmt.Sprintf(`{"id": "%s", "name": "St Richards"}`, s.Db.Schools.Schools[0].ID), response.Body.String())
}

func TestUpdateSchool(t *testing.T) {
	// Create a New Server Struct
	s := CreateNewServer()
	s.Db.Schools.Schools = []*database.School{
		{Name: "St Richards", ID: "1"},
	}

	// Create a request body
	body, _ := json.Marshal(map[string]interface{}{
		"name": "Carswell",
	})

	// Create a New Request
	req, _ := http.NewRequest("PUT", "/api/school/1", bytes.NewReader(body))

	// Execute Request
	response := executeRequest(req, s)

	// Check the response code
	checkResponseCode(t, http.StatusOK, response.Code)

	// Check that the school has been updated in the database
	require.Equal(t, s.Db.Schools.Schools[0].Name, "Carswell")

	// Check that the response contains the correct data
	require.JSONEq(t, `{"id": "1", "name": "Carswell"}`, response.Body.String())
}

func TestSchoolDelete(t *testing.T) {
	// Create a New Server Struct
	s := CreateNewServer()
	s.Db.Schools.Schools = []*database.School{
		{Name: "St Richards", ID: "1"},
	}

	// Create a New Request
	req, _ := http.NewRequest("DELETE", "/api/school/1", nil)

	// Execute Request
	response := executeRequest(req, s)

	// Check the response code
	checkResponseCode(t, http.StatusOK, response.Code)

	// Check that the school has been deleted in the database
	require.Equal(t, len(s.Db.Schools.Schools), 0)
}