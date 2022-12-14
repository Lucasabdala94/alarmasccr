import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { db } from '../firebase';
import { getDocs, collection, query, orderBy} from 'firebase/firestore';
import './alarms.css';
import ListAlarma from './ListAlarma';

export default function BuscadorAlarms(props) {
  const [alarm, setAlarm] = useState([]);
  //Almacena la busqueda.
  const [busqueda, setBusqueda] = useState(null);
  const [filtro, setFiltro] = useState(null);
  
  const {reload}= props;


  let alarmsAll = [];

  useEffect(() => {
    (async () => {
      try {
        const getAlarm = await getDocs(
          query(collection(db, '/alarmas'), orderBy('fecha','desc'))
        );
        getAlarm.forEach((doc) => {
          alarmsAll.push(doc.data());
        });

        setAlarm(alarmsAll);
        
      } catch (e) {
        console.log(e);
      }
    })();
  }, [reload]);
  const handleInputChange = (e) => {
    let buscar = e.target.value;
    setBusqueda(buscar.toLocaleLowerCase().trim());
  };

  useEffect(() => {
    (async () => {
      setFiltro(await filter(alarm, busqueda));
    })();
  }, [busqueda]);

  return (
    <div className="buscador">
      <h1>Buscador de Alarmas</h1>
      <div className="containerInput containerAlarmAll">
        <Input
          className="inputBuscar"
          icon="list"
          placeholder="Buscar Alarmas..."
          onChange={handleInputChange}
        />
      </div>
      <div className="containerAlarmAll">
        {busqueda ? 
          filtro.map((alarma) => {
            return (<ListAlarma key={alarma.id} alarma={alarma} />)
            
          }) : alarm.map((alarma) => {
            return <ListAlarma key={alarma.id} alarma={alarma}/>
          }) }
      </div>
    </div>
  );
}

async function filter(alarmas, busqueda) {
  let resultado = await alarmas.filter((alarma) => {
    if (alarma.et.includes(busqueda)) {
      return alarma;
    }
  });
  return resultado;
}



