package models

import "github.com/golang-jwt/jwt/v4"

type Teacher struct {
	EmailID  string `json:"emailID"`
	Password string `json:"password"`
}

type Claims struct {
	jwt.RegisteredClaims
	EmailID string `json:"emailID"`
}
