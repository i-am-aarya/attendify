/*
Database operations are defined here.
Connect, CRUD
*/
package database

import (
	"attendify/teacher-server/models"
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client             *mongo.Client
	attendifyDatabase  *mongo.Database
	teacherCredentials *mongo.Collection
)

func GetTeacherByEmailID(emailID string) (*models.Teacher, error) {

	filter := bson.M{"emailID": emailID}

	var teacher models.Teacher
	// err := client.Database("")
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

func MatchEmailAndPassword(email string, password string) (bool, error) {

	cursor, err := teacherCredentials.Find(context.Background(), bson.D{{Key: "emailID", Value: email}})

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

func ConnectToDatabase() {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	var err error
	client, err = mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		log.Fatal(err)
		fmt.Println("Database connection unsuccessful")
	}

	attendifyDatabase = client.Database("attendifyDatabase")
	teacherCredentials = attendifyDatabase.Collection("teacherCredentials")
}

func DisconnectDatabase() {
	if client != nil {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Fatal(err)
		}
	}
}
