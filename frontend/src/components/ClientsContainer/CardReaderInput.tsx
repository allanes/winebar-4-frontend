import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

interface CardReaderInputProps {
  onCardRead: (tarjetaId: string) => void;
}

const CardReaderInput: React.FC<CardReaderInputProps> = ({ onCardRead }) => {
  const [cardNumber, setCardNumber] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && cardNumber) {
        onCardRead(cardNumber); // Send the captured card number
        setCardNumber(''); // Reset the card number
      } else if (/\d/.test(event.key)) {
        // Append the input to the card number if it's a digit
        setCardNumber(cardNumber + event.key);
      }
    };

    // Attach the event listener to the window
    window.addEventListener('keydown', handleKeyDown);

    // Don't forget to clean up the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cardNumber, onCardRead]);

  return (
    <div className="text-center">
      <p>Acerque la tarjeta al lector</p>
      <Spinner animation="border" />
      {/* Display card number for debugging */}
      <p>Numero: {cardNumber}</p>
    </div>
  );
};

export default CardReaderInput;