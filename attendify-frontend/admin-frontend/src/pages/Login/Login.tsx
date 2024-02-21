// import * as React from "react";
import React from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Typography } from "@mui/material";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LockClockOutlined, LockOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  adminToken: string;
}

const Login = () => {
  const [emailID, setEmailID] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate()

  const handleLogin = async (event: any) => {
    event.preventDefault();
    console.log(emailID, password)

    try {

      const response = await axios.post<LoginResponse>('http://localhost:8080/api/admin/login', {
        emailID: emailID,
        password: password,
      })

      localStorage.setItem('adminToken', response.data.adminToken)

      navigate('/dashboard')


    } catch (error) {
      const errorMessage = "Oops! 🙁 Login unsuccessful. Please check your credentials and try again."
        toast.error(errorMessage, {
          position: "top-center"
        })
    }

  };

  function isButtonDisabled() {
    // if (emailID != "" && password != "") {
    //     return true
    // } else {
    //     return false
    // }
    return emailID == "" || password == "";
  }

  React.useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      navigate('/dashboard')
    }
  })

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: 'center'
        alignItems: "center",
        backgroundColor: "#91C8E4",
        height: "100vh",
        overflowY: "hidden",
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", fontStyle: "Poppins", margin: "100px" }}
      >
        Attendify - Admin Login
      </Typography>

      <Box
        sx={{
          borderRadius: "100px",
          backgroundColor: "purple",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        //   border: "1px solid gray",
          marginBottom: "10px"
        }}
      >
        <LockOutlined sx={{ color: "white", width: "30px", height: "50px" }} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          backgroundColor: "#fff",
          borderRadius: "5px",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.5)",
          padding: "50px",
        }}
      >
        {/* <Lock */}
        <Typography variant="h4" sx={{margin:"10px"}}>
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
            type="password"
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
