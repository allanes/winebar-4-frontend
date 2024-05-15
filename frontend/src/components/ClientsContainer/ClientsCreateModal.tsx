// ClientsCreateModal.tsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import { ClientsCreate } from './ClientsCreate';
import { ClienteCreate, DetallesAdicionalesForUI } from '../../codegen_output';
import Swal from 'sweetalert2';

interface ClientsCreateModalProps {
  show: boolean;
  onHide: () => void;
  onNewClient: (newClient: ClienteCreate, tarjetaId: number, additionalDetails?: DetallesAdicionalesForUI) => Promise<void>;
  expanded?: boolean;
}

const ClientsCreateModal: React.FC<ClientsCreateModalProps> = ({ show, onHide, onNewClient, expanded = false }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            // className="new-client-modal-content"  // Changed to apply modal content styles
        >
            <Modal.Header closeButton className="new-client-modal-header">
                <Modal.Title id="contained-modal-title-vcenter" className="new-client-modal-title">
                    Nuevo Cliente Estandar
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="new-client-modal-body">
                <ClientsCreate onNewClient={onNewClient} expanded={expanded}/>
            </Modal.Body>
            <Modal.Footer className="new-client-modal-footer">
                {/* <Button variant="secondary" onClick={handleClose}>Cerrar</Button> */}
                {/* <Button className="new-client-modal-footer-btn" onClick={handleClose}>Dar de alta</Button> Corrected to apply button styles */}
            </Modal.Footer>
            {/* <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Agregar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ClientsCreate onNewClient={onNewClient} />
            </Modal.Body>
            </Modal> */}
        </Modal>
    ); 

};

export default ClientsCreateModal;
