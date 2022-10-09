import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default function Mosalincompleto(props) {
  const { onClose, onOpen, open, values } = props;

  const {} = values;
  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={open}
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
