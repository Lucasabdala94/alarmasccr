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
<<<<<<< HEAD
      <Header className='Modal-header'>
        <div className='Content-Icon'><Icon name="check square outline" color="green" /></div>
        <p className='Modal-title'>Alarma registrada correctamente</p>
      </Header>
      <Modal.Actions className='Modal-header'>
        <Button inverted  className='Modal-header' color="green" onClick={onClose}>
          <div className='Modal-title'><Icon name="check circle outline" /></div>
          <p className='Content-Icon'>Volver</p>
=======
      <Header className="header-succes">
        <h4 className='title-succes'>Alarma registrada correctamente</h4>
        <Icon name="check square outline" color="green" />
      </Header>
      <Modal.Actions className='content-succes'>
        <Button className='button-succes' basic color="green" onClick={onClose}>
          <Icon className='content-button-succes' name="check circle outline" /> Volver
>>>>>>> 92b5ffff67973c976061568db4e4457d56fa73a4
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
