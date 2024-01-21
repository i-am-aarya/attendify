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
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client             *mongo.Client
	attendifyDatabase  *mongo.Database
	teacherCredentials *mongo.Collection
	studentsCollection *mongo.Collection
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
	studentsCollection = attendifyDatabase.Collection("studentDetails")
}

func DisconnectDatabase() {
	if client != nil {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Fatal(err)
		}
	}
}

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

func UpdateStudentRecords(student models.StudentAttendance, teacherEmail string) error {
	query := bson.M{"symbolNumber": student.Student.SymbolNumber}

	var status string
	if student.Attendance {
		status = "present"
	} else {
		status = "absent"
	}

	update := bson.M{
		"$push": bson.M{
			"attendance.$[elem].dates": bson.M{
				"date":   time.Now().Format("2006-01-02"),
				"status": status,
			},
		},
	}

	// arrayFilters := []bson.M{{"elem.teacherEmail": teacherEmail}}
	arrayFilters := options.ArrayFilters{
		Filters: []interface{}{bson.M{"elem.teacherEmail": teacherEmail}},
	}

	res, err := studentsCollection.UpdateOne(context.Background(), query, update, options.Update().SetArrayFilters(arrayFilters))

	if err != nil {
		return err
	}
	log.Println("Number of documents matched: ", res.MatchedCount)

	return nil
}
