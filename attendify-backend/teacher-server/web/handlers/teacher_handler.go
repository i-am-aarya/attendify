/*
	handle requests that could be made by the teacher:
	login
	get student data
*/

package handlers

import (
	"encoding/json"
	"example/teacher-server/database"
	"log"
	"net/http"
)

type TeacherLogin struct {
	EmailId  string `json:"emailID"`
	Password string `json:"password"`
}

func TeacherLoginHandler(w http.ResponseWriter, r *http.Request) {

	var teacherLogin TeacherLogin

	err := json.NewDecoder(r.Body).Decode(&teacherLogin)
	/* entered emailID and password is now stored in teacherLogin, if no errors */

	if err != nil {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}

	/* Sending OK responst to tht /submit request */
	w.Header().Set("Content-Type", "application/json")

	/*
		response will be sent to check if login credentials are correct
		response = {
			"login": false
		}
	*/
	var response = map[string]bool{"login": false}

	// TODO: query database to find anyone with matching email and password
	match, err := database.MatchEmailAndPassword(teacherLogin.EmailId, teacherLogin.Password)

	if err != nil {
		response = map[string]bool{"login": false}
	}
	if match {
		response = map[string]bool{"login": true}
		log.Println("Login")
	}

	json.NewEncoder(w).Encode(response)

	/* w.WriteHeader(http.StatusOK) is implicitly called unless explicitly stated */
}
