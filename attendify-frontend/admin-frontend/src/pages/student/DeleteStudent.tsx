import React, { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import { Alert, Box, Button, Paper, Snackbar, Typography } from "@mui/material";
import CustomTextField from "../../components/CustomTextField";
import axios from "axios";

const DeleteStudent = () => {
  const [studentSymbolNumber, setStudentSymbolNumber] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deletionSuccessful, setDeletionSuccessful] = useState(false);

  const handleDeleteStudent = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = axios.get(
        `http://localhost:8080/api/admin/delete-student?symbolnumber=${studentSymbolNumber}`
      );

      setStudentSymbolNumber("");

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
        Delete Student
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
            label="Symbol Number"
            fullWidth
            value={studentSymbolNumber}
            onChange={(e) => {
              setStudentSymbolNumber(e.target.value);
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
            DELETE STUDENT
          </Button>
        </Box>
      </Paper>
    </Dashboard>
  );
};

export default DeleteStudent;
