package database

import (
	"attendify/teacher-server/models"
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetTeacherByEmailID(emailID string) (*models.LoginCredential, error) {

	filter := bson.M{"emailID": emailID}

	var teacher models.LoginCredential
	err := teacherCredentials.FindOne(context.TODO(), filter).Decode(&teacher)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		} else {
			log.Println("Error fetching teacher: ", err)
			return nil, err
		}
	}

	return &teacher, nil

}
