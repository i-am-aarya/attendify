package adminhandlers

import (
	"encoding/json"
	"log"
	"net/http"
)

type FindStudentsFilter struct {
	StudentShift      string `json:"studentShift"`
	StudentDepartment string `json:"studentDepartment"`
	StudentSemester   string `json:"studentSemester"`
}

/**

  studentShift: studentShift,
  studentSemester: studentSemester,
  studentDepartment: studentDepartment
*/

func FindStudentsHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Find Students called")

	var stdFilter FindStudentsFilter

	if err := json.NewDecoder(r.Body).Decode(&stdFilter); err != nil {
		// log.Println("Filter: ", stdFilter)
		log.Println("Could not decode request body")
		http.Error(w, "Could not decode request body", http.StatusBadRequest)
	}

	log.Println("Filter: ", stdFilter)

}
