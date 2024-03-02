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
          // Assuming that ClienteCreate is similar to Cliente but with additional properties like 'contraseña'
          // and that 'contraseña' is not a property of Cliente, we need a different approach.
          // This example assumes there's a way to safely cast or transform Cliente to ClienteCreate.
          // This might involve a function or additional logic to ensure 'contraseña' is appropriately handled.
          let clienteCreate: ClienteCreate;
          if ('contraseña' in newClient) {
              clienteCreate = newClient as ClienteCreate;
          } else {
              // Handle the case where 'contraseña' is not part of newClient, e.g., by providing a default value or fetching it from elsewhere.
              clienteCreate = {
                  ...newClient,
                  contraseña: 'defaultPassword' // Provide a default or fetch the actual value as needed.
              };
          }
          handleNewClient(clienteCreate, 123);
      }} />
      <PatientsList clientsList={clientsList} onDeleteClient={handleDelete} />
    </div>
  )
}
