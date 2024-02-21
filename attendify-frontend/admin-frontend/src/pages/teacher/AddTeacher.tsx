import { Alert, Box, Button, Paper, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import CustomTextField from "../../components/CustomTextField";
import axios from "axios";

const AddTeacher = () => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [additionSuccessful, setAdditionSuccessful] = useState(false);

  const handleAddTeacher = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/add-teacher",
        {
          name: teacherName,
          emailID: teacherEmail,
          password: teacherPassword,
        }
      );

      setTeacherName("");
      setTeacherEmail("");
      setTeacherPassword("");

      setAdditionSuccessful(true);
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);

      setAdditionSuccessful(false);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
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
          severity={additionSuccessful ? "success" : "error"}
          onClose={handleSnackbarClose}
        >
          {additionSuccessful
            ? "Record Creation Successful!"
            : "Record Creation Unsuccessful!"}
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
        Add New Teacher
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
          Teacher
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: "50vw",
          }}
        >
          {/* <Box> */}
          <CustomTextField
            label="Name"
            fullWidth
            value={teacherName}
            onChange={(e) => {
              setTeacherName(e.target.value);
            }}
          />
          <CustomTextField
            label="Email"
            fullWidth
            value={teacherEmail}
            onChange={(e) => {
              setTeacherEmail(e.target.value);
            }}
          />
          <CustomTextField
            label="Password"
            fullWidth
            value={teacherPassword}
            onChange={(e) => {
              setTeacherPassword(e.target.value);
            }}
          />

          <Button
            variant="contained"
            onClick={handleAddTeacher}
            sx={{
              backgroundColor: "#4682A9",
              fontFamily: "Poppins",
              fontWeight: "600",
            }}
            fullWidth
          >
            ADD TEACHER
          </Button>
        </Box>
      </Paper>
    </Dashboard>
  );
};

export default AddTeacher;
