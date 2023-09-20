import React from 'react'
import {Modal, Button, Image, Header} from "semantic-ui-react"
const ModalComp = ({open, setOpen, img, name, info, id, email, contact, handleDelete}) => {
  return (
    <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
        <Modal.Header>User Details</Modal.Header>
        <Modal.Content image>
            <Image size='medium' src={img} wrapped  />
            <Modal.Description>
                <Header>{name}</Header>
                <p>{info}</p>
                <p>{contact}</p>
                <p>{email}</p>
            </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>Cancel</Button>
                <Button color='red' icon='checkmark' content='delete' labelPosition='right' onClick={() => handleDelete(id)} />
            </Modal.Actions>

    </Modal>
    
      
   
  )
}

export default ModalComp
