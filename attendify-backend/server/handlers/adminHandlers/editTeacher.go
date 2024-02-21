package adminhandlers

import (
	"attendify/teacher-server/database"
	"attendify/teacher-server/handlers/utils"
	"encoding/json"
	"net/http"
)

type TeacherDetails struct {
	TeacherName     string `json:"teacherName"`
	TeacherEmail    string `json:"teacherEmail"`
	TeacherPassword string `json:"teacherPassword"`
}

func EditTeacherHandler(w http.ResponseWriter, r *http.Request) {
	var teacherDetails TeacherDetails

	json.NewDecoder(r.Body).Decode(&teacherDetails)

	teacherPassword := utils.HashSha512(teacherDetails.TeacherPassword)

	err := database.EditTeacher(teacherDetails.TeacherEmail, teacherDetails.TeacherName, teacherPassword)

	if err != nil {
		http.Error(w, "Error updating teacher records", http.StatusInternalServerError)
		return
	}
}
