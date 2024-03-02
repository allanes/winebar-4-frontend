import React, { useEffect, useState } from 'react';
// import { Cliente, ClientesService, PersonalInternoCreate, ApiError } from '../../codegen_output';
import { PersonalInterno, PersonalInternoService, ApiError } from '../../codegen_output';
// import { ClientsCreate } from './ClientsCreate';
import { PersonalList } from './PersonalList';
import Swal from 'sweetalert2';

export const PersonalInternoContainer = () => {
  const [personasInternasList, setPersonasInternasList] = useState<PersonalInterno[]>([]);

  useEffect(() => {
    fetchPersonalInterno();
  }, []);

  const fetchPersonalInterno = () => {
    PersonalInternoService.handleReadPersonalInternosBackendApiV1PersonalGet()
      .then((usuarios) => {
        setPersonasInternasList(usuarios);        
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

  // const handleNewPersonal = async (newClient: PersonalInternoCreate, tarjetaId: number): Promise<void> => {
  //   try {
  //     const response = await ClientesService.handleCreateClienteWithTarjetaBackendApiV1ClientesPost(tarjetaId, { cliente_in: newClient });
  //     Swal.fire(`${newClient.nombre}`, 'ha sido guardado con éxito', 'success');
  //     fetchPersonalInterno(); // Re-fetch the client list after a successful addition
  //   } catch (error) {
  //     handleApiError(error);
  //   }
  // };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await PersonalInternoService.handleDeletePersonalInternoBackendApiV1PersonalIdDelete(id);
      setPersonasInternasList(clients => clients.filter(client => client.id !== id));
      Swal.fire('Success', 'Persona borrada exitosamente.', 'success');
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div>
      {/* <ClientsCreate onNewClient={handleNewPersonal} /> */}
      <PersonalList personalList={personasInternasList} onDeletePersonal={handleDelete} />
    </div>
  );
};
