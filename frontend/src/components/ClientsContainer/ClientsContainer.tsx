import React, { useEffect, useState } from 'react';
import { ClienteWithDetails, ClientesService, ApiError } from '../../codegen_output';
import ClientsCreateModal from './ClientsCreateModal';
import { ClientsList } from './ClientsList';
import { Col, Row } from 'react-bootstrap';
import { AddPersonalButton } from '../PersonalContainer/AddPersonalButton';
import Swal from 'sweetalert2';

export const handleApiError = (error: unknown) => {
  const err = error as ApiError;
  let errorMessage = 'An error occurred.';
  if (err.body && err.body.detail) {
    errorMessage = err.body.detail;
  }
  Swal.fire('Error', errorMessage, 'error');
};

export const ClientsContainer = () => {
  const [clientsList, setClientsList] = useState<ClienteWithDetails[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const clients = await ClientesService.handleReadClientesBackendApiV1ClientesGet();
      setClientsList(clients);
    } catch (error) {
      Swal.fire('Error', 'Falló al recuperar clientes.', 'error');
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await ClientesService.handleDeleteClienteBackendApiV1ClientesIdDelete(id);
      setClientsList(clients => clients.filter(client => client.id !== id));
      Swal.fire('Cliente Eliminado', '', 'success');
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleOpenCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    fetchClients();  // Refetch clients after modal closes
  };

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <ClientsList clientsList={clientsList} onDeleteClient={handleDelete} />
        </Col>
        <Col xs="auto" className='mt-3'>
          <AddPersonalButton onClick={handleOpenCreateModal} />
        </Col>
      </Row>
      
      <ClientsCreateModal
        show={showCreateModal}
        onHide={handleCloseCreateModal}
        onClientAdded={fetchClients} // Trigger fetch on new client addition
      />
      
    </div>
  );
};
