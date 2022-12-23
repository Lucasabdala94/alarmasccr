import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default function ModalError(props) {
  const { onClose, onOpen, open } = props;

  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      size="small"
      blurring="true"
    >
      <Header className='Modal-header'>
        <div className='Content-Icon'><Icon name="check square outline" color="green" /></div>
        <p className='Modal-title'>Alarma registrada correctamente</p>
      </Header>
      <Modal.Actions className='Modal-header'>
        <Button inverted  className='Modal-header' color="green" onClick={onClose}>
          <div className='Modal-title'><Icon name="check circle outline" /></div>
          <p className='Content-Icon'>Volver</p>
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
