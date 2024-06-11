import React, { useEffect, useState } from 'react';
import { ConfiguracionCreate, ClientesService, ClienteCreate, ClienteWithDetails, ApiError, DetallesAdicionalesForUI } from '../../codegen_output';
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

  const fetchClients = () => {
    ClientesService.handleReadClientesBackendApiV1ClientesGet()
      .then((clients) => {
        setClientsList(clients);        
      })
      .catch(handleApiError);
  };

  const handleNewClient = async (
    newClient: ClienteCreate, 
    tarjetaId: number, 
    additionalDetails?: DetallesAdicionalesForUI,
    maxAmounts?: ConfiguracionCreate
  ): Promise<void> => {
    try {
      const response = await ClientesService.handleCreateClienteWithTarjetaBackendApiV1ClientesPost(tarjetaId, {
        cliente_in: newClient,
        detalle_adicional_in: additionalDetails,
        montos_config_in: maxAmounts,
      });
      Swal.fire(`${newClient.nombre}`, 'ha sido guardado con éxito', 'success');
      handleCloseCreateModal();
      fetchClients(); // Re-fetch the client list after a successful addition
    } catch (error) {
      handleApiError(error);
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
      
      <ClientsCreateModal
        show={showCreateModal}
        onHide={handleCloseCreateModal}
        onNewClient={handleNewClient}
      />
      
    </div>
  );
};
