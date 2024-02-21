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
import AddTeacher from './pages/teacher/AddTeacher';
import DeleteStudent from './pages/student/DeleteStudent';
import DeleteTeacher from './pages/teacher/DeleteTeacher';
import EditStudent from './pages/student/EditStudent';
import EditTeacher from './pages/teacher/EditTeacher';



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

      <Route path='/add-student' element={<ProtectedRoutes><AddStudent/></ProtectedRoutes>}/>
      <Route path='/edit-student' element={<ProtectedRoutes><EditStudent/></ProtectedRoutes>}/>
      <Route path='/delete-student' element={<ProtectedRoutes><DeleteStudent/></ProtectedRoutes>}/>

      <Route path='/add-teacher' element={<ProtectedRoutes><AddTeacher/></ProtectedRoutes>}/>
      <Route path='/edit-teacher' element={<ProtectedRoutes><EditTeacher/></ProtectedRoutes>}/>
      <Route path='/delete-teacher' element={<ProtectedRoutes><DeleteTeacher/></ProtectedRoutes>}/>

    </Routes>
    </ThemeProvider>
    </>
  );
}

export default App;
