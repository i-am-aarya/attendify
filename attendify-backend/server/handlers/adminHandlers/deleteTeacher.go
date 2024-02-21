package adminhandlers

import (
	"attendify/teacher-server/database"
	"log"
	"net/http"
)

func DeleteTeacherHandler(w http.ResponseWriter, r *http.Request) {
	teacherEmail := r.URL.Query().Get("emailid")
	log.Println(teacherEmail)

	err := database.DeleteTeacher(teacherEmail)

	if err != nil {
		log.Println("Error Deleting Teacher")
		http.Error(w, "Error Deleting Teacher", http.StatusInternalServerError)
	}
}
