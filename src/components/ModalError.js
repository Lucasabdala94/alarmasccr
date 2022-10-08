import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default function ModalError(props) {
    const {mostrar}=props
    const [open, setOpen] = React.useState(mostrar)

    return (
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(mostrar)}
        open={open}
        size='small'
      >
        <Header icon>
          <Icon name='archive' />
          Archive Old Messages
        </Header>
        <Modal.Content>
          <p>
            Your inbox is getting full, would you like us to enable automatic
            archiving of old messages?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={() => setOpen(false)}>
            <Icon name='remove' /> volver
          </Button>
        </Modal.Actions>
      </Modal>
    )
}
