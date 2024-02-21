package teacherhandlers

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v4"
)

// /api/get-attendance-records?shift=morning&department=software&semester=first
func GetAttendanceRecordsHandler(w http.ResponseWriter, r *http.Request) {
	// log.Println(r.URL)

	authorizationHeader := r.Header.Get("Authorization")

	tokenString := strings.Split(authorizationHeader, " ")[1]

	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) { return []byte(os.Getenv("SecretKey")), nil })

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		log.Println("JWT could not be parsed")
		return
	}

	teacherEmail := ""

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		teacherEmail = claims["emailID"].(string)
	} else {
		http.Error(w, "invalid emailID", http.StatusUnauthorized)
		log.Println("Attendance view request from unauthorized email address: ", teacherEmail)
		return
	}

	// log.Println(filter)
	shift := r.URL.Query().Get("shift")
	department := r.URL.Query().Get("department")
	semester := r.URL.Query().Get("semester")

	log.Printf("TeacherEmail: %s Shift: %s Department: %s Semester: %s\n", teacherEmail, shift, department, semester)

}
