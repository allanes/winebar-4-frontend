// ClientsCreateModal.tsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import { ClientesService, ClienteCreate, ConfiguracionCreate, DetallesAdicionalesForUI } from '../../codegen_output';
import ClientsCreate from './ClientsCreate';
import Swal from 'sweetalert2';

interface ClientsCreateModalProps {
  show: boolean;
  onHide: () => void;
  onClientAdded: () => void;  // This prop triggers a refresh in the parent.
  expanded?: boolean;
}

const ClientsCreateModal: React.FC<ClientsCreateModalProps> = ({ show, onHide, onClientAdded, expanded = false }) => {
  const handleNewClient = async (
    newClient: ClienteCreate, 
    tarjetaId: number, 
    additionalDetails?: DetallesAdicionalesForUI,
    maxAmounts?: ConfiguracionCreate
  ) => {
    try {
      await ClientesService.handleCreateClienteWithTarjetaBackendApiV1ClientesPost(tarjetaId, {
        cliente_in: newClient,
        detalle_adicional_in: additionalDetails,
        montos_config_in: maxAmounts,
      });
      Swal.fire(`${newClient.nombre}`, 'ha sido guardado con éxito', 'success');
      onHide();  // Close modal after successful client creation
      onClientAdded();  // Notify parent component to refresh data
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar el cliente.', 'error');
    }
  };

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
        <ClientsCreate onNewClient={handleNewClient} expanded={expanded} />
      </Modal.Body>
      <Modal.Footer className="new-client-modal-footer">
      </Modal.Footer>
    </Modal>
  );
};

export default ClientsCreateModal;
