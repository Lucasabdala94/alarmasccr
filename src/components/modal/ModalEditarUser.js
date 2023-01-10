import AlarmsFormsEdit from "../Form/AlarmsFormsEdit";
import {Header,Modal} from "semantic-ui-react";

export default function ModalEditarUser(props) {

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
            <h1>Editar Alarma</h1>
          </div>
        </Header>
        <Modal.Content>
          <AlarmsFormsEdit data={data} id={id} onClose={onClose} setReload={setReload} reload={reload} />
        </Modal.Content>
      </Modal>
    );
  }