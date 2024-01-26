import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import LoginPage from './components/LoginPage/LoginPage';
import ProtectedRoutes from './components/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';

function App() {

    return (
        <>
        <ToastContainer/>
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/dashboard' element={<ProtectedRoutes><MainContent/></ProtectedRoutes>} />
        </Routes>
        </>
    );
}

export default App;