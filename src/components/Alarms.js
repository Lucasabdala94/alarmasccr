import React, { useState,useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { db } from './../firebase';
import { getDocs, collection } from 'firebase/firestore';
import "./alarms.css"

export default function Alarms() {
  const[alarm, setAlarm]=useState([]);
  const [busqueda,setBusqueda]=useState(null);
  const [filtro,setFiltro]=useState(null);
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
  const handleInputChange = (e) => {
    let buscar= e.target.value
    setBusqueda( buscar.toLocaleLowerCase().trim());
    
  };
  
  useEffect(() => {
    (async ()=>{
      
      setFiltro(await filter(alarm,busqueda));
    })()
  }, [busqueda]);

  return (
    <div>
      <h1>Buscador de Alarmas</h1>
      <div className="containerInput">
        <Input
          className="inputBuscar"
          icon="list"
          placeholder="Buscar Alarmas..."
          onChange={handleInputChange}
          
        />
      </div>
      <div className='containerAlarmAll'>
        {busqueda && 
          filtro.map((alarma)=>{
            return (
              <div key={alarma.id} className="containerAlarm">
                <div className='containerAlarm-title'>
                  <p><span> ET: </span>  {alarma.et}</p>
                  <p><span>Nivel de Tension </span>:{alarma.nivelTension}</p>
                </div>
                <div className='containerAlarm-descripcion' >
                  <h4>Señaliza:</h4>
                  <p>{alarma.alarma}</p>
                  <p>{alarma.descripcion}</p>
                </div> 

              </div>
            )
          })
        }
          
         
      </div>
    </div>
  );
}


async function filter(alarmas,busqueda){
  let resultado = await alarmas.filter((alarma)=>{
    
    if(alarma.et.includes(busqueda)){
      return alarma;
    }
  })
  return resultado;
}