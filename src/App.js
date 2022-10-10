import React from 'react';
import './App.css';
import Alarms from './components/Alarms';
import ModalAlarm from './components/ModalAlarm';
import { db } from './firebase';
import { getDocs, collection } from 'firebase/firestore';

function App() {
  let alarmasTodas = [];
  (async () => {
    try {
      const getAlarm = await getDocs(collection(db, '/alarmas'));
      getAlarm.forEach((doc) => {
        alarmasTodas.push({
          id: doc.id,
          alarma: doc.data().alarma,
          descripcion: doc.data().descripcion,
          et: doc.data().et,
          nivelTension: doc.data().nivelTension,
        });
      });
    } catch (e) {
      console.log(e);
    }
  })();
  console.log(alarmasTodas);
  return (
    <div className="App">
      <h1>Registro de Mediciones y Alarmas Erroneos</h1>
      <ModalAlarm />
      <Alarms />
    </div>
  );
}

export default App;
