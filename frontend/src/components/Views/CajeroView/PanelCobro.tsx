import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { OrdenesService, OrdenCompraCerrada } from '../../../codegen_output';
import CardReaderInput from '../../ClientsContainer/CardReaderInput';
import OrdenView from './OrdenDetallada/OrdenView';
import { handleApiError } from '../../ClientsContainer/ClientsContainer';

interface PanelCobroProps {
  show: boolean;
  onHide: () => void;
}

const PanelCobro: React.FC<PanelCobroProps> = ({ show, onHide }) => {
  const [tarjetaIdCliente, setTarjetaIdCliente] = useState('');
  const [ordenData, setOrdenData] = useState<OrdenCompraCerrada | null>(null);

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

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Panel de Cobro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tarjetaIdCliente && ordenData ? (
          <OrdenView ordenData={ordenData} />
        ) : (
          <CardReaderInput onCardRead={handleCardReadWrapper} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PanelCobro;