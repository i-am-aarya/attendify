package database

import (
	"attendify/teacher-server/models"
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// func UpdateStudentRecords(student models.StudentAttendance, teacherEmail string) error {
// 	query := bson.M{"symbolnumber": student.Student.SymbolNumber}

// 	var status string
// 	if student.Attendance {
// 		status = "present"
// 	} else {
// 		status = "absent"
// 	}

// 	update := bson.M{
// 		"$push": bson.M{
// 			"attendance.$[elem].dates": bson.M{
// 				"date":   time.Now().Format("2006-01-02"),
// 				"status": status,
// 			},
// 		},
// 	}

// 	arrayFilters := options.ArrayFilters{
// 		Filters: []interface{}{bson.M{"elem.teacheremail": teacherEmail}},
// 	}

// 	log.Println("Query: ", query)
// 	log.Println("Update: ", update)
// 	log.Println("Filter: ", arrayFilters)

// 	res, err := studentsCollection.UpdateOne(context.Background(), query, update, options.Update().SetArrayFilters(arrayFilters).SetUpsert(true))

// 	if err != nil {
// 		return err
// 	}
// 	log.Println("Records updated: ", res.ModifiedCount)

// 	return nil
// }

func UpdateStudentRecords(student models.StudentAttendance, teacherEmail string) error {

	var status string
	if student.Attendance {
		status = "present"
	} else {
		status = "absent"
	}

	teacherEmailExists, err := studentsCollection.CountDocuments(context.Background(), bson.M{
		"symbolnumber":            student.Student.SymbolNumber,
		"attendance.teacheremail": teacherEmail,
	})

	if err != nil {
		log.Println(err)
	}

	if teacherEmailExists > 0 {

		// teacherEmail already exists in database, update dates array

		filter := bson.M{
			"symbolnumber":            student.Student.SymbolNumber,
			"attendance.teacheremail": teacherEmail,
		}

		update := bson.M{
			"$push": bson.M{
				"attendance.$.dates": bson.M{
					"$each": []interface{}{
						bson.M{"date": time.Now().Format("2006-01-02"), "status": status},
					},
				},
			},
		}

		_, err := studentsCollection.UpdateOne(context.Background(), filter, update)

		if err != nil {
			log.Println(err)
		}

	} else {
		// teacherEmail does not exist, update attendance array and also insert dates array with the day's attendance status

		filter := bson.M{
			"symbolnumber": student.Student.SymbolNumber,
		}

		update := bson.M{
			"$push": bson.M{
				"attendance": bson.M{
					"teacheremail": teacherEmail,
					"dates": []models.AttendanceDate{
						// {}
						{Date: time.Now().Format("2006-01-02"), Status: status},
					},
				},
			},
		}

		opts := options.Update().SetUpsert(true)

		_, err := studentsCollection.UpdateOne(context.Background(), filter, update, opts)

		if err != nil {
			log.Println(err)
		}
	}
	return nil

}
