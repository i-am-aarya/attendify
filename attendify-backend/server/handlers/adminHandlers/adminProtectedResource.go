package adminhandlers

import (
	"attendify/teacher-server/database"
	"encoding/json"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v4"
)

func HandleProtectedResource(w http.ResponseWriter, r *http.Request) {

	// fmt.Println("Secret Key: ", os.Getenv("SecretKey"))

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
		return []byte(os.Getenv("SecretKey")), nil
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

		admin, err := database.GetAdminByEmailID(claims["emailID"].(string))

		if err != nil {
			http.Error(w, "Error fetching admin data", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(admin)

	}
}
