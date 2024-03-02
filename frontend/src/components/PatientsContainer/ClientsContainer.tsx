import React, { useEffect, useState } from 'react'
import { Cliente, ClientesService, ApiError, CancelablePromise } from '../../codegen_output'
import { ClientsCreate } from './ClientsCreate'
import { PatientsList } from './ClientsList'
import Swal from 'sweetalert2'

interface ClientsState {
  clients: Array<Cliente>
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

  const handleNewClient = async (newClient: Cliente): CancelablePromise<void> => {
    try {
      await ClientesService.handleCreateClienteWithTarjetaBackendApiV1ClientesPost(123, newClient)
      Swal.fire(
        `${newClient.nombre}`,
        'ha sido guardado con éxito',
        'success'
      )
      setClientsList( client => [...clientsList, newClient])
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
      <ClientsCreate onNewClient={handleNewClient} />
      <PatientsList clientsList={clientsList} onDeleteClient={handleDelete} />
    </div>
  )
}
