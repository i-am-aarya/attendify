import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import axios from "axios";

const ViewStudents = () => {
  const [studentShift, setStudentShift] = useState("");
  const [studentSemester, setStudentSemester] = useState("");
  const [studentDepartment, setStudentDepartment] = useState("");

  // const handleSemesterChange(event: SelectChangeEvent) {
  //     setStudentSemester(event.target.value)
  // }

  //   const [selectedValue, setSelectedValue] = useState('');

  //   const handleChange = (event:any) => {
  //     setSelectedValue(event.target.value);
  //   };


  const handleStudentSearch = async (event: React.FormEvent) => {
    event.preventDefault()

    try {

        const req = {
            studentShift: studentShift,
            studentDepartment: studentDepartment,
            studentSemester: studentSemester,
        }

        console.log(req)

        const response = await axios.post("http://localhost:8080/api/admin/find-students", {
            studentShift: studentShift,
            studentDepartment: studentDepartment,
            studentSemester: studentSemester,
        })
    } catch (error) {
        console.error(error)
    }

  }

  return (
    <Dashboard>
      <Typography
        variant="h4"
        sx={{
          color: "#4682A9",
          fontFamily: "Poppins",
          fontWeight: "600",
          m: 3,
        }}
      >
        View All Students
      </Typography>

      <Box sx={{ m: 2 }}>
        <FormControl fullWidth sx={{ m: 2 }}>
          <InputLabel id="shift-label">Shift</InputLabel>
          <Select
            labelId="shift-label"
            label="Shift"
            value={studentShift}
            onChange={(e) => {
              setStudentShift(e.target.value);
            }}
          >
            <MenuItem value="morning">Morning</MenuItem>
            <MenuItem value="day">Day</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ m: 2 }}>
          <InputLabel id="department-label">Department</InputLabel>
          <Select
            labelId="department-label"
            label="Department"
            value={studentDepartment}
            onChange={(e) => {
              setStudentDepartment(e.target.value);
            }}
          >
            <MenuItem value="software">Software</MenuItem>
            <MenuItem value="it">IT</MenuItem>
            <MenuItem value="computer">Computer</MenuItem>
            <MenuItem value="electrical">Electrical</MenuItem>
            <MenuItem value="civil">Civil</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ m: 2 }}>
          <InputLabel id="semester-label">Semester</InputLabel>
          <Select
            labelId="semester-label"
            value={studentSemester}
            id="semester-dropdown"
            label="Semester"
            onChange={(e) => {
              setStudentSemester(e.target.value);
            }}
          >
            <MenuItem value="first">1st</MenuItem>
            <MenuItem value="second">2nd</MenuItem>
            <MenuItem value="third">3rd</MenuItem>
            <MenuItem value="fourth">4th</MenuItem>
            <MenuItem value="fifth">5th</MenuItem>
            <MenuItem value="sixth">6th</MenuItem>
            <MenuItem value="seventh">7th</MenuItem>
            <MenuItem value="eighth">8th</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{m:2}}>

            <Button variant="contained" onClick={handleStudentSearch}>SEARCH</Button>

        </FormControl>
      </Box>
    </Dashboard>
  );
};

export default ViewStudents;
