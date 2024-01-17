/*
currently, session is used, will try jwt later
*/

package authentication

import (
	"attendify/teacher-server/database"
	"crypto/sha512"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/sessions"
)

type Credential struct {
	EmailID  string `json:"emailID"`
	Password string `json:"password"`
}

// helloWorld is the secret key. can and should be changed
var store = sessions.NewCookieStore([]byte("helloWorld"))

func LoginHandler(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Login Requested")

	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var credential Credential

	err := json.NewDecoder(r.Body).Decode(&credential)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	hasher := sha512.New()
	hasher.Write([]byte(credential.Password))
	hashBytes := hasher.Sum(nil)

	hashedPassword := hex.EncodeToString(hashBytes)

	// if credential.EmailID == "asd@ncit.edu.np" && credential.Password == "one@123" {
	match, err := database.MatchEmailAndPassword(credential.EmailID, hashedPassword)

	if err != nil {
		http.Error(w, "database error", http.StatusInternalServerError)
	}

	if match {
		setSession(credential.EmailID, w, r)
		w.WriteHeader(http.StatusOK)
		// w.Write([]byte("authentication successful"))

		fmt.Println("Credentials match, logging in")

		json.NewEncoder(w).Encode(map[string]string{"message": "authentication successful"})

	} else {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"message": "invalid login credentials"})
		// http.Error(w, "Invalid username or password", http.StatusUnauthorized)
	}

}

func setSession(emailID string, w http.ResponseWriter, r *http.Request) {
	// session, _ := sessions.Store.Get(r, "teacher-attendify-session")
	session, _ := store.Get(r, "user-session")
	session.Values["emailID"] = emailID
	session.Options.SameSite = http.SameSiteNoneMode
	session.Options.MaxAge = 60 * 60
	session.Options.Secure = true
	session.Options.HttpOnly = true
	session.Save(r, w)
}
