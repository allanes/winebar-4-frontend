// ClientsCreateModal.tsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import { ClientsCreate } from './ClientsCreate';
import { ClienteCreate, ConfiguracionCreate, DetallesAdicionalesForUI } from '../../codegen_output';

interface ClientsCreateModalProps {
  show: boolean;
  onHide: () => void;
  onNewClient: (
    newClient: ClienteCreate, 
    tarjetaId: number, 
    additionalDetails?: DetallesAdicionalesForUI,
    maxAmounts?: ConfiguracionCreate
    ) => Promise<void>;
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
      className="new-client-modal-content"
    >
      <Modal.Header closeButton className="new-client-modal-header">
        <Modal.Title id="contained-modal-title-vcenter" className="new-client-modal-title">
          Nuevo Cliente Estandar
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="new-client-modal-body">
        <ClientsCreate onNewClient={onNewClient} expanded={expanded} />
      </Modal.Body>
      <Modal.Footer className="new-client-modal-footer">
        {/* <Button variant="secondary" onClick={handleClose}>Cerrar</Button> */}
        {/* <Button className="new-client-modal-footer-btn" onClick={handleClose}>Dar de alta</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default ClientsCreateModal;
