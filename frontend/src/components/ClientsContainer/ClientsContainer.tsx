import React, { useEffect, useState } from 'react';
import { Cliente, ClientesService, ClienteCreate, ApiError } from '../../codegen_output';
import { ClientsCreate } from './ClientsCreate';
import { ClientsList } from './ClientsList';
import Swal from 'sweetalert2';

interface ClientsContainerProps {
  showClientList?: boolean;
}

export const ClientsContainer = ({ showClientList = true }: ClientsContainerProps) => {
  const [clientsList, setClientsList] = useState<Cliente[]>([]);

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

  const handleApiError = (error: unknown) => {
    const err = error as ApiError;
    let errorMessage = 'An error occurred.';
    if (err.body && err.body.detail) {
      errorMessage = err.body.detail;
    }
    Swal.fire('Error', errorMessage, 'error');
  };

  const handleNewClient = async (newClient: ClienteCreate, tarjetaId: number): Promise<void> => {
    try {
      const response = await ClientesService.handleCreateClienteWithTarjetaBackendApiV1ClientesPost(tarjetaId, { cliente_in: newClient });
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

  return (
    <div>
      <ClientsCreate onNewClient={handleNewClient} />
      {showClientList && <ClientsList clientsList={clientsList} onDeleteClient={handleDelete} />}
    </div>
  );
};
