// AccionesPanel.tsx
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ClientsContainer } from '../ClientsContainer/ClientsContainer';

const AccionesPanel = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <h3>Actions</h3>
      <Button onClick={handleShow}>Nuevo Cliente Estandar</Button>
      <Button>Nuevo Cliente VIP</Button>
      <Button>Nuevo Cliente Grupal</Button>
      <Button>Consultar Consumos</Button>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Cliente Estandar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClientsContainer showClientList={false}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccionesPanel;
