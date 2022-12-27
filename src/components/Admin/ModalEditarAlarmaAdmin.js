import React from 'react';
import { Header, Modal } from 'semantic-ui-react';
import AlarmsFormsEditAdmin from '../Form/AlarmFormsEditAdmin';

export default function ModalEditarAlarmaAdmin(props) {

  const { onClose, onOpen, open, id,setReload,reload,data } = props;

  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      size="small"
      blurring="true"
    >
      <Header>
        <div className="title-modal">
          <h1>Agregar respuesta</h1>
        </div>
      </Header>
      <Modal.Content>
        <AlarmsFormsEditAdmin data={data} id={id} onClose={onClose} setReload={setReload} reload={reload}/>
      </Modal.Content>
    </Modal>
  );
}