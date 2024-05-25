import React, { useEffect, useState } from 'react';
import { OrdenCompra, OrdenesService, ApiError, OrdenCompraDetallada } from '../../codegen_output';
import { OrdenesList } from './OrdenesListCard';
import Swal from 'sweetalert2';

export const OrdenesContainer = () => {
  const [ordenesList, setOrdenesList] = useState<OrdenCompraDetallada[]>([]);
  const [paraTurnoAbierto, setParaTurnoAbierto] = useState(true);

  useEffect(() => {
    fetchOrdenes();
  }, [paraTurnoAbierto]);

  const fetchOrdenes = () => {
    OrdenesService.handleReadOrdensBackendApiV1OrdenesGet(paraTurnoAbierto)
      .then((ordenes) => {
        setOrdenesList(ordenes);        
      })
      .catch(handleApiError);
  };

  const handleOrdenesGetToggle = (checked: boolean) => {
    setParaTurnoAbierto(checked);
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
  //     await OrdenesService.deleteOrdenBackendApiV1OrdenesIdDelete(id);
  //     setOrdenesList(clients => clients.filter(client => client.id !== id));
  //     Swal.fire('Success', 'Persona borrada exitosamente.', 'success');
  //   } catch (error) {
  //     handleApiError(error);
  //   }
  };

  return (
    <div>
      <OrdenesList 
        ordenesList={ordenesList} 
        onDeleteOrden={handleDelete}
        onChangeOrdenesGetToggle={handleOrdenesGetToggle}
      />
    </div>
  );
};
