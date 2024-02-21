package database

import (
	"attendify/teacher-server/models"
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
)

func AddNewStudent(student models.StudentDetails) error {

	log.Println(student)

	if student.Attendance == nil {
		student.Attendance = []models.Attendance{}
	}

	document := bson.M{
		"name":         student.Name,
		"symbolnumber": student.SymbolNumber,
		"department":   student.Department,
		"semester":     student.Semester,
		"shift":        student.Shift,
		"attendance":   []models.Attendance{},
	}

	result, err := studentsCollection.InsertOne(context.Background(), document)
	if err != nil {
		return err
	}

	log.Println(result)

	return nil
}
