import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import './modal.css';

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
      <Header className='Modal-header' >
        <p className='Modal-title'>Error al Cargar la Alarma</p>
        <div className='Content-Icon'><Icon name="tasks" /></div>
      </Header>
      <Modal.Content>
        <h3>Alarma existente en registro</h3>
        <p>Se encuentra registrada la misma alarma para esta estacion transformadora.</p>
      </Modal.Content>
      <Modal.Actions>
        <Button inverted color="red" className='Modal-header' onClick={onClose}>
          <Icon className='Content-Icon' name="remove" /> cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
