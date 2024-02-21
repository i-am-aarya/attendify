package database

import (
	"attendify/teacher-server/models"
	"context"
	"log"
	"time"
)

func FindStudentsByFilter(filter models.Filter) ([]models.Student, error) {

	// create context
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var studentsList []models.Student

	studentsCursor, err := studentsCollection.Find(ctx, filter)

	if err != nil {
		log.Println("Error(s) encountered while searching for students")
		return nil, err
	}

	defer studentsCursor.Close(ctx)

	for studentsCursor.Next(ctx) {
		var student models.Student
		err := studentsCursor.Decode(&student)
		if err != nil {
			log.Fatal(err)
			continue
		}
		studentsList = append(studentsList, student)
	}

	if err := studentsCursor.Err(); err != nil {
		log.Println("Error during cursor iteration: ", err)
		return nil, err
	}

	return studentsList, err
}
