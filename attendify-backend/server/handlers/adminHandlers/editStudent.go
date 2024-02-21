package adminhandlers

import (
	"attendify/teacher-server/database"
	"attendify/teacher-server/models"
	"encoding/json"
	"log"
	"net/http"
)

func EditStudentHandler(w http.ResponseWriter, r *http.Request) {

	var student models.Student

	json.NewDecoder(r.Body).Decode(&student)

	err := database.EditStudent(student)
	if err != nil {
		http.Error(w, "Could not update student record", http.StatusInternalServerError)
		log.Println("Error updating student", err)
	}

}
