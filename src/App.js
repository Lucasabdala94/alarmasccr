import React from 'react';
import './App.css';
import Alarms from './components/Alarms';
import ModalAlarm from './components/ModalAlarm';

function App() {
  return (
    <div className="App">
      <h1>Registro de Mediciones y Alarmas Erroneos</h1>
      <ModalAlarm />
      <Alarms />
    </div>
  );
}

export default App;
