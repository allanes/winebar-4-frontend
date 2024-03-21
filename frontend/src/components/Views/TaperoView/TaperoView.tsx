import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderWithUser from '../../Header/HeaderWithUser';
import TaperoHeader from './TaperoHeader';
import MenuList from './MenuContainer/MenuList';
import Cart from './CarritoContainer/Cart';
import { CartProvider, useCart } from './CartContext';
import CardReaderModal from '../../ClientsContainer/CardReaderModal';
import { Pedido, ApiError } from '../../../codegen_output';
import { useAuth } from '../../auth/AuthContext';
import Swal from 'sweetalert2';

const TaperoViewContent = () => {
  const [showCardReaderModal, setShowCardReaderModal] = useState(true);

  const context = useCart();
  
  const { pedidoEnCurso, handleCardRead } = context!;
  
  useEffect(() => {
    if (pedidoEnCurso) {
      setShowCardReaderModal(false);
    } else {
      setShowCardReaderModal(true);
    }
  }, [pedidoEnCurso]);

  if (!context) {
    console.error('Cart context is not available.');
    return null; // Or handle this case as you see fit
  }

  const handleApiErrorCustom = (error: unknown) => {
    const err = error as ApiError;
    let errorMessage = 'Ocurrió un error.';
    if (err.body && err.body.detail) {
      errorMessage = err.body.detail;
    }

    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      allowOutsideClick: false,
      allowEnterKey: false,
      showConfirmButton: false,
      timer: 2300, // Auto close after 5 seconds
    }).then(() => {
      setShowCardReaderModal(true); // Re-show the card reader modal after the alert closes
    });
  };

  const handleCardReadWrapper = async (tarjetaId: string) => {
    try {
      await handleCardRead(tarjetaId);
    } catch (error) {
      handleApiErrorCustom(error);
    }
  };

  return (
    <>
      <CardReaderModal
        show={showCardReaderModal}
        onHide={() => setShowCardReaderModal(false)}
        onCardRead={handleCardReadWrapper}
      />
      <Container fluid className='main'>
        {/* <TaperoHeader /> */}
        <Col>
          <Row xs={12} md={8} className='menu-col'>
            <MenuList />
          </Row>
          <Row xs={12} md={4}>
            <Cart />
          </Row>
        </Col>
        {/* <FooterBanner /> */}
      </Container>
    </>
  );
};

const TaperoView = () => {
  const { isLoggedIn } = useAuth();

  return (
    <CartProvider>
      <HeaderWithUser title='Atención de Clientes'/>
      {isLoggedIn && <TaperoViewContent />}
    </CartProvider>
  );
};

export default TaperoView;