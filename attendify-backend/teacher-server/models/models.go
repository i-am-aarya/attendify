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

type Filter struct {
	Shift      string `json:"shift"`
	Department string `json:"department"`
	Semester   string `json:"semester"`
}

type Student struct {
	Name       string `json:"name"`
	Department string `json:"department"`
	Shift      string `json:"shift"`
	Semester   string `json:"semester"`
}
