import React, { useEffect, useState } from 'react';
import { Tarjeta, TarjetasService, ApiError, TarjetaCreate } from '../../codegen_output';
// import { PersonalInterno, PersonalInternoService, PersonalInternoCreate, ApiError } from '../../codegen_output';
// import { PersonalesCreate } from './PersonalCreate';
import { TarjetasList } from './TarjetasList';
import Swal from 'sweetalert2';

export const TarjetasContainer = () => {
  const [tarjetasList, setTarjetasList] = useState<Tarjeta[]>([]);

  useEffect(() => {
    fetchTarjeta();
  }, []);

  const fetchTarjeta = () => {
    TarjetasService.readTarjetasBackendApiV1TarjetasGet()
      .then((tarjetas) => {
        setTarjetasList(tarjetas);        
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

  const handleNewTarjeta = async (newTarjetaIn: TarjetaCreate): Promise<void> => {
    try {
      const response = await TarjetasService.createTarjetaBackendApiV1TarjetasPost(newTarjetaIn);
      Swal.fire(`${response.rol.nombre_largo}`, `tarjeta ID ${response.id} guardada.`, 'success');
      fetchTarjeta(); // Re-fetch the client list after a successful addition
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await TarjetasService.deleteTarjetaBackendApiV1TarjetasIdDelete(id);
      setTarjetasList(clients => clients.filter(client => client.id !== id));
      Swal.fire('Success', 'Persona borrada exitosamente.', 'success');
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div>
      {/* <PersonalesCreate onNewPersonal={handleNewTarjeta} /> */}
      <TarjetasList tarjetasList={tarjetasList} onDeleteTarjeta={handleDelete} />
    </div>
  );
};
