import React, { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
  withStyles,
} from "@mui/material";
import CustomTextField from "../../components/CustomTextField";
import axios from "axios";
import { isNumericLiteral } from "typescript";

const AddStudent = () => {
  const [studentName, setStudentName] = useState("");
  const [studentSymbolNo, setStudentSymbolNo] = useState("");
  const [studentSemester, setStudentSemester] = useState("");
  const [studentDepartment, setStudentDepartment] = useState("");
  const [studentShift, setStudentShift] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [studentAdditionStatus, setStudentAdditionStatus] = useState(false)

  const [emailIsValid, setEmailIsValid] = useState(true)
  const [symbolNumberIsNumber, setSymbolNumberIsNumber] = useState(true)
  const [nameIsValid, setNameIsValid] = useState(true)
  const [semesterIsValid, setSemesterIsValid] = useState(true)
  const [departmentIsValid, setDepartmentIsValid] = useState(true)
  const [shiftIsValid, setShiftIsValid] = useState(true)

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleAddStudent = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!checkFormValidity()) {
      return
    }

    try {

      const jwt = localStorage.getItem('adminToken')

      const response = await axios.post(
        "http://localhost:8080/api/admin/add-student",
        {
          name: studentName,
          symbolNumber: studentSymbolNo,
          department: studentDepartment,
          shift: studentShift,
          semester: studentSemester,
          email: studentEmail
        }
      )

      setStudentName("");
      setStudentSymbolNo("");
      setStudentSemester("");
      setStudentDepartment("");
      setStudentShift("");
      setStudentEmail("");



      setStudentAdditionStatus(true)
      setSnackbarOpen(true)

    } catch (error) {
      console.error(error)

      setStudentAdditionStatus(false)
      setSnackbarOpen(true)
    }
  }

  function checkFormValidity() {
    let valid = true

    if (!(/@ncit\.edu\.np$/.test(studentEmail))) {
      setEmailIsValid(false)
      valid = false
    }

    if (!isNaN(parseInt(studentSymbolNo)) || !studentSymbolNo.trim()) {
      setSymbolNumberIsNumber(false)
      valid = false
    }

    if (!studentName.trim()) {
      setNameIsValid(false)
      valid = false
    }


    if (!studentSemester.trim()) {
      setSemesterIsValid(false)
      valid = false
    }

    
    if (!studentDepartment.trim()) {
      setDepartmentIsValid(false)
      valid = false
    }

    
    if (!studentShift.trim()) {
      setShiftIsValid(false)
      valid = false
    }

    

    return valid
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
        Add New Student
      </Typography>

      

      <Paper sx={{ p: 3, borderRadius: 3 }} elevation={5}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Poppins",
            fontWeight: "600",
            color: "#91C8E4",
            m: 1,
          }}
        >
          Student Details
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: "50vw",
          }}
        >
          {/* <form ></form> */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <CustomTextField
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
              }}
              label="Name"

              error={!nameIsValid}
              helperText={nameIsValid ? "" : "Name cannot be empty"}

              fullWidth
            />

            <CustomTextField
              value={studentSymbolNo}
              onChange={(e) => {
                setStudentSymbolNo(e.target.value);
              }}
              label="Symbol Number"

              error={!symbolNumberIsNumber}
              helperText={symbolNumberIsNumber ? "" : "Symbol number must be an integer"}

              fullWidth
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            

            <FormControl fullWidth>
              <InputLabel sx={{ color: "#4682A9" }}>Semester</InputLabel>
              <Select
                label="Semester"
                value={studentSemester}
                onChange={(e) => {
                  setStudentSemester(e.target.value);
                }}
                sx={{
                  color: "#4682A9",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#91C8E4",
                  },
                }}

              error={!semesterIsValid}
              >
                <MenuItem value={"first"}>1st</MenuItem>
                <MenuItem value={"second"}>2nd</MenuItem>
                <MenuItem value={"third"}>3rd</MenuItem>
                <MenuItem value={"fourth"}>4th</MenuItem>
                <MenuItem value={"fifth"}>5th</MenuItem>
                <MenuItem value={"sixth"}>6th</MenuItem>
                <MenuItem value={"seventh"}>7th</MenuItem>
                <MenuItem value={"eighth"}>8th</MenuItem>
              </Select>
              <FormHelperText>{semesterIsValid ? "" : "Please select an option"}</FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={{ color: "#4682A9" }}>Department</InputLabel>
              <Select
                // labelId="student-semester-label"
                label="Department"
                value={studentDepartment}
                onChange={(e) => {
                  setStudentDepartment(e.target.value);
                }}
                sx={{
                  color: "#4682A9",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#91C8E4",
                  },
                }}
                error={!departmentIsValid}
              >
                <MenuItem value={"software"}>Software</MenuItem>
                <MenuItem value={"it"}>IT</MenuItem>
                <MenuItem value={"electrical"}>Electrical</MenuItem>
                <MenuItem value={"computer"}>Computer</MenuItem>
                <MenuItem value={"civil"}>Civil</MenuItem>
              </Select>
              <FormHelperText>{semesterIsValid ? "" : "Please select an option"}</FormHelperText>

            </FormControl>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>

            <FormControl fullWidth>
              <InputLabel sx={{ color: "#4682A9" }}>Shift</InputLabel>
              <Select
                // labelId="student-semester-label"
                label="Shift"
                value={studentShift}
                onChange={(e) => {
                  setStudentShift(e.target.value);
                }}
                sx={{
                  color: "#4682A9",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#91C8E4",
                  },
                }}
                error={!shiftIsValid}
              >
                <MenuItem value={"morning"}>Morning</MenuItem>
                <MenuItem value={"day"}>Day</MenuItem>
              </Select>
              <FormHelperText>{semesterIsValid ? "" : "Please select an option"}</FormHelperText>

            </FormControl>







            <CustomTextField
              value={studentEmail}
              onChange={(e) => {
                setStudentEmail(e.target.value);
              }}
              label="Email"
              fullWidth

              error={!emailIsValid}
              helperText={emailIsValid ? "" : "Insert a valid college email"  }
            />
          </Box>

          <Box>
            <Button
              variant="contained"
              onClick={handleAddStudent}
              sx={{
                backgroundColor: "#4682A9",
                fontFamily: "Poppins",
                fontWeight: "600",
              }}
              fullWidth
            >
              ADD STUDENT
            </Button>
          </Box>
        </Box>
        

      </Paper>


      <Snackbar
      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
      open={snackbarOpen}
      // message={studentAdditionStatus? "Created New Student!" : "Error Creating New Student!"}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}
      >
        <Alert severity={studentAdditionStatus? 'success' : 'error'} onClose={handleSnackbarClose}>
          {/* {loginStatus.status === 'success' ? "Login Successful!" : "Login Unsuccessful"} */}
          {studentAdditionStatus? "Created New Student!" : "Error Creating New Student!"}
        </Alert>
      </Snackbar>
    </Dashboard>
  );
};

export default AddStudent;
