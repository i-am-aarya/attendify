package database

import (
	"attendify/teacher-server/models"
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetAttendanceRecords(teacherEmail string, department string, shift string, semester string) ([]models.StudentAttendanceRecords, error) {

	pipeline := mongo.Pipeline{
		{bson.E{Key: "$match", Value: bson.M{
			"attendance.teacheremail": teacherEmail,
			"shift":                   shift,
			"department":              department,
			"semester":                semester,
		}}},
		{bson.E{Key: "$unwind", Value: "$attendance"}},
		{bson.E{Key: "$match", Value: bson.M{
			"attendance.teacheremail": teacherEmail,
		}}},

		{bson.E{Key: "$project", Value: bson.M{
			"_id":          0,
			"name":         1,
			"attendance":   1,
			"symbolnumber": 1,
			// "semester":     1,
			// "department":   1,
			// "shift":        1,
		}}},
	}

	cursor, err := studentsCollection.Aggregate(context.Background(), pipeline)
	if err != nil {
		log.Println("error finding students with given filter")
		return nil, err
	}
	defer cursor.Close(context.Background())

	// log.Println("Aggregation pipeline executed")

	// for cursor.Next(context.Background()) {
	// 	var result bson.M
	// 	if err := cursor.Decode(&result); err != nil {
	// 		log.Println(err)
	// 		return err
	// 	}

	// 	log.Println("\n\n\n", result, "\n\n\n")
	// }

	var results []models.StudentAttendanceRecords

	if err := cursor.All(context.Background(), &results); err != nil {
		log.Println(err)
		return nil, err
	}

	return results, nil

}
