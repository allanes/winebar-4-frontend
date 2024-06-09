import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { OrdenesService, OrdenCompraDetallada } from '../../../codegen_output';
import OrdenView from '../../OrdenesContainer/OrdenView';
import { handleApiError } from '../../ClientsContainer/ClientsContainer';
import CardReaderModal from '../../ClientsContainer/CardReaderModal';

interface PanelCobroProps {
  show: boolean;
  onHide: () => void;
}

const PanelCobroOrden: React.FC<PanelCobroProps> = ({ show, onHide }) => {
  const [tarjetaIdCliente, setTarjetaIdCliente] = useState('');
  const [ordenData, setOrdenData] = useState<OrdenCompraDetallada | null>(null);

  const handleCardReadWrapper = async (tarjetaId: string) => {
    try {
      const response = await OrdenesService.handleReadOrdenByClientRfidBackendApiV1OrdenesByRfidTarjetaIdGet(Number(tarjetaId));
      setOrdenData(response);
      setTarjetaIdCliente(tarjetaId); // Setting the tarjetaId to trigger the order view
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
  
  return (
    <>
      {show && (
        ordenData ? (
          <Modal show={true} onHide={handleClose} centered size="xl">
            <Modal.Header closeButton className='panel-cobro-modal'>
              <Modal.Title className='text-white'>Panel de Cobro</Modal.Title>
            </Modal.Header>
            <Modal.Body className='panel-cobro-modal'>
              <OrdenView 
                ordenData={ordenData}
                ordenCobradaTrigger={handleClose}
              />
            </Modal.Body>
          </Modal>
        ) : (
          <CardReaderModal
            show={true}
            onCardRead={handleCardReadWrapper}
            onHide={handleClose}
            title='Panel de Cobro' 
          />
        )
      )}
    </>
  );
};

export default PanelCobroOrden;
