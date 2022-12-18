import React,{useReducer} from 'react';
import { Button, Modal } from 'semantic-ui-react';
import AlarmsForms from './Form/AlarmsForms';

export default function AgregarAlarma(props) {

  /* Props para recargar el listado de alarmas una vez que se registro una nueva. */
  const {setRelaod,reload}=props;

  const [state, dispatch] = useReducer(AgregarAlarma, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;
  
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
        className="btn"
        onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
      >
        Agregar
      </Button>
      {/* MODAL PARA AGREGAR ALARMA */}
      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => {
          dispatch({ type: 'CLOSE_MODAL' })
          
        }}
      >
        <Modal.Header>
          <div className="title-modal">
            <h1>REGISTRO</h1>
            <Modal.Actions>
              <Button
                className="title-modal-salir"
                negative
                onClick={() =>{
                  dispatch({ type: 'CLOSE_MODAL' });
                  setRelaod(!reload);
                }}
              >
                X
              </Button>
            </Modal.Actions>
          </div>
        </Modal.Header>
        <Modal.Content>
          <AlarmsForms />
        </Modal.Content>
      </Modal>
    </div>
  );
}

