import React, { useEffect, useState } from 'react'
import { Cliente, ClientesService, ClienteCreate, ApiError, CancelablePromise } from '../../codegen_output'
import { ClientsCreate } from './ClientsCreate'
import { PatientsList } from './ClientsList'
import Swal from 'sweetalert2'

interface ClientsState {
  clients: Array<Cliente>
  clientsCreate: Array<ClienteCreate>
}

export const ClientsContainer = () => {

  const [clientsList, setClientsList] = useState<ClientsState["clients"]>([])

  useEffect(() => {
    ClientesService.handleReadClientesBackendApiV1ClientesGet()
    .then(clients => {
      console.log(clients);
      setClientsList(clients)
    })
  }, [])

  const handleNewClient = async (newClient: ClienteCreate, tarjetaId: number): Promise<void> => {
    try {
      await ClientesService.handleCreateClienteWithTarjetaBackendApiV1ClientesPost(tarjetaId, {cliente_in: newClient})
      Swal.fire(
        `${newClient.nombre}`,
        'ha sido guardado con éxito',
        'success'
      )
      ClientesService.handleReadClientesBackendApiV1ClientesGet()
      .then(clients => {
        setClientsList(clients)
      })
    }
    catch (error) {
      const err = error as ApiError; // or a custom error type if you know the structure
      let errorMessage = 'An error occurred.'; // Start with the message property.

      if (err.body && err.body.detail) {
        // If the body property has a message property, add it to the error message.
        errorMessage = err.body.detail;
      }
      Swal.fire('Error', errorMessage, 'error');
    }
  }

  const handleDelete = (id: number): void => {
    ClientesService.handleDeleteClienteBackendApiV1ClientesIdDelete(id)
    setClientsList(clientsList.filter((client) => client.id !== id));
  }

  return (
    <div>
      <ClientsCreate onNewClient={(newClient) => {
          const clienteCreate: ClienteCreate = {
              ...newClient,
              contraseña: newClient.contraseña || 'defaultPassword' // Assuming 'contraseña' is the missing field and providing a default or derived value
          };
          handleNewClient(clienteCreate, 123);
      }} />
      <PatientsList clientsList={clientsList} onDeleteClient={handleDelete} />
    </div>
  )
}
