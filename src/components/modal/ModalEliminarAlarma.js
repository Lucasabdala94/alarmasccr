import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import BotonEliminar from '../Admin/BotonEliminar';


export default function ModalEliminarAlarma(props) {

  const { onClose, onOpen, open, id } = props;

  //Funcion para eliminar una alarma con el id de firebase.
  async function eliminar(id) {
    await BotonEliminar(id);
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
          <h1>Eliminar Alarma</h1>
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
          <Icon name="ban" /> Eliminar Permanentemente
        </Button>
        </div>
        
      </Modal.Actions>
    </Modal>

  );
}

