package teacherhandlers

import (
	"attendify/teacher-server/database"
	"attendify/teacher-server/models"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v4"
)

func HandleAttendanceSubmission(w http.ResponseWriter, r *http.Request) {
	authorizationHeader := r.Header.Get("Authorization")

	tokenString := strings.Split(authorizationHeader, " ")[1]
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SecretKey")), nil
	})

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		log.Println("Unauthorized request to update attendance")
		return
	}

	// will be used to store attendance in database
	teacherEmail := ""

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		teacherEmail = claims["emailID"].(string)
	} else {
		http.Error(w, "invalid emailID", http.StatusUnauthorized)
		log.Println("attendance update request from an invalid emailID")
		return
	}

	log.Println("Email ID: ", teacherEmail)

	var studentAttendanceList []models.StudentAttendance
	if err = json.NewDecoder(r.Body).Decode(&studentAttendanceList); err != nil {
		http.Error(w, "invalid json data", http.StatusBadRequest)
		return
	}

	for _, student := range studentAttendanceList {
		err := database.UpdateStudentRecords(student, teacherEmail)

		if err != nil {
			http.Error(w, "Failed to update attendance", http.StatusInternalServerError)
			log.Println("Error updating attendance for student: ", student, " error: ", err)
			return
		}
	}

}
