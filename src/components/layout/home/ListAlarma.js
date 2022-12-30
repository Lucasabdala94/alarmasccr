import React,{ Fragment,useState } from "react";
import {Icon} from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "../../../context/authContext";
import ModalEliminarAlarma from "../../Admin/ModalEliminarAlarma";
import ModalEditarAlarmaAdmin from "../../Admin/ModalEditarAlarmaAdmin";
import { capitalizarPrimeraLetra } from "../../../helper/textTransform";
import { transformFecha } from "../../../helper/transforFecha";

export default function ListAlarma(props) {
  const { user } = useAuth();
  const { alarma,setReload,reload } = props;
  //Abre modal de eliminar alarma modo admin.
  const [borrar, setBorrar] = useState(false);
  //Abre modal de editar alarma modo admin.
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
            {alarma?.data?.creado}
        </p>
        <p className="containerAlarm-alarmaScada-historial">
          {capitalizarPrimeraLetra(transformFecha(alarma?.data?.fecha))}
        </p>
      </div>
      {alarma?.data?.descripcionAdmin &&
        (<Fragment><div>
          <div className="containerAlarm-descripcion">
            {alarma?.data?.descripcionAdmin}
          </div>
      </div>
      <div className="contenedor-footer-alarmAdmin">
        <p className="containerAlarm-alarmaScada-historial">
            {alarma?.data?.creadoAdmin}
        </p>
        <p className="containerAlarm-alarmaScada-historial">
          {capitalizarPrimeraLetra(transformFecha(alarma?.data?.fechaAdmin))}
        </p>
      </div>
      </Fragment>)}
      <ModalEliminarAlarma 
        onClose={() => setBorrar(false)}
        onOpen={() => setBorrar(true)}
        open={borrar}
        id={alarma?.idDoc}
        setReload={setReload}
        reload={reload}
      />
      <ModalEditarAlarmaAdmin
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