import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import HeaderWithUser from '../../Header/HeaderWithUser';
import TaperoHeader from './TaperoHeader';
import MenuList from './MenuContainer/MenuList';
import Cart from './CarritoContainer/Cart';
import { CartProvider, useCart } from './CartContext';
import CardReaderModal from '../../ClientsContainer/CardReaderModal';
import { Pedido, PedidosService, ClientesService, OrdenesService, PersonalInterno, LoginService, Token, OpenAPI, ApiError } from '../../../codegen_output';
import LoginPanel from '../CajeroView/LoginPanel';
import Swal from 'sweetalert2';

const TaperoViewContent = () => {
  const [showCardReaderModal, setShowCardReaderModal] = useState(true);
  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    if (!pedido) {
      setShowCardReaderModal(true);
    }
  }, [pedido]);

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
      didClose: () => setShowCardReaderModal(true) // Re-show the card reader modal after the alert closes
    });
  };

  const context = useCart();
  if (!context) {
    console.error('Cart context is not available.');
    return null;  // Or handle this case as you see fit
  }
  const { setClienteData } = context;  

  const handleCardRead = (tarjetaId: string) => {
    ClientesService.handleReadClienteByTarjetaIdBackendApiV1ClientesConTarjetaTarjetaIdGet(parseInt(tarjetaId))
      .then ((clienteResponse) => {
        OrdenesService.handleReadOrdenByClientRfidBackendApiV1OrdenesByRfidTarjetaIdGet(parseInt(tarjetaId))
          .then((ordenResponse) => {
            PedidosService.handleAbrirPedidoBackendApiV1PedidosAbrirPost(parseInt(tarjetaId))
              .then((pedidosResponse) => {
                // Local variables
                setPedido(pedidosResponse);
                // CartProvider variables
                setClienteData(clienteResponse, ordenResponse, pedidosResponse);
                setShowCardReaderModal(false);
              })
              .catch(handleApiErrorCustom);
          })
          .catch(handleApiErrorCustom);
      })
      .catch(handleApiErrorCustom);
  };

  return (
    <>
      <CardReaderModal
        show={showCardReaderModal}
        onHide={() => setShowCardReaderModal(false)}
        onCardRead={handleCardRead}
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [usuarioLogueado, setUsuarioLogueado] = useState<PersonalInterno | null>(null);

  const handleLoginSuccess = async (token: Token) => {
    localStorage.setItem('token', token.access_token); // Save token locally
    OpenAPI.TOKEN = token.access_token;
    // Configure your API client to use the token
    // Assuming your codegen automatically handles bearer tokens if configured:
    try {
      const usuarioLogueadoData = await LoginService.readUsersMeBackendApiV1LoginUsersMeGet();
      setUsuarioLogueado(usuarioLogueadoData);
      setIsLoggedIn(true);
      setShowLoginModal(false);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    OpenAPI.TOKEN = '';
    setIsLoggedIn(false);
    setUsuarioLogueado(null);
    // Implement additional logout logic as needed
  };

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  return (
    <CartProvider>
      <HeaderWithUser 
        title='Atención de Clientes' 
        isLoggedIn={isLoggedIn} 
        user={{ name: usuarioLogueado?.nombre || 'Invitado' }} 
        onLogin={handleShowLoginModal} 
        onLogout={handleLogout} 
      />
      {showLoginModal && <LoginPanel onLoginSuccess={handleLoginSuccess} target='tapa' />}      
      {isLoggedIn && <TaperoViewContent />}
    </CartProvider>
  );
};

export default TaperoView;
