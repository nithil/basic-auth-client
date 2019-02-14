import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const modal = props => (
  <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter the name of a role'
          value={props.name}
          onChange={props.updateName}
        />
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant='secondary' onClick={props.handleClose} disabled={props.disabled}>
        Close
      </Button>
      <Button variant='primary' onClick={props.submit} disabled={props.disabled}>
        {props.primaryButtonName || 'Save Changes'}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default modal;
