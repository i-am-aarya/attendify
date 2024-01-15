/*
routes are defined in this file
routes defined in the react app are not related to these routes
these are used to define the server-side routes for handling incoming HTTP requests.
*/
package routes

import (
	"example/teacher-server/web/handlers"

	"github.com/gorilla/mux"
)

func SetupRoutes(router *mux.Router) {
	router.HandleFunc("/login", handlers.TeacherLoginHandler).Methods("POST")
}
