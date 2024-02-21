import React, { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import { Alert, Box, Button, Paper, Snackbar, Typography } from "@mui/material";
import CustomTextField from "../../components/CustomTextField";
import axios from "axios";

const EditTeacher = () => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [additionSuccessful, setAdditionSuccessful] = useState(false);

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleEditTeacher = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/edit-teacher",
        {
          teacherName: teacherName,
          teacherEmail: teacherEmail,
          teacherPassword: teacherPassword,
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
            ? "Record Edit Successful!"
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
        Edit Teacher
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
            label="Email"
            fullWidth
            value={teacherEmail}
            onChange={(e) => {
              setTeacherEmail(e.target.value);
            }}
          />
          <CustomTextField
            label="Name"
            fullWidth
            value={teacherName}
            onChange={(e) => {
              setTeacherName(e.target.value);
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
            onClick={handleEditTeacher}
            sx={{
              backgroundColor: "#4682A9",
              fontFamily: "Poppins",
              fontWeight: "600",
            }}
            fullWidth
          >
            EDIT TEACHER
          </Button>
        </Box>
      </Paper>
    </Dashboard>
  );
};

export default EditTeacher;
