import React from 'react';
import './App.css';
import NavBar from './components/navbar/NavBar';
import SideMain from './components/SideMain';
import LoginPage from './components/LoginPage/LoginPage';
import { Route, Router, Routes } from 'react-router-dom';

function App() {
    return (
        <>
        {/* <div className="App">
            <LoginPage/>
        </div> */}
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
        </Routes>
        </>
    );
}

export default App;