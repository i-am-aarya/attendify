package adminhandlers

import (
	"attendify/teacher-server/database"
	"log"
	"net/http"
)

func DeleteStudentHandler(w http.ResponseWriter, r *http.Request) {
	symbolNumber := r.URL.Query().Get("symbolnumber")

	err := database.DeleteStudent(symbolNumber)

	if err != nil {
		log.Println("Error Deleting Student")
		http.Error(w, "Error deleting Student", http.StatusInternalServerError)
	}
}
