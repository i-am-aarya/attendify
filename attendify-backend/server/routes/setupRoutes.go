package routes

import (
	adminhandlers "attendify/teacher-server/handlers/adminHandlers"
	teacherhandlers "attendify/teacher-server/handlers/teacherHandlers"

	"github.com/gorilla/mux"
)

func SetupRoutes(router *mux.Router) {
	router.HandleFunc("/api/login", teacherhandlers.LoginHandler).Methods("POST")
	router.HandleFunc("/api/protected-resource", teacherhandlers.HandleProtectedResource).Methods("GET")
	router.HandleFunc("/api/find-students", teacherhandlers.HandleFindStudents).Methods("GET")
	router.HandleFunc("/api/submit-attendance", teacherhandlers.HandleAttendanceSubmission).Methods("POST")

	router.HandleFunc("/api/admin/login", adminhandlers.LoginHandler).Methods("POST")
	router.HandleFunc("/api/admin/protected-resource", adminhandlers.HandleProtectedResource).Methods("GET")

	router.HandleFunc("/api/admin/find-students", adminhandlers.FindStudentsHandler).Methods("POST")

	router.HandleFunc("/api/admin/add-student", adminhandlers.AddStudentHandler).Methods("POST")

}
