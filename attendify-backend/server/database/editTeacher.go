package database

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
)

func EditTeacher(teacherEmail string, teacherName string, teacherPassword string) error {

	filter := bson.M{
		"emailid": teacherEmail,
	}

	update := bson.M{
		"$set": bson.M{
			"name":     teacherName,
			"password": teacherPassword,
		},
	}

	_, err := teacherCredentials.UpdateOne(context.Background(), filter, update)

	if err != nil {
		log.Println("Error updating teacher records: ", err)
		return err
	}

	return nil

}
