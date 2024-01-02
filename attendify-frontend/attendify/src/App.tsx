import React from 'react';
import './App.css';
import NavBar from './components/navbar/NavBar';
import SideMain from './components/SideMain';

function App() {
    return (
        <>
        <div className="App">
            <NavBar></NavBar>
            <SideMain></SideMain>
        </div>
        </>
    );
}

export default App;