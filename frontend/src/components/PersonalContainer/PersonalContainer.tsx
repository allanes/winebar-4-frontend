import React, { useEffect, useState } from 'react';
import { PersonalInterno, PersonalInternoService, PersonalInternoCreate, ApiError } from '../../codegen_output';
import { PersonalesCreate } from './PersonalCreate';
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
    let errorMessage = 'Ocurrió un error.';
    if (err.body && err.body.detail) {
      errorMessage = err.body.detail;
    }
    Swal.fire('Error', errorMessage, 'error');
  };

  const handleNewPersonal = async (newPersonalIn: PersonalInternoCreate, tarjetaId: number): Promise<void> => {
    try {
      const personalInternoResponse = await PersonalInternoService.handleCreatePersonalInternoBackendApiV1PersonalPost(newPersonalIn);
      const personalInternoWithTarjetaResponse = await PersonalInternoService.handleEntregarTarjetaBackendApiV1PersonalEntregarTarjetaPost({ tarjeta_id: tarjetaId, personal_id: newPersonalIn.id });
      Swal.fire(`${newPersonalIn.nombre}`, 'ha sido guardado con éxito', 'success');
      fetchPersonalInterno(); // Re-fetch the client list after a successful addition
    } catch (error) {
      handleApiError(error);
    }
  };

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
      <PersonalesCreate onNewPersonal={handleNewPersonal} />
      <PersonalList personalList={personasInternasList} onDeletePersonal={handleDelete} />
    </div>
  );
};
