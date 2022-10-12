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
      <Header>
        <Icon name="tasks" />
        Error al Cargar la Alarma
      </Header>
      <Modal.Content>
        <h3>Alarma existente en registro</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={onClose}>
          <Icon name="remove" /> cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
