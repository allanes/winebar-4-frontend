import React, { useEffect, useState } from 'react';
import { Cliente, ClientesService, ClienteCreate, ApiError, DetallesAdicionalesForUI } from '../../codegen_output';
import { ClientsCreate } from './ClientsCreate';
import { ClientsList } from './ClientsList';
import { Modal, Col, Row } from 'react-bootstrap';
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
  const [clientsList, setClientsList] = useState<Cliente[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    ClientesService.handleReadClientesBackendApiV1ClientesGet()
      .then((clients) => {
        setClientsList(clients);        
      })
      .catch(handleApiError);
  };

  const handleNewClient = async (newClient: ClienteCreate, tarjetaId: number, additionalDetails?: DetallesAdicionalesForUI): Promise<void> => {
    try {
      const response = await ClientesService.handleCreateClienteWithTarjetaBackendApiV1ClientesPost(tarjetaId, {
        cliente_in: newClient,
        detalle_adicional_in: additionalDetails,
      });
      Swal.fire(`${newClient.nombre}`, 'ha sido guardado con éxito', 'success');
      fetchClients(); // Re-fetch the client list after a successful addition
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await ClientesService.handleDeleteClienteBackendApiV1ClientesIdDelete(id);
      setClientsList(clients => clients.filter(client => client.id !== id));
      Swal.fire('Success', 'Client deleted successfully.', 'success');
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <ClientsList clientsList={clientsList} onDeleteClient={handleDelete} />
          {/* <TapasList 
            tapasList={tapasList} 
            onDeleteTapa={handleDelete} 
            onUpdateTapa={handleOpenUpdateModal}
          />           */}
        </Col>
        <Col xs="auto" className='mt-3'>
          <AddPersonalButton onClick={handleOpenCreateModal} />
        </Col>
      </Row>
      
      <Modal show={showCreateModal} onHide={handleCloseCreateModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClientsCreate onNewClient={handleNewClient} />
        </Modal.Body>
      </Modal>
      
    </div>
  );
};
