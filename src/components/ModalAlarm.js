import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import AlarmsForms from './AlarmsForms';

function exampleReducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { open: true, dimmer: action.dimmer };
    case 'CLOSE_MODAL':
      return { open: false };
    default:
      throw new Error();
  }
}

function ModalAlarm() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;

  return (
    <div>
      <Button
        className="btn"
        onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
      >
        Agregar
      </Button>

      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      >
        <Modal.Header>
          <div className="title-modal">
            <h1>Agregar alarma</h1>
            <Modal.Actions>
              <Button
                className="title-modal-salir"
                negative
                onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
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
    </div>
  );
}

export default ModalAlarm;
