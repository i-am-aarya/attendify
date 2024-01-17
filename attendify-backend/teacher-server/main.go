package main

import (
	"example/teacher-server/database"
	"example/teacher-server/web/routes"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
)

func main() {

	// setup attendifyLogger to be used to log info in the server
	attendifyLogger := log.New(os.Stdout, "INFO: ", log.Ldate|log.Ltime)

	// initialize router & setup routes
	router := mux.NewRouter()
	routes.SetupRoutes(router)

	http.Handle("/", router)

	// initializa database
	database.ConnectToDatabase()

	// fmt.Println(os.Getenv("JWT_SECRET_KEY"))

	defer database.DisconnectDatabase()

	port := ":8080"
	go func() {
		// time.Sleep(time.Second * 5)
		// attendifyLogger.Printf("Server Listening on port %s\n", port)
		ticker := time.NewTicker(time.Second * 60)
		defer ticker.Stop()

		for {
			select {
			case <-ticker.C:
				attendifyLogger.Printf("Server running on port %s\n", port)
			}
		}
	}()
	attendifyLogger.Printf("http server started on port %s\n", port)
	log.Fatal(http.ListenAndServe(port, router))
}
