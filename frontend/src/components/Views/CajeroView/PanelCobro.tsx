import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { OrdenCompra, OrdenesService, OrdenCompraDetallada } from '../../../codegen_output';
import CardReaderInput from '../../ClientsContainer/CardReaderInput';
import OrdenView from '../../OrdenesContainer/OrdenView';
import { handleApiError } from '../../ClientsContainer/ClientsContainer';
import Swal from 'sweetalert2';

interface PanelCobroProps {
  show: boolean;
  onHide: () => void;
}

const PanelCobro: React.FC<PanelCobroProps> = ({ show, onHide }) => {
  const [tarjetaIdCliente, setTarjetaIdCliente] = useState('');
  const [ordenData, setOrdenData] = useState<OrdenCompraDetallada | null>(null);
  const [ordenCobrada, setOrdenCobrada] = useState<OrdenCompra | null>(null);

  const handleCardReadWrapper = async (tarjetaId: string) => {
    try {
      const response = await OrdenesService.handleReadOrdenByClientRfidBackendApiV1OrdenesByRfidTarjetaIdGet(Number(tarjetaId));
      setOrdenData(response);
      setTarjetaIdCliente(tarjetaId);
    } catch (error) {
      console.error('Error reading card:', error);
      handleApiError(error);
    }
  };

  const handleClose = () => {
    setOrdenData(null);
    setTarjetaIdCliente('');
    onHide();
  };

  const handleCobrar = async () => {
    if (ordenData) {
      OrdenesService.handleCerrarOrdenBackendApiV1OrdenesCerrarPost(
        ordenData.id
      ).then((ordenResponse) => {
        setOrdenCobrada(ordenResponse)
        Swal.fire('Orden Cobrada', `Monto $ ${ordenResponse.monto_cobrado}`, 'success')
      })
      .catch(handleApiError)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Panel de Cobro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tarjetaIdCliente && ordenData ? (
          <div style={{ position: 'relative', zIndex: 1050 }}>
            <OrdenView 
              ordenData={ordenData} 
              onCobrar={handleCobrar}
            />
          </div>
        ) : (
          <CardReaderInput onCardRead={handleCardReadWrapper} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PanelCobro;