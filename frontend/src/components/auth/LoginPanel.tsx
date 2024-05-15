import React, { useState, useEffect } from 'react';
import { Modal, Spinner, Row, Col } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { LockFill } from 'react-bootstrap-icons';

const LoginPanel = () => {
  const [cardNumber, setCardNumber] = useState('');
  const { login } = useAuth();

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && cardNumber) {
      login(cardNumber);
      setCardNumber(''); // Reset after attempt
    } else if (/\d/.test(event.key)) {
      setCardNumber(cardNumber + event.key);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cardNumber]);

  return (
    <Modal show={true} onHide={() => {}} centered className="login-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          <LockFill  size={50} className='me-3'/> 
          Login RFID
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p>Acerque la tarjeta al lector</p>
        <Spinner animation="border" variant="light" />
        <p>Número: {cardNumber}</p>
      </Modal.Body>
    </Modal>
  );
};

export default LoginPanel;
