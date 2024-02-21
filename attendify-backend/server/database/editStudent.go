package database

import (
	"attendify/teacher-server/models"
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
)

func EditStudent(student models.Student) error {

	filter := bson.M{
		"symbolnumber": student.SymbolNumber,
	}

	update := bson.M{
		"$set": bson.M{
			"name":       student.Name,
			"semester":   student.Semester,
			"shift":      student.Shift,
			"department": student.Department,
		},
	}

	_, err := studentsCollection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		log.Println("Error updating student records", err)
		return err
	}

	return nil
}
