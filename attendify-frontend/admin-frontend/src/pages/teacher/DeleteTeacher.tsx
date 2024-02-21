import React, { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import axios from "axios";
import { Alert, Box, Button, Paper, Snackbar, Typography } from "@mui/material";
import CustomTextField from "../../components/CustomTextField";

const DeleteTeacher = () => {
  const [teacherEmail, setTeacherEmail] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deletionSuccessful, setDeletionSuccessful] = useState(false);

  const handleDeleteStudent = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = axios.get(
        `http://localhost:8080/api/admin/delete-teacher?emailid=${teacherEmail}`
      );

      setTeacherEmail("")
      setDeletionSuccessful(true);
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setDeletionSuccessful(false);
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
          severity={deletionSuccessful ? "success" : "error"}
          onClose={handleSnackbarClose}
        >
          {deletionSuccessful
            ? "Record Deleted Successfully"
            : "Record Deletion Unsuccessful"}
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
        Delete Teacher
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 3 }} elevation={5}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: "50vw",
          }}
        >
          <CustomTextField
            label="Teacher's Email"
            fullWidth
            value={teacherEmail}
            onChange={(e) => {
              setTeacherEmail(e.target.value);
            }}
          />

          <Button
            variant="contained"
            onClick={handleDeleteStudent}
            sx={{
              backgroundColor: "#4682A9",
              fontFamily: "Poppins",
              fontWeight: "600",
            }}
            fullWidth
          >
            DELETE TEACHER
          </Button>
        </Box>
      </Paper>
    </Dashboard>
  );
};

export default DeleteTeacher;
