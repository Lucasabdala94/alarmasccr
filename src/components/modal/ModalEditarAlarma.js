import React from 'react';
import { Header, Modal } from 'semantic-ui-react';
import AlarmsFormsEdit from '../Form/AlarmsFormsEdit';



export default function ModalEditarAlarma(props) {

  const { onClose, onOpen, open, id,setReload,reload,data } = props;


  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      size="mini"
      blurring="true"
      centered
    >
      <Header>
        <div className="title-modal">
          <h1>Editar Alarma</h1>
        </div>
      </Header>
      <Modal.Content>
        <AlarmsFormsEdit data={data} id={id} onClose={onClose} setReload={setReload} reload={reload}/>
      </Modal.Content>
    </Modal>

  );
}