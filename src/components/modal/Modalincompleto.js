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
      <Header className='Modal-header'>
        <p className='Modal-title'>Error al Cargar la Alarma</p>
        <div className='Content-Icon'><Icon name="tasks" /></div>
      </Header>
      <Modal.Content>
        <h3>Todos los campos son obligatorios...</h3>
        <p>
          Alarma SCADA : <span>{values.alarma}</span>
        </p>
        <p>
          Nivel de Tension : <span>{values.nivelTension}</span>
        </p>
        <p>
          Estacion Transformadora : <span>{values.et}</span>
        </p>
        <p>
          Descripcion del evento: <span>{values.descripcion}</span>
        </p>
      </Modal.Content>
      <Modal.Actions >
        <Button inverted color="red" className='Modal-header' onClick={onClose}>
          <Icon className='Content-Icon' name="remove" /> cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
