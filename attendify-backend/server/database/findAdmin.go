package database

import (
	"attendify/teacher-server/models"
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func FindAdmin(email string, password string) (bool, error) {

	cursor, err := adminDetails.Find(context.Background(), bson.D{{Key: "emailID", Value: email}})

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

func GetAdminByEmailID(emailID string) (*models.LoginCredential, error) {

	filter := bson.M{"emailID": emailID}

	var admin models.LoginCredential
	err := adminDetails.FindOne(context.TODO(), filter).Decode(&admin)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		} else {
			log.Println("Error fetching admin: ", err)
			return nil, err
		}
	}

	return &admin, nil

}
