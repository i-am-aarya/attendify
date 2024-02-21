package database

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
)

func DeleteTeacher(teacherEmail string) error {

	filter := bson.M{
		"emailid": teacherEmail,
	}

	result, err := teacherCredentials.DeleteOne(context.Background(), filter)
	if err != nil {
		log.Println("Error deleting student: ", err)
		return err
	}

	if result.DeletedCount > 0 {
		log.Println("Teacher ", teacherEmail, " deleted")
	}

	return nil
}
