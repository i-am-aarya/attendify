/*
routes are defined in this file
routes defined in the react app are not related to these routes
these are used to define the server-side routes for handling incoming HTTP requests.
*/
package routes

import (
	// "example/teacher-server/web/handlers"

	"example/teacher-server/web/handlers"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func SetupRoutes(router *mux.Router) {
	// corsHandler := cors.Default().Handler

	corsHandler := cors.New(
		cors.Options{
			AllowedOrigins:   []string{"*"},
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"*"},
			AllowCredentials: true,
		},
	).Handler
	router.Use(corsHandler)
	router.HandleFunc("/login", handlers.TeacherLoginHandler).Methods("POST")
}
