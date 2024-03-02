import React, { useEffect, useState } from 'react';
import { Turno, TurnosService, ApiError } from '../../codegen_output';
import { TurnosList } from './TurnosList';
import Swal from 'sweetalert2';

export const TurnosContainer = () => {
  const [turnosList, setTurnosList] = useState<Turno[]>([]);

  useEffect(() => {
    fetchTurno();
  }, []);

  const fetchTurno = () => {
    TurnosService.handleReadTurnosBackendApiV1TurnosGet()
      .then((turnos) => {
        setTurnosList(turnos);        
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

  const handleDelete = async (id: number): Promise<void> => {
  //   try {
  //     await TurnosService.deleteTurnoBackendApiV1TurnosIdDelete(id);
  //     setTurnosList(clients => clients.filter(client => client.id !== id));
  //     Swal.fire('Success', 'Persona borrada exitosamente.', 'success');
  //   } catch (error) {
  //     handleApiError(error);
  //   }
  };

  return (
    <div>
      <TurnosList turnosList={turnosList} onDeleteTurno={handleDelete} />
    </div>
  );
};
