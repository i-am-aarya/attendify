import React, { useEffect, useState } from "react";
import "./MainContent.css";
import StudentComponent from "../StudentComponent/StudentComponent";
import Sidebar from "../sidebar/Sidebar";
import NavBar from "../navbar/NavBar";
import { Student } from "../sidebar/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export interface StudentAttendance {
  student: Student,
  attendance: boolean
}

const MainContent = () => {
  
  const navigate = useNavigate()

  const [studentsFound, setStudentsFound] = useState(false)
  const [studentsArray, setStudentsArray] = useState<Array<Student>>([])
  const [attendanceArray, setAttendanceArray] = useState<Array<StudentAttendance>>([])


  useEffect(() => {
    if (!(studentsArray.length === 0)) {
      setStudentsFound(true)
    } else {
      setStudentsFound(false)
    }

    setAttendanceArray(studentsArray.map(student => ({student, attendance: false})))

  }, [studentsArray])


  const handleCheckboxToggle = (index: number) => {
    const updatedAttendanceArray = [...attendanceArray];
    updatedAttendanceArray[index].attendance = !updatedAttendanceArray[index].attendance
    setAttendanceArray(updatedAttendanceArray)
  }

  const handleAttendanceSubmission = async (event: React.FormEvent) => {
    event.preventDefault()
    try {

      console.log("ATTENDANCE ARRAY")
      console.log("ATTENDANCE ARRAY")

      console.log(attendanceArray)

      console.log("ATTENDANCE ARRAY")
      console.log("ATTENDANCE ARRAY")
      const jwt = localStorage.getItem('token')
      const response = await axios.post(
        "http://localhost:8080/api/submit-attendance",
        attendanceArray,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      )

      console.log(response)


      navigate("/")

    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <>
      <div className="main-content">
        <NavBar/>
        {/* contains sidebar and the students display area */}
        <div className="sidebar-students-display-area"> 
          <Sidebar studentsArray={studentsArray} setStudentsArray={setStudentsArray} attendanceArray={attendanceArray} setAttendanceArray={setAttendanceArray} />

          <div className="students-display-area">
          <div className="students-text-wrapper">Students</div>

            {studentsFound ? 
            <>

            {

            studentsArray.map((student, index) => (
              <StudentComponent
              studentDetails={student}
              key={student.symbolNumber}
              studentAttendance={attendanceArray[index]}
              onCheckboxToggle = {() => handleCheckboxToggle(index)}
              />
            ))

            }
            <div className="submit-button-container">

            <button type="submit" className="submit-attendance-button" onClick={handleAttendanceSubmission}>Submit</button>
            </div>


            </>

             : <div>No Students Found</div>}

          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
