import React, { useState } from 'react';
import { Input } from 'semantic-ui-react';
import { db } from './../firebase';
import { getDocs, collection } from 'firebase/firestore';

export default function Alarms(props) {
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
  console.log(alarmasTodas[0]);
  return (
    <div>
      <h1>Buscador de Alarmas</h1>
      <div className="containerInput">
        <Input
          className="inputBuscar"
          icon="list"
          placeholder="Buscar Alarmas..."
        />
      </div>
    </div>
  );
}
