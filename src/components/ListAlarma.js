import React,{ Fragment,useState } from "react";
import {Icon} from 'semantic-ui-react';
import { useAuth } from "../context/authContext";
import ModalEliminarAlarma from "./modal/ModalEliminarAlarma";
import ModalEditarAlarma from "./modal/ModalEditarAlarma";
import { v4 as uuidv4 } from 'uuid';

export default function ListAlarma(props) {
  const { user } = useAuth();
  const { alarma,setReload,reload } = props;
  const [borrar, setBorrar] = useState(false);
  const [editar, setEditar] = useState(false);
  return (
    <div key={alarma?.data?.id} className="containerAlarm">
      <div className="containerAlarm-title">
        <div className="contaienrAlarm-contenido">
          <span> ET : </span> {alarma.data.et.toUpperCase()}
        </div>
        <div className="contaienrAlarm-contenido">
          <span>Nivel : </span>
          {alarma?.data?.nivelTension}
        </div>
        {user?.email=== "administrador@gmail.com" && 
          (<Fragment>
          <div className="option-admin" >
            <button id={alarma?.idDoc} key={uuidv4()} onClick={(e)=>setEditar(true)} className="btn-Eliminar"><Icon className="icon" name="edit" /></button>
            <button id={alarma?.idDoc} key={uuidv4()} onClick={(e)=>setBorrar(true)} className="btn-Eliminar"><Icon name="trash alternate" /></button>
          </div>
          </Fragment>)
        }
        
      </div>
      <div className="containerAlarm-descripcion">
        <div className="containerAlarm-alarmaScada">
          {alarma?.data?.alarma.toUpperCase()}
        </div>
        <div>
          <div className="containerAlarm-descripcion">
            {alarma.data.descripcion}
          </div>
        </div>
      </div>
      <br></br>
      <div className="contenedor-footer-alarm">
        <p className="containerAlarm-alarmaScada-historial">
            {alarma.data.creado}
        </p>
        <p className="containerAlarm-alarmaScada-historial">
          {capitalizarPrimeraLetra(fecha(alarma.data.fecha))}
        </p>
      </div>
      <ModalEliminarAlarma 
        onClose={() => setBorrar(false)}
        onOpen={() => setBorrar(true)}
        open={borrar}
        id={alarma?.idDoc}
        setReload={setReload}
        reload={reload}
      />
      <ModalEditarAlarma
      onClose={() => setEditar(false)}
      onOpen={() => setEditar(true)}
      open={editar}
      id={alarma?.idDoc}
      setReload={setReload}
      reload={reload}
      data={alarma?.data}
      />
    </div>
  );
}

/*capitalizar primera letra */
function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/*Calculo de fecha*/
function fecha(registro) {
  const calculoFecha = new Date(registro.toDate());

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const fechaEntrega = calculoFecha.toLocaleDateString('es-ES', options);
  return fechaEntrega.toString();
}
