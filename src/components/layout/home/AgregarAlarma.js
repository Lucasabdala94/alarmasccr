import React,{useReducer} from 'react';
import { Button } from 'semantic-ui-react';
import ModalAgregarAlarma from "../../modal/ModalAgregarAlarma";

export default function AgregarAlarma(props) {

  /* Props para recargar el listado de alarmas una vez que se registro una nueva. */
  const {setReload,reload}=props;

  const [state, dispatch] = useReducer(AgregarAlarma, {
    open: false,
    dimmer: undefined,
  });
  
  
  /* funcion para manejar apertura y cierre del modal agregar alarma */
  function AgregarAlarma( time,action) {
    switch (action.type) {
      case 'OPEN_MODAL':
        return { open: true, dimmer: action.dimmer };
      case 'CLOSE_MODAL':
        return { open: false };
      default:
        throw new Error();
    }
  }

  return (
    <div>
      {/* BOTON PARA AGREGAR ALARAM */}
      <Button
        className="btn-primary"
        onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
      >
        Agregar
      </Button>
      {/* MODAL PARA AGREGAR ALARMA */}
      <ModalAgregarAlarma reload={reload} setReload={setReload} dispatch={dispatch} state={state}  />
    </div>
  );
}

