package adminhandlers

import (
	"attendify/teacher-server/database"
	"attendify/teacher-server/models"
	"encoding/json"
	"net/http"
)

// type StudentDetails struct {
// 	StudentName       string `json:"studentName"`
// 	StudentSymbolNo   string `json:"studentSymbolNumber"`
// 	StudentSemester   string `json:"studentSemester"`
// 	StudentDepartment string `json:"studentDepartment"`
// 	StudentShift      string `json:"studentShift"`
// 	StudentEmail      string `json:"studentEmail"`
// }

// type CrapDetails struct {
// 	StudentName       string `json:"name"`
// 	StudentSymbolNo   string `json:"symbolNumber"`
// 	StudentSemester   string `json:"semester"`
// 	StudentDepartment string `json:"department"`
// 	StudentShift      string `json:"shift"`
// 	StudentEmail      string `json:"email"`
// }

/*
studentName: studentName,
studentSymbolNumber: studentSymbolNo,
studentSemester: studentSemester,
studentDepartment: studentDepartment,
studentShift: studentShift,
studentEmail: studentEmail
*/
func AddStudentHandler(w http.ResponseWriter, r *http.Request) {

	var student models.StudentDetails

	json.NewDecoder(r.Body).Decode(&student)

	err := database.AddNewStudent(student)

	if err != nil {
		http.Error(w, "Could not add new student", http.StatusInternalServerError)
		return
	}

}
