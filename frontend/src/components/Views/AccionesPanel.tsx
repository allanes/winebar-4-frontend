// AccionesPanel.tsx
import React, { useState } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import { ClientsContainer } from '../ClientsContainer/ClientsContainer';

const AccionesPanel = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <Card>
        <Card.Header>Acciones</Card.Header>
        <Card.Body>
            <Button 
                variant="secondary" 
                className="me-2"
                onClick={handleShow}
            >
                Nuevo Cliente Estandar
            </Button>
            <Button 
                variant="secondary" 
                className="me-2"
            >
                Nuevo Cliente VIP
            </Button>
            <Button 
                variant="secondary" 
                className="me-2"
            >
                Nuevo Cliente Grupal
            </Button>
            <Button 
                variant="secondary"
            >
                Consultar Consumos
            </Button>
        </Card.Body>
    
        <div>
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
    </Card>
  );
};

export default AccionesPanel;
