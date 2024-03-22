// AccionesPanel.tsx
import React, { useState } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import { handleApiError } from '../../ClientsContainer/ClientsContainer';
import ClientsCreate from '../../ClientsContainer/ClientsCreate';
import { ClienteCreate, ClientesService } from '../../../codegen_output';
import { PersonBadge, People, CashCoin } from 'react-bootstrap-icons';
import PanelCobro from './PanelCobro';
import Swal from 'sweetalert2';

const AccionesPanel = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [showPanelCobro, setShowPanelCobro] = useState(false);

  const handleNewClient = async (newClient: ClienteCreate, tarjetaId: number): Promise<void> => {
    try {
      const response = await ClientesService.handleCreateClienteWithTarjetaBackendApiV1ClientesPost(tarjetaId, { cliente_in: newClient });
      Swal.fire(`${newClient.nombre}`, 'ha sido guardado con éxito', 'success');      
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleClosePanelCobro = () => {
    setShowPanelCobro(false);
  };

  const handleAbrirPanelCobro = () => {
    setShowPanelCobro(true)
  }

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
                    onClick={handleAbrirPanelCobro}
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
                    <ClientsCreate onNewClient={handleNewClient} expanded={true}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

        <PanelCobro
            show={showPanelCobro}
            onHide={handleClosePanelCobro}
        />
    </Card>
  );
};

export default AccionesPanel;
