import React from 'react';
import { Modal } from 'react-bootstrap';
import CardReaderInput from './CardReaderInput';

interface CardReaderModalProps {
  show: boolean;
  onHide: () => void;
  title?: string;
  onCardRead: (tarjetaId: string) => void;
}

const CardReaderModal: React.FC<CardReaderModalProps> = ({ show, onHide, title, onCardRead }) => {
  const handleCardRead = (tarjetaId: string) => {
    onCardRead(tarjetaId);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || 'Lectura de Tarjeta'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CardReaderInput onCardRead={handleCardRead} />
      </Modal.Body>
    </Modal>
  );
};

export default CardReaderModal;