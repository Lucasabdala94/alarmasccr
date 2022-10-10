import React, { useState } from 'react';
import { Input } from 'semantic-ui-react';
import { db } from './../firebase';
import { getDocs, collection, query, get } from 'firebase/firestore';

export default function Alarms(props) {
  let alarmasTodas = [];
  (async () => {
    try {
      const getAlarm = await getDocs(collection(db, '/alarmas'));
      getAlarm.forEach((doc) => {
        <div>
          <h3>alarma:</h3>
          <p>{doc.data().alarma}</p>
        </div>;
      });
    } catch (e) {
      console.log(e);
    }
  })();
  console.log(alarmasTodas);

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
