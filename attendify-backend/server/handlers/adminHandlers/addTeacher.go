package adminhandlers

import (
	"attendify/teacher-server/database"
	"attendify/teacher-server/handlers/utils"
	"attendify/teacher-server/models"
	"encoding/json"
	"log"
	"net/http"
)

func AddTeacherHandler(w http.ResponseWriter, r *http.Request) {
	var newTeacher models.NewTeacher

	json.NewDecoder(r.Body).Decode(&newTeacher)
	newTeacher.Password = utils.HashSha512(newTeacher.Password)

	err := database.AddNewTeacher(newTeacher)

	if err != nil {
		log.Println(err)
	}

	log.Println(newTeacher)
}
