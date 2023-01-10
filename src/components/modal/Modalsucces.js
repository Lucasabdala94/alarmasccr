import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default function ModalError(props) {
  const { onClose, onOpen, open } = props;

  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      size="mini"
      blurring="true"
      centered

    >

      <Header className='Modal-header'>
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
