// import * as React from "react";
import React, { useState } from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Alert, Snackbar, Typography } from "@mui/material";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LockClockOutlined, LockOutlined } from "@mui/icons-material";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  adminToken: string;
}

interface LoginStatus{
  status: 'success' | 'error'
}

const Login = () => {
  const [emailID, setEmailID] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [loginStatus, setLoginStatus] = useState<LoginStatus>({status:'error'})

  const [loginIncorrect, setLoginIncorrect] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (event: any) => {
    event.preventDefault();

    checkLoginCredentials()

    try {

      const response = await axios.post<LoginResponse>('http://localhost:8080/api/admin/login', {
        emailID: emailID,
        password: password,
      })

      localStorage.setItem('adminToken', response.data.adminToken)
      setLoginStatus({status:'success'})
      setSnackbarOpen(true)

      navigate('/dashboard')


    } catch (error) {
      console.error("Error logging in")

      setLoginStatus({status:'error'})
      setSnackbarOpen(true)
      setLoginIncorrect(true)
      

    }

  };

  function isButtonDisabled() {
    return emailID == "" || password == "";
  }

  React.useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      navigate('/dashboard')
    }
  })

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  function checkLoginCredentials() {
    const isEmailCorrect = /@ncit\.edu\.np$/.test(emailID)

    if (!(isEmailCorrect && password.trim())) {
      // setloginIncorrect(true)
      setLoginIncorrect(true)
    } 

  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        // justifyContent: 'center'
        alignItems: "center",
        backgroundColor: "#91C8E4",
        height: "100vh",
        overflowY: "hidden",
      }}
    >


      <Snackbar
      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
      open={snackbarOpen}
      // message={loginStatus.status=='success'? "Login Successful" : "Error Logging In!"}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}
      >
        <Alert severity={loginStatus.status} onClose={handleSnackbarClose}>
          {loginStatus.status === 'success' ? "Login Successful!" : "Login Unsuccessful"}
        </Alert>
      </Snackbar>

      <Box sx={{flex:'1', m:12}}>

      <Typography
        variant="h1"
        sx={{ textAlign: 'center', color:"#4682a9", fontSize:"10rem", fontWeight: "800", fontFamily: "Poppins", margin: "100px" }}
      >
        Attendify
      </Typography>

      <Typography
        variant="h4"
        sx={{ textAlign: 'center', color: "#4682a9", fontWeight: "bold", fontFamily: "Poppins", margin: "100px" }}
      >
        Admin Dashboard
      </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex:'1',
          m:12,
          maxWidth: "500px",
          backgroundColor: "#fff",
          borderRadius: "5px",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.5)",
          padding: "50px",
        }}
      >
        {/* <Lock */}
        <Typography variant="h4" sx={{margin:2, fontFamily: "Poppins", color:"#4682a9", fontWeight:"600"}}>
          Login
        </Typography>

        <Box
          sx={{
            padding: "10px",
          }}
        >
          {/* emailID TextField */}
          <TextField
            label="emailID"
            type="text"
            error={loginIncorrect}
            value={emailID}
            onChange={(e) => {
              setEmailID(e.target.value);
            }}
            fullWidth
            required
            sx={{
              mt: "10px"
              // margin:"10px"
            }}
          />
          {/* Password TextField */}
          <TextField
            label="Password"
            error={loginIncorrect}
            type="password"
            helperText={loginIncorrect ? "Incorrect email or password" : "" }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{
              mt: "10px"
              // margin:"10px"
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isButtonDisabled()}
            fullWidth
            sx={{
              // margin:"10px"
              mt: "10px"
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        {/* </Box> */}
        </Box>
      </Box>
      </Box>
  );
};

export default Login;
