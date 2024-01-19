import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ShiftExpandable from "./ShiftExpandable";
import axios from "axios";

export interface FilterData {
  shift: string;
  department: string;
  semester: string;
}

export interface Student {
    name: string,
    shift: string,
    department: string,
    semester: string
}

const Sidebar = (
    {
        studentsArray,
        setStudentsArray
    }: {
        studentsArray: Array<Student>
        setStudentsArray: React.Dispatch<React.SetStateAction<Student[]>>
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

        // console.log(`Response: ${response.data}`)

        const students: Array<Student> = response.data

        // if (students.length === 0) {
        //   // console.log("No Students Found")
        //   setStudentsArray([])
        // } else {
        //   setStudentsArray(students)
        // }

        if (!students) {
          console.log("No Students Found")
          setStudentsArray([])
        } else if (students.length === 0) {
          console.log("Empty students array")
          setStudentsArray([])
        } else {
          setStudentsArray(students)
        }


        // console.log(students)

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
