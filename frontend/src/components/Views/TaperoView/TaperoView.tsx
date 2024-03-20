import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
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
  if (!context) {
    console.error('Cart context is not available.');
    return null; // Or handle this case as you see fit
  }
  const { pedidoEnCurso, handleCardRead } = context;

  useEffect(() => {
    if (pedidoEnCurso) {
      setShowCardReaderModal(false);
    } else {
      setShowCardReaderModal(true);
    }
  }, [pedidoEnCurso]);

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
        <TaperoHeader />
        <MenuList />
        <Cart />
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