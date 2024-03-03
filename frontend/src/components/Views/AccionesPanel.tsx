// AccionesPanel.tsx
import React, { useState } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import { ClientsContainer } from '../ClientsContainer/ClientsContainer';
import { PersonBadge, People, CashCoin } from 'react-bootstrap-icons';

const AccionesPanel = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <Card>
        <Card.Header>Acciones</Card.Header>
        <Card.Body>
            <div className="accionable" >
                <Button 
                    variant="primary" 
                    className="me-2"
                    onClick={handleShow}
                >
                    <div className="accionable--contenido">
                        <PersonBadge className="icon"/>
                        <h3>Cliente Estandar</h3>
                    </div>
                </Button>
            </div>
            <div className="accionable" >
                <Button 
                    variant="primary" 
                    className="me-2"
                >
                    <div className="accionable--contenido">
                        <PersonBadge className="icon"/>
                        <h3>Cliente VIP</h3>
                    </div>
                </Button>
            </div>
            <div className="accionable" >
                <Button 
                    variant="primary" 
                    className="me-2"
                >
                    <div className="accionable--contenido">
                        <People className="icon"/>
                        <h3>Cliente Grupal</h3>
                    </div>
                </Button>
            </div>
            <div className="accionable" >
                <Button 
                    variant="success"
                    className='me-2'
                >
                    <div className="accionable--contenido">
                        <CashCoin className="icon"/>
                        <h3>Cobrar Tarjeta</h3>
                    </div>
                </Button>
            </div>
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
