import React, { useEffect, useState } from 'react';
import { OrdenCompra, OrdenesService, ApiError, OrdenCompraDetallada } from '../../codegen_output';
import { OrdenesList } from './OrdenesList';
import Swal from 'sweetalert2';

export const OrdenesContainer = () => {
  const [ordenesList, setOrdenesList] = useState<OrdenCompraDetallada[]>([]);

  useEffect(() => {
    fetchOrden();
  }, []);

  const fetchOrden = () => {
    OrdenesService.handleReadOrdensBackendApiV1OrdenesGet()
      .then((ordenes) => {
        setOrdenesList(ordenes);        
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
  //     await OrdenesService.deleteOrdenBackendApiV1OrdenesIdDelete(id);
  //     setOrdenesList(clients => clients.filter(client => client.id !== id));
  //     Swal.fire('Success', 'Persona borrada exitosamente.', 'success');
  //   } catch (error) {
  //     handleApiError(error);
  //   }
  };

  return (
    <div>
      <OrdenesList ordenesList={ordenesList} onDeleteOrden={handleDelete} />
    </div>
  );
};
