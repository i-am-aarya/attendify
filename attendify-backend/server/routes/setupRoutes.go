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
	router.HandleFunc("/api/get-attendance-records", teacherhandlers.GetAttendanceRecordsHandler).Methods("GET")

	router.HandleFunc("/api/admin/login", adminhandlers.LoginHandler).Methods("POST")
	router.HandleFunc("/api/admin/protected-resource", adminhandlers.HandleProtectedResource).Methods("GET")

	router.HandleFunc("/api/admin/find-students", adminhandlers.FindStudentsHandler).Methods("POST")

	router.HandleFunc("/api/admin/add-student", adminhandlers.AddStudentHandler).Methods("POST")
	router.HandleFunc("/api/admin/add-teacher", adminhandlers.AddTeacherHandler).Methods("POST")

	router.HandleFunc("/api/admin/edit-student", adminhandlers.EditStudentHandler).Methods("POST")
	router.HandleFunc("/api/admin/edit-teacher", adminhandlers.EditTeacherHandler).Methods("POST")

	router.HandleFunc("/api/admin/delete-student", adminhandlers.DeleteStudentHandler).Methods("GET")
	router.HandleFunc("/api/admin/delete-teacher", adminhandlers.DeleteTeacherHandler).Methods("GET")
}
