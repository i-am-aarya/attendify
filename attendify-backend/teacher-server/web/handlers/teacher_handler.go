package handlers

import (
	"crypto/sha512"
	"encoding/hex"
	"encoding/json"
	"example/teacher-server/database"
	"example/teacher-server/models"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
)

var secretKey = []byte("helloworld")

func GenerateJWT(email string) (string, error) {
	// jwtToken := jwt.New(jwt.SigningMethodHS256)

	jwtClaims := jwt.NewWithClaims(
		jwt.SigningMethodHS256,
		// jwt.StandardClaims{
		// 	Issuer:    email,
		// 	ExpiresAt: time.Now().Add(30 * time.Minute).Unix(),
		// },
		jwt.MapClaims{
			"email": email,
			"exp":   time.Now().Add(time.Hour),
		},
	)

	tokenString, err := jwtClaims.SignedString(secretKey)

	if err != nil {
		return "", err
	}

	// claims := jwtToken.Claims.(jwt.MapClaims)
	// claims["exp"] = time.Now().Add(time.Hour)

	// claims["authorized"] = true

	// claims["user"] = "email"

	// tokenString, err := jwtToken.SignedString(secretKey)

	// if err != nil {
	// 	return "", err
	// }

	return tokenString, nil
}

func TeacherLoginHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	// decode incoming json to get entered credentials
	var teacherCredential models.TeacherCredential
	err := json.NewDecoder(r.Body).Decode(&teacherCredential)
	if err != nil {
		fmt.Println("Error decoding login credentials")
		return
	}

	fmt.Printf("Login requested by %s\n", teacherCredential.EmailID)

	// hash password to match against database
	hasher := sha512.New()
	hasher.Write([]byte(teacherCredential.Password))
	hashedPasswordBytes := hasher.Sum(nil)
	hashedPassword := hex.EncodeToString(hashedPasswordBytes)

	// match hashed password against database
	match, err := database.MatchEmailAndPassword(teacherCredential.EmailID, hashedPassword)
	if err != nil {
		fmt.Println(err)
		return
	}
	// match found
	if match {
		fmt.Println("Passwords Match. Generating JWT Token")

		jwtToken, err := GenerateJWT(teacherCredential.EmailID)

		if err != nil {

			fmt.Println("Error occured while generating jwt: ", err)
		}

		fmt.Println("Token generated. Setting Cookie")
		http.SetCookie(w, &http.Cookie{
			Name:     "token",
			Value:    jwtToken,
			Path:     "/",
			HttpOnly: true,
			Secure:   true,
			SameSite: http.SameSiteNoneMode,
		})
		fmt.Println("Cookie Set")

		w.WriteHeader(http.StatusOK)

	} else {
		// match not found

		fmt.Println("match not found")
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	fmt.Println("Login Handled Successfully")
}
