import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { db } from './../firebase';
import { getDocs, collection,query,orderBy,where } from 'firebase/firestore';
import './alarms.css';

export default function Alarms() {
  const [alarm, setAlarm] = useState([]);
  const [busqueda, setBusqueda] = useState(null);
  const [filtro, setFiltro] = useState(null);
  let alarmsAll = [];
  useEffect(() => {
    (async () => {
      try {
        const getAlarm = await getDocs(query(collection(db, '/alarmas'), orderBy("fecha")));
        getAlarm.forEach((doc) => {
          alarmsAll.push(doc.data());
        });
        console.log(alarmsAll)
        setAlarm(alarmsAll);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
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
        {busqueda &&
          filtro.map((alarma) => {
            return (
              <div key={alarma.id} className="containerAlarm">
                <div className="containerAlarm-title">
                  <p className="contaienrAlarm-contenido">
                    <span> ET : </span> {alarma.et.toUpperCase()}
                  </p>
                  <p className="contaienrAlarm-contenido">
                    <span>Nivel : </span>
                    {alarma.nivelTension}
                  </p>
                </div>
                <div className="containerAlarm-descripcion">
                  <h4 className="containerAlarm-alarmaScada-title">
                    Señaliza:
                  </h4>
                  <p className="containerAlarm-alarmaScada">
                    {alarma.alarma.toUpperCase()}
                  </p>
                  <p className="containerAlarm-descripcion">
                    {alarma.descripcion}
                  </p>
                </div>
                <p>fecha:{fecha(alarma.fecha.seconds)}</p>
              </div>
            );
          })}
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

/*Calculo de fecha*/
function fecha(registro){
  const fecha= new Date(registro);
  
  const dia = fecha.getDate();
  const mes = fecha.getMonth();
  const anio = fecha.getFullYear();

  const calculoFecha = new Date(anio, mes, dia);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const fechaEntrega = calculoFecha.toLocaleDateString('es-ES', options);
  return fechaEntrega.toString();
}