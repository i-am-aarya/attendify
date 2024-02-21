import React, { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import CustomTextField from "../../components/CustomTextField";
import axios from "axios";

const EditStudent = () => {
  const [studentName, setStudentName] = useState("");
  const [studentSymbolNo, setStudentSymbolNo] = useState("");
  const [studentSemester, setStudentSemester] = useState("");
  const [studentDepartment, setStudentDepartment] = useState("");
  const [studentShift, setStudentShift] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editSuccessful, setEditSuccessful] = useState(false);

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleEditStudent = async (event: React.FormEvent) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/edit-student",
        {
          symbolNumber: studentSymbolNo,
          name: studentName,
          semester: studentSemester,
          department: studentDepartment,
          shift: studentShift,
          email: studentEmail,
        }
      );

      setStudentName("");
      setStudentSymbolNo("");
      setStudentSemester("");
      setStudentDepartment("");
      setStudentShift("");
      setStudentEmail("");

      setEditSuccessful(true);
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setEditSuccessful(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Dashboard>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity={editSuccessful ? "success" : "error"}
          onClose={handleSnackbarClose}
        >
          {editSuccessful
            ? "Record Edited Successfully!"
            : "Record Edit Unsuccessful!"}
        </Alert>
      </Snackbar>

      <Typography
        variant="h4"
        sx={{
          color: "#4682A9",
          fontFamily: "Poppins",
          fontWeight: "600",
          m: 3,
        }}
      >
        Edit Student
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
              value={studentSymbolNo}
              onChange={(e) => {
                setStudentSymbolNo(e.target.value);
              }}
              label="Symbol Number"
              fullWidth
            />

            <CustomTextField
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
              }}
              label="Name"
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
              >
                <MenuItem value={"software"}>Software</MenuItem>
                <MenuItem value={"it"}>IT</MenuItem>
                <MenuItem value={"electrical"}>Electrical</MenuItem>
                <MenuItem value={"computer"}>Computer</MenuItem>
                <MenuItem value={"civil"}>Civil</MenuItem>
              </Select>
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
              >
                <MenuItem value={"morning"}>Morning</MenuItem>
                <MenuItem value={"day"}>Day</MenuItem>
              </Select>
            </FormControl>

            <CustomTextField
              value={studentEmail}
              onChange={(e) => {
                setStudentEmail(e.target.value);
              }}
              label="Email"
              fullWidth
            />
          </Box>

          <Box>
            <Button
              variant="contained"
              onClick={handleEditStudent}
              sx={{
                backgroundColor: "#4682A9",
                fontFamily: "Poppins",
                fontWeight: "600",
              }}
              fullWidth
            >
              EDIT STUDENT
            </Button>
          </Box>
        </Box>
      </Paper>
    </Dashboard>
  );
};

export default EditStudent;
