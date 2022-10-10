import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default function Modalincompleto(props) {
  const { onClose, onOpen, open, values } = props;

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
        <h3>Todos los campos son obligatorios...</h3>
        <p>alarma={values.alarma}</p>
        <p>nivel de tension={values.nivelTension}</p>
        <p>et = {values.et}</p>
        <p>descripcion = {values.descripcion}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={onClose}>
          <Icon name="remove" /> cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
