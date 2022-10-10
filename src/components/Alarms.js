import React, { useState,useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { db } from './../firebase';
import { getDocs, collection } from 'firebase/firestore';
import "./alarms.css"

export default function Alarms() {
  const[alarm, setAlarm]=useState([]);
  let alarmsAll = [];
  useEffect(() => {
    (async () => {
      try {
        const getAlarm = await getDocs(collection(db, '/alarmas'));
        getAlarm.forEach((doc) => {
          alarmsAll.push(doc.data())
        });
        setAlarm(alarmsAll);
      } catch (e) {
        console.log(e);
      }
    })();

  },[]);
  
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
      <div className='containerAlarmAll'>
        {alarm.length!==0 ? 
          alarm.map((alarma)=>{
            return (
              <div key={alarma.id} className="containerAlarm">
                <div className='containerAlarm-title'>
                  <p> ET: {alarma.et}</p>
                  <p>Nivel de Tension:{alarma.nivelTension}</p>
                </div>
                <div >
                  <h4>{alarma.alarma}</h4>
                  <p>{alarma.descripcion}</p>
                </div>


              </div>
            )
          }):
          null
        }
          
         
      </div>
    </div>
  );
}
