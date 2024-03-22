import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { OrdenesService } from '../../../codegen_output';
import CardReaderModal from '../../ClientsContainer/CardReaderModal';
import { handleApiError } from '../../ClientsContainer/ClientsContainer';

interface PanelCobroProps {
  show: boolean;
  onHide: () => void;
}

const PanelCobro: React.FC<PanelCobroProps> = ({ show, onHide }) => {
    const [tarjetaIdCliente, setTarjetaIdCliente] = useState('')

    const handleCardReadWrapper = async (tarjetaId: string) => {
        try {
            const response = await OrdenesService.handleReadOrdenByClientRfidBackendApiV1OrdenesByRfidTarjetaIdGet(Number(tarjetaId))
        
        } catch (error) {
            console.error('Error reading card:', error);
            handleApiError(error);
        }
    };

    return (
        <>
        {tarjetaIdCliente ? (
            <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Panel de Cobro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Por favor, presente la tarjeta del cliente para realizar el cobro.</p>
            </Modal.Body>
            </Modal>
        ) : (
            <CardReaderModal
                show={show}
                onHide={onHide}
                onCardRead={handleCardReadWrapper}
            />
        )}
        </>
    );
};

export default PanelCobro;