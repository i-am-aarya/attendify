import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ShiftExpandable from "./ShiftExpandable";
import axios from "axios";
import { StudentAttendance } from "../MainContent/MainContent";
// import { Student } from "../MainContent/MainContent";

export interface FilterData {
  shift: string;
  department: string;
  semester: string;
}

export interface Student {
  name: string,
  symbolNumber: string,
  shift: string,
  department: string,
  semester: string,
}


const Sidebar = (
    {
        studentsArray,
        setStudentsArray,
        attendanceArray,
        setAttendanceArray
    }: {
        studentsArray: Array<Student>
        setStudentsArray: React.Dispatch<React.SetStateAction<Student[]>>,
        attendanceArray: Array<StudentAttendance>
        setAttendanceArray: React.Dispatch<React.SetStateAction<StudentAttendance[]>>,
    }
) => {
  const [filter, setFilter] = useState<FilterData>({
    shift: "",
    department: "",
    semester: "",
  });

  const [searchAvailable, setSearchAvailable] = useState(false);

  const findStudents = async (event: any) => {
    event.preventDefault();

    console.log(filter);
    try {
        const response = await axios.get<Array<Student>>("http://localhost:8080/api/find-students", {
            params: filter
        });

        const students: Array<Student> = response.data
        // console.log(students)


        if (!students) {
          console.log("No Students Found")
          setStudentsArray([])
          setAttendanceArray([])
        } else if (students.length === 0) {
          console.log("Empty students array")
          setStudentsArray([])
          setAttendanceArray([])
        } else {
          setStudentsArray(students)
          const initialAttendance: StudentAttendance[] =  studentsArray.map((student) => ({
            student,
            attendance: false
          }))

          setAttendanceArray(initialAttendance)
        }

    } catch (error) {
        console.error(error)
    }

  };

  const checkSearchAvailable = () => {
    if (filter.department && filter.semester && filter.shift) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setSearchAvailable(checkSearchAvailable())
  }, [filter.department, filter.semester, filter.shift]);

  return (
    <>
      <div className="sidebar">
        <h1>Class</h1>
        <ShiftExpandable
          shiftName="Morning"
          filter={filter}
          setFilter={setFilter}
        />
        <ShiftExpandable
          shiftName="Day"
          filter={filter}
          setFilter={setFilter}
        />

        <button
          onClick={findStudents}
          className={
            searchAvailable
              ? "find-students-button"
              : "find-students-button-disabled"
          }
          disabled={searchAvailable ? false : true}
        >
          🔍 Find Students
        </button>
      </div>
    </>
  );
};

export default Sidebar;
