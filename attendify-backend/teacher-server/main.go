package main

import (
	"attendify/teacher-server/database"
	"attendify/teacher-server/routes"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	database.ConnectToDatabase()
	fmt.Println("Connected to database")

	routes.SetupRoutes(router)

	// setting cors
	corsHandler := handlers.CORS(
		handlers.AllowedHeaders([]string{"*"}),
		// handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedMethods([]string{"*"}),
		handlers.AllowedOrigins([]string{"*"}),
	)

	port := ":8080"

	go func() {
		for {
			log.Printf("Server listening on %s\n", port)
			time.Sleep(time.Minute)
		}
	}()

	http.ListenAndServe(port, corsHandler(router))
}
