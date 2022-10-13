import React, { useState } from 'react';
import './App.css';
import Alarms from './components/Alarms';
import ModalAlarm from './components/ModalAlarm';
import { user } from './firebase';
function App() {
  user;
  return (
    <div className="App">
      <h1>Registro de Alarmas</h1>
      <div className="contenedor-centrador">
        <ModalAlarm />
      </div>

      <Alarms />
    </div>
  );
}

export default App;
