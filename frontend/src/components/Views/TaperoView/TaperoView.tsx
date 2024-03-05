import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Header } from '../../Header/Header';
import TaperoHeader from './TaperoHeader';
import MenuList from './MenuContainer/MenuList';
import Cart from './CarritoContainer/Cart';
import { CartProvider, useCart } from './CartContext';
import CardReaderModal from '../../ClientsContainer/CardReaderModal';
import { Pedido, PedidosService, ClientesService, OrdenesService } from '../../../codegen_output';

const TaperoViewContent = () => {
  const [showCardReaderModal, setShowCardReaderModal] = useState(true);
  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    if (!pedido) {
      setShowCardReaderModal(true);
    }
  }, [pedido]);

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
              .catch((error) => {
                console.error('Error opening order:', error);
                // Optionally, handle error (e.g., show error message)
              });
          })
      })
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
  return (
    <CartProvider>
      <Header title='Atención de Clientes' />
      <TaperoViewContent />
    </CartProvider>
  );
};

export default TaperoView;
