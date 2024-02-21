/*
Database operations are defined here.
Connect, CRUD
*/
package database

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client             *mongo.Client
	attendifyDatabase  *mongo.Database
	teacherCredentials *mongo.Collection
	studentsCollection *mongo.Collection
	adminDetails       *mongo.Collection
)

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
	studentsCollection = attendifyDatabase.Collection("studentDetails")
	adminDetails = attendifyDatabase.Collection("adminDetails")
}

func DisconnectDatabase() {
	if client != nil {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Fatal(err)
		}
	}
}
