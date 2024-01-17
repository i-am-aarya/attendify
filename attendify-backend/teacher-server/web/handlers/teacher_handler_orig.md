```golang
/*
	handle requests that could be made by the teacher:
	login
	get student data
*/

package handlers

import (
	"crypto/sha512"
	"encoding/hex"
	"encoding/json"
	"example/teacher-server/database"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

var jwtKey = []byte(os.Getenv("JWT_SECRET_KEY"))

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

type TeacherLogin struct {
	EmailId  string `json:"emailID"`
	Password string `json:"password"`
}

func TeacherLoginHandler(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Login Requested")

	// declare teacherLogin to store login credentials entered
	var teacherLogin TeacherLogin
	err := json.NewDecoder(r.Body).Decode(&teacherLogin)
	/* entered emailID and password is now stored in teacherLogin, if no errors */

	// hashing using the sha512 hashing algorithm
	hasher := sha512.New()
	hasher.Write([]byte(teacherLogin.Password))
	hashedBytes := hasher.Sum(nil)
	hashedPassword := hex.EncodeToString(hashedBytes)

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

	/*
		Check ig there is a match in the database for the provided email and password
		If match is found, return a jwt token in body or as cookie & return login : true
		if match is not found, return login:false, send empty token or dont
	*/
	match, err := database.MatchEmailAndPassword(teacherLogin.EmailId, hashedPassword)

	if err != nil {
		response = map[string]bool{"login": false}
	}
	if match {
		token, err := generateJWT("teacher")

		if err != nil {
			http.Error(w, "Failed to generate JWT token", http.StatusInternalServerError)
			return
		}

		http.SetCookie(w, &http.Cookie{
			Name:  "token",
			Value: token,
		},
		)

		w.WriteHeader(http.StatusOK)
		fmt.Println(w.Header())

		fmt.Println(w.Header())
		response = map[string]bool{"login": true}
		log.Printf("%s logged in\n", teacherLogin.EmailId)
	} else {
		log.Printf("%s failed log in\n", teacherLogin.EmailId)
	}

	json.NewEncoder(w).Encode(response)

	/* w.WriteHeader(http.StatusOK) is implicitly called unless explicitly stated */
}

func generateJWT(username string) (string, error) {
	/*
		token := jwt.NewWithClaims(jwt.SigningMethodES256, jwt.MapClaims{
			"email": email,
			"exp":   time.Now().Add(15 * time.Minute).Unix(),
		})

		tokenString, err := token.SignedString([]byte(""))
	*/

	fmt.Println(os.Getenv("JWT_SECRET_KEY"))

	expirationTime := time.Now().Add(15 * time.Minute)

	claims := &Claims{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		return "", err
	}

	return tokenString, nil

}
```