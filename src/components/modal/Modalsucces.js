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
      <Header className="header-succes">
        <h4 className='title-succes'>Alarma registrada correctamente</h4>
        <Icon name="check square outline" color="green" />
      </Header>
      <Modal.Actions className='content-succes'>
        <Button className='button-succes' basic color="green" onClick={onClose}>
          <Icon className='content-button-succes' name="check circle outline" /> Volver
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
