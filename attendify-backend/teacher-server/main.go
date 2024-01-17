package main

import (
	"attendify/teacher-server/authentication"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/login", authentication.LoginHandler).Methods("POST")

	// allow
	corsHandler := handlers.CORS(
		handlers.AllowedHeaders([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedOrigins([]string{"http://localhost:3000"}),
	)

	port := ":8080"

	go func() {
		for {
			fmt.Printf("Server listening on %s\n", port)
			time.Sleep(time.Minute)
		}
	}()

	http.ListenAndServe(port, corsHandler(router))
}
