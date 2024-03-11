import React, { useState, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';

interface CardReaderModalProps {
  show: boolean;
  onHide: () => void;
  title?: string;
  onCardRead: (tarjetaId: string) => void;
}

const CardReaderModal: React.FC<CardReaderModalProps> = ({ show, onHide, title, onCardRead }) => {
  const [cardNumber, setCardNumber] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (show && event.key === 'Enter' && cardNumber) {
        onCardRead(cardNumber); // Send the captured card number
        onHide(); // Hide the modal
        setCardNumber(''); // Reset the card number
      } else if (show && /\d/.test(event.key)) {
        // Append the input to the card number if it's a digit
        setCardNumber(cardNumber + event.key);
      }
    };

    // Attach the event listener to the window when the modal is shown
    window.addEventListener('keydown', handleKeyDown);

    // Don't forget to clean up the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, cardNumber, onCardRead, onHide]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || 'Lectura de Tarjeta'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p>Acerque la tarjeta al lector</p>
        <Spinner animation="border" />
        {/* Display card number for debugging */}
        <p>Numero: {cardNumber}</p>
      </Modal.Body>
    </Modal>
  );
};

export default CardReaderModal;
