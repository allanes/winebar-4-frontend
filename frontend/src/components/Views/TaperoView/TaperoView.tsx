import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from '../../Header/Header';
import TaperoHeader from './TaperoHeader';
import MenuList from './MenuContainer/MenuList';
import Cart from './CarritoContainer/Cart';
// import FooterBanner from './Footer';
// import Cart from './Cart';
// import { CartProvider } from './CartContext';
import { CartProvider } from './CartContext';
import { useState, useEffect } from 'react';
import CardReaderModal from '../../ClientsContainer/CardReaderModal';
import { Pedido, PedidosService } from '../../../codegen_output';

const TaperoView = () => {
  const [showCardReaderModal, setShowCardReaderModal] = useState(true);
  const [pedido, setPedido] = useState<Pedido>();

  useEffect(() => {
    if (pedido === null) {
      setShowCardReaderModal(true);
    }
  }, [pedido]);

  const handleCardRead = (tarjetaId: string) => {
    PedidosService.handleAbrirPedidoBackendApiV1PedidosAbrirPost(parseInt(tarjetaId))
      .then((response) => {
        setPedido(response);
        setShowCardReaderModal(false);
      })
      .catch((error) => {
        console.error('Error opening order:', error);
        // Optionally, handle error (e.g., show error message)
      });
  };

  return (
    <CartProvider>
    <>
      <Header title='Atención de Clientes' />
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
    </CartProvider>
  );
}

export default TaperoView;
