package database

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
)

func DeleteStudent(symbolNumber string) error {

	filter := bson.M{
		"symbolnumber": symbolNumber,
	}

	result, err := studentsCollection.DeleteOne(context.Background(), filter)
	if err != nil {
		log.Println("Error deleting student: ", err)
		return err
	}

	if result.DeletedCount > 0 {
		log.Println("Symbol Number ", symbolNumber, " deleted")
	}

	return nil
}
