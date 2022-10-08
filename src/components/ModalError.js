import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default function ModalError(props) {
  const { setExistente, existente } = props;
  return (
    <Modal
      onClose={() => setExistente(false)}
      onOpen={() => setExistente(true)}
      open={existente}
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
        <Button basic color="red" onClick={() => setExistente(false)}>
          <Icon name="remove" /> cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
