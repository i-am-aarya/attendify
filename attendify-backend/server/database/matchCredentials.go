package database

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func MatchEmailAndPassword(email string, password string, userType string) (bool, error) {

	var collection *mongo.Collection
	if userType == "teacher" {
		// collection = *adminDetails
		collection = teacherCredentials
	} else if userType == "admin" {
		collection = adminDetails
	}
	cursor, err := collection.Find(context.Background(), bson.D{{Key: "emailid", Value: email}})

	if err != nil {
		fmt.Printf("Cound not find teacher credentials\n")
		log.Fatal(err)
	}

	defer cursor.Close(context.TODO())

	for cursor.Next(context.TODO()) {
		var result bson.M
		if err = cursor.Decode(&result); err != nil {
			log.Fatal(err)
		}

		databasePassword, ok := result["password"].(string)

		if !ok {
			log.Fatal("Password field not found or not a string")
		}

		if password == databasePassword {
			return true, nil
		}
	}

	return false, nil
}
