import React from 'react';
import './App.css';
import NavBar from './components/navbar/NavBar';
import SideMain from './components/SideMain';
import LoginPage from './components/LoginPage/LoginPage';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<MainLayout />} />
            </Routes>
        </>
    );
}

function MainLayout() {
    return (
        <>
            <NavBar/>
            <SideMain/>
        </>
    );
}

export default App;
