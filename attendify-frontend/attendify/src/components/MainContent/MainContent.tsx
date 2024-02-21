import React, { useEffect, useState } from "react";
import "./MainContent.css";
import StudentComponent from "../StudentComponent/StudentComponent";
import Sidebar, { AttendanceResponse } from "../sidebar/Sidebar";
import NavBar from "../navbar/NavBar";
import { Student } from "../sidebar/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface StudentAttendance {
  student: Student;
  attendance: boolean;
}

const MainContent = () => {
  const navigate = useNavigate();

  const [studentsFound, setStudentsFound] = useState(false);
  const [studentsArray, setStudentsArray] = useState<Array<Student>>([]);
  const [attendanceArray, setAttendanceArray] = useState<
    Array<StudentAttendance>
  >([]);

  const [attendanceRecordsFound, setAttendanceRecordsFound] = useState(false);
  // const [attendanceRecordsArray, setAttendanceRecordsArray] = useState
  const [attendanceRecords, setAttendanceRecords] =
    useState<AttendanceResponse>([]);

  useEffect(() => {
    if (!(attendanceRecords.length === 0)) {
      setAttendanceRecordsFound(true);
    } else {
      setAttendanceRecordsFound(false);
    }
  }, [attendanceRecords]);

  useEffect(() => {
    if (!(studentsArray.length === 0)) {
      setStudentsFound(true);
    } else {
      setStudentsFound(false);
    }

    setAttendanceArray(
      studentsArray.map((student) => ({ student, attendance: false }))
    );
  }, [studentsArray]);

  const handleCheckboxToggle = (index: number) => {
    const updatedAttendanceArray = [...attendanceArray];
    updatedAttendanceArray[index].attendance =
      !updatedAttendanceArray[index].attendance;
    setAttendanceArray(updatedAttendanceArray);
  };

  const handleAttendanceSubmission = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const jwt = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/submit-attendance",
        attendanceArray,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log(response);

      toast.success("Attendance Records Updated!", {
        position: "top-center",
        autoClose: 2000,
      });

      navigate("/");

      // navigate to records
    } catch (error) {
      toast.error("Error! Records could not be updated.", {
        position: "top-center",
        autoClose: 2000,
      });
      console.error(error);
    }
  };

  const allDates = Array.from(
    new Set(
      attendanceRecords.flatMap((student) =>
        student.Attendance.dates.map((dateRecord) => dateRecord.date)
      )
    )
  );

  return (
    <>
      <div className="main-content">
        <NavBar />
        <div className="sidebar-students-display-area">
          <Sidebar
            studentsArray={studentsArray}
            setStudentsArray={setStudentsArray}
            attendanceArray={attendanceArray}
            setAttendanceArray={setAttendanceArray}
            attendanceRecords={attendanceRecords}
            setAttendanceRecords={setAttendanceRecords}
          />

          <div className="students-display-area">
            <div className="students-text-wrapper">
              {studentsFound
                ? "Students"
                : attendanceRecordsFound
                ? "Attendance Records"
                : "Welcome"}
            </div>

            {studentsFound ? (
              <>
                {studentsArray.map((student, index) => (
                  <StudentComponent
                    studentDetails={student}
                    key={student.symbolNumber}
                    studentAttendance={attendanceArray[index]}
                    onCheckboxToggle={() => handleCheckboxToggle(index)}
                  />
                ))}
                <div className="submit-button-container">
                  <button
                    type="submit"
                    className="submit-attendance-button"
                    onClick={handleAttendanceSubmission}
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : attendanceRecordsFound ? (
              <>
                <div style={{ width:"60vw", overflowX: "scroll"}}>
                  {
                    <table cellSpacing={"25px"} align="left">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Symbol Number</th>
                          {allDates.map((date) => (
                            <th key={date}>{date}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {attendanceRecords.map((student, index) => (
                          <tr key={index}>
                            <td>{student.Name}</td>
                            <td>{student.SymbolNumber}</td>
                            {allDates.map((date) => (
                              <td key={date}>

                                {student.Attendance.dates.find(
                                  (dateRecord) => dateRecord.date === date
                                )?.status === "absent" ||
                                !student.Attendance.dates.find(
                                  (dateRecord) => dateRecord.date === date
                                )
                                  ? <p> absent </p>
                                  : <p style={{color:"#4682A9"}}>present</p>}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  }
                </div>
              </>
            ) : (
              <>
            <div style={{fontWeight:"600", fontSize:"1.8rem", fontFamily:"Poppins"}}>
                Search For Students
            </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
