package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/royletron/tapp/server"
)

func main() {
	port := "4000"

  if fromEnv := os.Getenv("PORT"); fromEnv != "" {
    port = fromEnv
  }
  server := server.CreateServerWithFakeSchools([]string{"St Richards", "St Albans", "Carswell Community", "St Mary's", "Abbey Hey", "St Tho", "John Motson Academy"})
	fmt.Printf("Starting up on http://localhost:%s\n", port)
	http.ListenAndServe(":" + port, server.Router)
}