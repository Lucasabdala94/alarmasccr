
import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import AlarmsForms from '../Form/AlarmsForms';


export default function ModalAgregarAlarma(props){
    const {setReload,reload,dispatch,state}=props;
    const { open, dimmer } = state;
    return(
        <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => {
          dispatch({ type: 'CLOSE_MODAL' })
          
        }}
        >
        <Modal.Header>
          <div className="title-modal">
            <h1>REGISTRO</h1>
            <Modal.Actions>
              <Button
                className="title-modal-salir"
                negative
                onClick={() =>{
                  dispatch({ type: 'CLOSE_MODAL' });
                  setReload(!reload);
                }}
              >
                X
              </Button>
            </Modal.Actions>
          </div>
        </Modal.Header>
        <Modal.Content>
          <AlarmsForms />
        </Modal.Content>
      </Modal>
    );
}