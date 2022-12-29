import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import './alarms.css';
import { db } from '../../../firebase';
import { getDocs, collection, query, orderBy} from 'firebase/firestore';
import ListAlarma from './ListAlarma';
import {filtroBusqueda} from "../../../helper/filtroBusqueda";

export default function BuscadorAlarms(props) {
  //estado que contiene todas las alarmas (datos  e id);
  const [alarm, setAlarm] = useState([]);
  
  //Almacena la busqueda.
  const [busqueda, setBusqueda] = useState(null);
  //Almacena alarma que coincide con busqueda.
  const [filtro, setFiltro] = useState(null);
  
  const {reload,setReload}= props;

  //variables que Almacena los objetos con idFirebase y datos.
  let alarmsAll = [];
  //Trae de firebase todas las alarmas y la asigna al estado alarm
  useEffect(() => {
    (async () => {
      try {
        //Extraigo todas las alarmas.
        const getAlarm = await getDocs(
          query(collection(db, '/alarmas'), orderBy('fecha','desc'))
        );
        getAlarm.forEach((doc) => {
          alarmsAll.push({data:doc.data(),
            idDoc:doc.id
          });
          
        });
        setAlarm(alarmsAll);
        
      } catch (e) {
        console.log(e);
      }
    })();
    // eslint-disable-next-line
  }, [reload]);

  //registra lo que escribe en el buscador y lo asigna a busqueda.
  const handleInputChange = (e) => {
    let buscar = e.target.value;
    setBusqueda(buscar.toLocaleLowerCase().trim());
  };
  // Asigna al estado filtro las alarmas que coinciden con la busqueda.
  useEffect(() => {
    (async () => {
      setFiltro(await filtroBusqueda(alarm, busqueda));
    })();
  }, [busqueda,reload,alarm]);

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
            return (<ListAlarma key={alarma?.data?.id} alarma={alarma} setReload={setReload} reload={reload} />)
            
          }) : alarm.map((alarma) => {
            return <ListAlarma key={alarma?.data?.id} alarma={alarma} setReload={setReload} reload={reload} />
          }) }
      </div>
    </div>
  );
}

