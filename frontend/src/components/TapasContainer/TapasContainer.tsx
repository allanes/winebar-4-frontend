import React, { useEffect, useState } from 'react';
import { Tapa, TapasService, ApiError, TapaConProductoCreate } from '../../codegen_output';
// import { PersonalInterno, PersonalInternoService, PersonalInternoCreate, ApiError } from '../../codegen_output';
// import { PersonalesCreate } from './PersonalCreate';
import { TapasList } from './TapasList';
import Swal from 'sweetalert2';
// import { TapasCreate } from './TapasCreate';

export const TapasContainer = () => {
  const [tapasList, setTapasList] = useState<Tapa[]>([]);

  useEffect(() => {
    fetchTapa();
  }, []);

  const fetchTapa = () => {
    TapasService.handleReadTapasBackendApiV1TapasGet()
      .then((tapas) => {
        setTapasList(tapas);        
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

  const handleNewTapa = async (newTapaIn: TapaConProductoCreate): Promise<void> => {
    try {
      const response = await TapasService.handleCreateTapaWithTarjetaBackendApiV1TapasPost(newTapaIn);
      Swal.fire(`${response.producto.titulo}`, `tapa ID ${response.id} guardada.`, 'success');
      fetchTapa(); // Re-fetch the client list after a successful addition
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await TapasService.handleDeleteTapaBackendApiV1TapasIdDelete(id);
      setTapasList(clients => clients.filter(client => client.id !== id));
      Swal.fire('Success', 'Tapa borrada exitosamente.', 'success');
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div>
      {/* <TapasCreate onNewTapa={handleNewTapa} /> */}
      <TapasList tapasList={tapasList} onDeleteTapa={handleDelete} />
    </div>
  );
};
