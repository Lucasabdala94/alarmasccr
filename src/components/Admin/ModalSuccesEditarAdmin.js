import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default function ModalSuccesEditarAdmin(props) {
  const { onClose, onOpen, open,cerrarModalAnterior } = props;

  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      size="mini"
      blurring="true"
    >

      <Header className='Modal-header'>
        <p className='Modal-title'>Respuesta agregada correctamente</p>
      </Header>
      <Modal.Actions className='Modal-header'>
        <Button inverted  className='Modal-header' color="green" onClick={()=>{onClose(true)
        cerrarModalAnterior(true)}
        }>
          <div className='Modal-title'><Icon name="check circle outline" /></div>
          <p className='Content-Icon'>Volver</p>
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
