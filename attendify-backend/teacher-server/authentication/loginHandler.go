package authentication

import (
	"attendify/teacher-server/database"
	"crypto/sha512"
	"encoding/hex"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

var secretKey = "SuperSecretKeyNoOneShouldKnow"

type Teacher struct {
	EmailID  string `json:"emailID"`
	Password string `json:"password"`
}

type Claims struct {
	jwt.RegisteredClaims
	EmailID string `json:"emailID"`
}

func generateJWT(emailID string) (string, error) {

	expirationTime := time.Now().Add(time.Hour * 1)

	claims := Claims{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
		EmailID: emailID,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString([]byte(secretKey))

	// if err != nil {
	// 	http.Error(w, "error generating token", http.StatusInternalServerError)
	// 	return
	// }

	return signedToken, err

}

func hashSha512(stringToHash string) string {
	hasher := sha512.New()
	hasher.Write([]byte(stringToHash))
	hashBytes := hasher.Sum(nil)
	hashedPassword := hex.EncodeToString(hashBytes)
	return hashedPassword
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var teacher Teacher

	err := json.NewDecoder(r.Body).Decode(&teacher)

	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	hashedPassword := hashSha512(teacher.Password)
	match, err := database.MatchEmailAndPassword(teacher.EmailID, hashedPassword)

	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		log.Println("Error matching email and password: ", err)
		return
	}

	if match {
		// unsignedToken, err := generateJWT(teacher.EmailID)
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

}
