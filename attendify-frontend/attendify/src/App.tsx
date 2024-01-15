import React from 'react';
import './App.css';
import NavBar from './components/navbar/NavBar';
import SideMain from './components/SideMain';
import LoginPage from './components/LoginPage/LoginPage';
import { Route, Router, Routes } from 'react-router-dom';

function App() {
    return (
        <>
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/dashboard' element={<SideMain/>} />
        </Routes>
        </>
    );
}

export default App;