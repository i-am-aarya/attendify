import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ShiftExpandable from "./ShiftExpandable";
import axios from "axios";
import { StudentAttendance } from "../MainContent/MainContent";
import { toast } from "react-toastify";
// import { Student } from "../MainContent/MainContent";

export interface FilterData {
  shift: string;
  department: string;
  semester: string;
}

export interface Student {
  name: string;
  symbolNumber: string;
  shift: string;
  department: string;
  semester: string;
}


export interface DateRecord {
  date: string;
  status: string;
}

export interface Attendance {
  teacherEmail: string;
  dates: DateRecord[];
}

export interface StudentRecord {
  Attendance: Attendance;
  Name: string;
  SymbolNumber: string; // Assuming SymbolNumber is a string based on the provided data
}
export interface AttendanceResponse extends Array<StudentRecord> {}


const Sidebar = ({
  studentsArray,
  setStudentsArray,
  attendanceArray,
  setAttendanceArray,

  attendanceRecords,
  setAttendanceRecords
}: {
  studentsArray: Array<Student>;
  setStudentsArray: React.Dispatch<React.SetStateAction<Student[]>>;
  attendanceArray: Array<StudentAttendance>;
  setAttendanceArray: React.Dispatch<React.SetStateAction<StudentAttendance[]>>;

  attendanceRecords: AttendanceResponse,
  setAttendanceRecords: React.Dispatch<React.SetStateAction<AttendanceResponse>>;
}) => {
  const [filter, setFilter] = useState<FilterData>({
    shift: "",
    department: "",
    semester: "",
  });

  const [searchAvailable, setSearchAvailable] = useState(false);

  const findStudents = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.get<Array<Student>>(
        "http://localhost:8080/api/find-students",
        {
          params: filter,
        }
      );

      const students: Array<Student> = response.data;

      if (!students) {
        // console.log("No Students Found");
        setStudentsArray([]);
        setAttendanceArray([]);
      } else if (students.length === 0) {
        // console.log("Empty students array");
        setStudentsArray([]);
        setAttendanceArray([]);
      } else {
        setStudentsArray(students);
        const initialAttendance: StudentAttendance[] = studentsArray.map(
          (student) => ({
            student,
            attendance: false,
          })
        );

        setAttendanceArray(initialAttendance);

        // toast("Students Found!", {
        //   position: "top-center",
        toast.success("Students Found!", { position: "top-center" });
      }
    } catch (error) {
      const errorMessage = "Failed to find students";
      // toast.error()
      toast.error(errorMessage, {
        position: "top-center",
      });
      console.error(error);
    }
  };

  const handleFindAttendanceRecords = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const jwt = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/api/get-attendance-records",
        {
          params: filter,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      
      const records: AttendanceResponse = response.data
      if (!records) {
        // conso
        setAttendanceRecords([]);
      } else if (records.length === 0) {
        setAttendanceRecords([])
      } else {
        setAttendanceRecords(response.data)
        toast.success("Attendance Records Found!", { position: "top-center" });
      }

      // console.log(`Attendance Records: ${records}`)
      // const records: Array<Student> = response.;


    } catch (error) {
      // toast.error("")
      console.error(error);
      const errorMessage = "Failed to find students data";
      toast.error(errorMessage, {
        position: "top-center",
      });
      // create a toast to display error
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
    setSearchAvailable(checkSearchAvailable());
  }, [filter.department, filter.semester, filter.shift]);

  const [selectedShift, setSelectedShift] = useState("");
  const shiftNames = ["Morning", "Day"];

  const handleShiftSelection = (shiftName: string) => {
    setSelectedShift(shiftName.toLowerCase());

    setFilter(() => ({
      shift: shiftName.toLowerCase(),
      department: "",
      semester: "",
    }));
  };

  return (
    <>
      <div className="sidebar">
        <h1>Class</h1>

        {shiftNames.map((shiftName, index) => (
          <ShiftExpandable
            shiftName={shiftName}
            filter={filter}
            setFilter={setFilter}
            isSelected={selectedShift === shiftName.toLowerCase()}
            handleShiftSelection={handleShiftSelection}
            key={index}
          />
        ))}
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

        <button
          onClick={handleFindAttendanceRecords}
          className={
            searchAvailable
              ? "find-students-button"
              : "find-students-button-disabled"
          }
          disabled={searchAvailable ? false : true}
        >
          🔍 Find Attendance Records
        </button>
      </div>
    </>
  );
};

export default Sidebar;
