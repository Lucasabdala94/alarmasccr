import React from 'react';
import './App.css';
import {Routes,Route} from "react-router-dom";
import { AuthProvider } from './context/authContext';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoutes from './components/ProtectedRoutes';


function App() {
 
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

export default App;
