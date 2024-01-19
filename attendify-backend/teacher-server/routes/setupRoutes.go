package routes

import (
	teacherhandlers "attendify/teacher-server/teacherHandlers"

	"github.com/gorilla/mux"
)

func SetupRoutes(router *mux.Router) {
	router.HandleFunc("/api/login", teacherhandlers.LoginHandler).Methods("POST")
	router.HandleFunc("/api/protected-resource", teacherhandlers.HandleProtectedResource).Methods("GET")
	router.HandleFunc("/api/find-students", teacherhandlers.HandleFindStudents).Methods("GET")
}
