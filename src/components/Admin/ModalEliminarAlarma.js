import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import BotonEliminar from './BotonEliminar';


export default function ModalEliminarAlarma(props) {

  const { onClose, onOpen, open, id,setReload,reload } = props;

  //Funcion para eliminar una alarma con el id de firebase.
  async function eliminar(id) {
    await BotonEliminar(id);
    setReload(!reload);
    onClose();
  }

  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      size="small"
      blurring="true"
    >
      <Header>
        <div className="title-modal">
          <h1>Eliminar Permanentemente</h1>
        </div>
      </Header>
      <Modal.Actions>
        <div className='contenedor-botones-center'>
        <Button inverted color="blue" onClick={onClose}>
          Cancelar
        </Button>
        <Button inverted color="red" onClick={() => {
          eliminar(id);
          onClose(true);
        }}>
         Eliminar
        </Button>
        </div>
        
      </Modal.Actions>
    </Modal>

  );
}

