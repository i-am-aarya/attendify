import React from 'react';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import { Route, Routes } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';

function App() {
    return (
        <>
        <Routes>
            <Route path='/' element={<MainContent/>} />
        </Routes>
        {/* <MainContent/> */}
        </>
    );
}

export default App;
