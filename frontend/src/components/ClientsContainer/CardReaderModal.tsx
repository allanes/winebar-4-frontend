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
    <Modal show={show} onHide={onHide} centered >
      <Modal.Header closeButton className='card-reader-modal'>
        <Modal.Title>{title || 'Esperando tarjeta'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='card-reader-modal'>
        <CardReaderInput onCardRead={handleCardRead} />
      </Modal.Body>
    </Modal>
  );
};

export default CardReaderModal;