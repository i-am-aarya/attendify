import React from 'react';
import './App.css';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './pages/ProtectedRoutes';
import Dashboard from './pages/dashboard/Dashboard';
import { ThemeProvider, createTheme } from '@mui/material';
import ViewStudents from './pages/student/ViewStudents';
import AddStudent from './pages/student/AddStudent';



function App() {
  const theme = createTheme({})
  theme.typography.fontFamily = "Poppins";
  return (

    <>
    {/* <ToastContainer/> */}
    <ThemeProvider theme={theme}>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<ProtectedRoutes><Dashboard children={null}/></ProtectedRoutes>}/>
      <Route path='/view-students' element={<ProtectedRoutes><ViewStudents/></ProtectedRoutes>}/>
      <Route path='/add-student' element={<ProtectedRoutes><AddStudent/></ProtectedRoutes>}/>
    </Routes>
    </ThemeProvider>
    </>
  );
}

export default App;
