package teacherhandlers

import (
	"attendify/teacher-server/database"
	"attendify/teacher-server/handlers/utils"
	"attendify/teacher-server/models"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func generateJWT(emailID string) (string, error) {

	expirationTime := time.Now().Add(time.Hour * 5)

	claims := models.Claims{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
		EmailID: emailID,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString([]byte(os.Getenv("SecretKey")))

	return signedToken, err

}

// handle login requests
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Login requested")

	var teacher models.LoginCredential

	err := json.NewDecoder(r.Body).Decode(&teacher)

	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	hashedPassword := utils.HashSha512(teacher.Password)
	match, err := database.MatchEmailAndPassword(teacher.EmailID, hashedPassword, "teacher")

	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		log.Println("Error matching email and password: ", err)
		return
	}

	// match found in database
	if match {
		signedToken, err := generateJWT(teacher.EmailID)

		if err != nil {
			http.Error(w, "token generation error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"token": signedToken})
	} else {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
	}

	log.Println(teacher.EmailID, " logged in successfully.")

}
