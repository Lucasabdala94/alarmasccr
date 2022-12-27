import React from 'react';
import './App.css';
import {Routes,Route} from "react-router-dom";
import { AuthProvider } from './context/authContext';
import Home from './components/layout/home/Home';
import Login from './components/layout/Login/Login';
import Register from './components/layout/Registro/Register';
import ProtectedRoutes from './components/ProtectedRoutes';


export default function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path='/' element={<ProtectedRoutes><Home/></ProtectedRoutes>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
    </Routes>
    </AuthProvider> 
  );
}

