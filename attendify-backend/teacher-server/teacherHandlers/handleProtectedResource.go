package teacherhandlers

import (
	"attendify/teacher-server/database"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v4"
)

func HandleProtectedResource(w http.ResponseWriter, r *http.Request) {

	authHeader := r.Header.Get("Authorization")

	if authHeader == "" {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	tokenParts := strings.Split(authHeader, " ")

	if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
		http.Error(w, "Invalid authorization header", http.StatusBadRequest)
		return
	}

	rawToken := tokenParts[1]

	tokenString, err := jwt.Parse(rawToken, func(t *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			http.Error(w, "Invalid token Signature", http.StatusUnauthorized)
		} else {
			http.Error(w, "Error Parsing Token", http.StatusBadRequest)
		}
		return
	}

	if !tokenString.Valid {
		http.Error(w, "Invalid Token", http.StatusUnauthorized)
	}

	authorized := true

	if authorized {
		claims := tokenString.Claims.(jwt.MapClaims)

		teacher, err := database.GetTeacherByEmailID(claims["emailID"].(string))

		if err != nil {
			http.Error(w, "Error fetching teacher data", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(teacher)

	}
}
