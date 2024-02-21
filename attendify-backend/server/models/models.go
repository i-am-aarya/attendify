package models

import "github.com/golang-jwt/jwt/v4"

type NewTeacher struct {
	Name     string `json:"name"`
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

// used to insert a student into studentDetails
type Student struct {
	Name         string `json:"name"`
	SymbolNumber string `json:"symbolNumber"`
	Department   string `json:"department"`
	Shift        string `json:"shift"`
	Semester     string `json:"semester"`
}

// this is what is obtained from the frontend
// this isnt for usage with/in database
type StudentAttendance struct {
	Student    StudentDetails `json:"student"`
	Attendance bool           `json:"attendance"`
}

// for studentDetails collection
type AttendanceDate struct {
	Date   string `json:"date"`
	Status string `json:"status"`
}

type Attendance struct {
	TeacherEmail string           `json:"teacherEmail"`
	Dates        []AttendanceDate `json:"dates"`
}

type StudentDetails struct {
	Name         string       `json:"name"`
	SymbolNumber string       `json:"symbolNumber"`
	Semester     string       `json:"semester"`
	Department   string       `json:"department"`
	Shift        string       `json:"shift"`
	Attendance   []Attendance `json:"attendance"`
}

// Admin
type LoginCredential struct {
	// Name string `json:"name"`
	EmailID  string `json:"emailID"`
	Password string `json:"password"`
}
