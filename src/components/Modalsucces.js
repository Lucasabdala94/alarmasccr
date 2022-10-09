import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default function ModalError(props) {
  const { onClose, onOpen, open } = props;

  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={registrada}
      size="small"
      blurring="true"
    >
      <Header>
        <Icon name="check square outline" color="green" />
        Alarma registrada correctamente
      </Header>
      <Modal.Actions>
        <Button basic color="green" onClick={onClose}>
          <Icon name="check circle outline" /> Volver
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
