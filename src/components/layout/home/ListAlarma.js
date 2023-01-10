import React,{ Fragment,useState } from "react";
import {Icon} from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "../../../context/authContext";
import ModalEliminarAlarma from "../../Admin/ModalEliminarAlarma";
import ModalEditarAlarmaAdmin from "../../Admin/ModalEditarAlarmaAdmin";
import { capitalizarPrimeraLetra } from "../../../helper/textTransform";
import { transformFecha } from "../../../helper/transforFecha";
import ModalEditarUser from "../../modal/ModalEditarUser";

export default function ListAlarma(props) {
  const { user } = useAuth();
  const { alarma,setReload,reload,imprimir} = props;
  //Abre modal de eliminar alarma modo admin.
  const [borrar, setBorrar] = useState(false);
  //Abre modal de editar alarma modo admin.
  const [editar, setEditar] = useState(false);
  //Abre modal editar alarma usuario y admin.
  const [editarUser,setEditarUser]=useState(false);

  //comprueba si la alarma es el propietario y no paso mas de un dia.
  const fecharegistro = new Date(alarma?.data?.fecha.toDate());
  const fechaLimit = new Date();
  fechaLimit.setTime(fecharegistro.getTime());
  const diaMiliseconds = 60 * 60 * 1000*24;
  fechaLimit.setTime(fechaLimit.getTime() + diaMiliseconds);
  const fechaActual=new Date();

  let editable;
  if(user?.email=== alarma?.data?.creado){
    if(fechaActual< fechaLimit){

      editable=true;
    }else{
      editable=false;
    }
  }else{
    editable=false;
  }
//=========================================================

  return (
    <thead key={alarma?.data?.id} className="containerAlarm"  style={imprimir ? {boxShadow:"none"} : null} >
      <tr className="containerAlarm-tr">
      
      <td className="containerAlarm-td" >
        <div className="containerAlarm-alarmaScada">
          {alarma?.data?.alarma.toUpperCase()}
        </div>
      </td>
      <td className="containerAlarm-td" >
        <div className="contaienrAlarm-contenido-title">
          {alarma.data.et.toUpperCase()}
        </div>
        <div className="contaienrAlarm-contenido-title">
          {alarma?.data?.nivelTension}
        </div>
        {(user?.email=== "administrador@gmail.com" ) &&
          (<Fragment>
          <div className="option-admin" key={uuidv4()} style={imprimir ? {display: "none"} : null} >
            <button id={alarma?.idDoc} key={uuidv4()} onClick={(e)=>setEditar(true)} className="btn-Eliminar"><Icon className="icon" name="plus" /></button>
            <button id={alarma?.idDoc} key={uuidv4()} onClick={(e)=>setBorrar(true)} className="btn-Eliminar"><Icon name="trash alternate" /></button>
          </div>
          </Fragment>)
        }
        {(editable===true ) &&
          (<Fragment>
          <div className="option-admin" key={uuidv4()} style={imprimir ? {display: "none"} : null} >
            <button id={alarma?.idDoc} key={uuidv4()} onClick={(e)=>setEditarUser(true)} className="btn-Eliminar"><Icon className="icon" name="edit outline" /></button>
            {user?.email!== "administrador@gmail.com" &&
              <button id={alarma?.idDoc} key={uuidv4()} onClick={(e)=>setBorrar(true)} className="btn-Eliminar"><Icon name="trash alternate" /></button>
            }
            
          </div>
          </Fragment>)
        }
        
      </td>
      <td className="containerAlarm-td" >
        <p className="containerAlarm-descripcion">
          {alarma.data.descripcion}
        </p>
      </td>
      
      <td className="contenedor-footer-alarm">
        <p className="containerAlarm-alarmaScada-historial" style={imprimir ? {display: "none"} : null}>
            {alarma?.data?.creado}
        </p>
        <p className="containerAlarm-alarmaScada-historial">
          {capitalizarPrimeraLetra(transformFecha(alarma?.data?.fecha))}
        </p>
      </td>
        {alarma?.data?.descripcionAdmin &&
          (<Fragment>
            <td className="containerAlarm-td" >
              <p className="containerAlarm-descripcion descriptionAdmin">
                {alarma.data.descripcionAdmin}
              </p>
            </td>
            <td className="contenedor-footer-alarm">
              <p className="containerAlarm-alarmaScada-historial">
                  {alarma?.data?.creadoAdmin}
              </p>
              <p className="containerAlarm-alarmaScada-historial">
                {capitalizarPrimeraLetra(transformFecha(alarma?.data?.fechaAdmin))}
              </p>
            </td>
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
      <ModalEditarUser
        onClose={() => setEditarUser(false)}
        onOpen={() => setEditarUser(true)}
        open={editarUser}
        id={alarma?.idDoc}
        setReload={setReload}
        reload={reload}
        data={alarma?.data}
      />
      </tr>
    </thead>
  );
}