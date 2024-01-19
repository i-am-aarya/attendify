package teacherhandlers

import (
	"attendify/teacher-server/database"
	"attendify/teacher-server/models"
	"encoding/json"
	"log"
	"net/http"
)

/**
 * unlike the login request, request sent to HandleFindStudent will
 * have the filter in the query, not request body
 */
func HandleFindStudents(w http.ResponseWriter, r *http.Request) {

	log.Println("Find students called")

	// fmt.Println(r.Body)

	// var filter models.Filter
	// err := json.NewDecoder(r.Body).Decode(&filter)

	// if err != nil {
	// 	log.Println("student filter could not be decoded")
	// 	http.Error(w, "invalid student filter", http.StatusBadRequest)
	// 	return
	// }

	queryValues := r.URL.Query()
	// log.Println("Query Values: ", queryValues)

	shift := queryValues.Get("shift")
	department := queryValues.Get("department")
	semester := queryValues.Get("semester")

	filter := models.Filter{
		Shift:      shift,
		Department: department,
		Semester:   semester,
	}

	log.Println("Finding students with filter: ", filter)

	studentsList, err := database.FindStudentsByFilter(filter)

	if err != nil {
		// log.Println("")
		http.Error(w, "error finding students", http.StatusInternalServerError)
		log.Println("Error finding students: ", err)
		return
	}

	json.NewEncoder(w).Encode(studentsList)
}
