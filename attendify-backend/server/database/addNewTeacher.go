package database

import (
	"attendify/teacher-server/models"
	"context"
)

func AddNewTeacher(newTeacher models.NewTeacher) error {

	teacherCredentials.InsertOne(context.Background(), newTeacher)

	return nil
}
