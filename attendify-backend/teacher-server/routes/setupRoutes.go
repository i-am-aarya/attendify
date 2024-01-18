package routes

import (
	"attendify/teacher-server/authentication"

	"github.com/gorilla/mux"
)

func SetupRoutes(router *mux.Router) {
	router.HandleFunc("/login", authentication.LoginHandler).Methods("POST")
	router.HandleFunc("/protected-resource", authentication.HandleProtectedResource).Methods("GET")
}
