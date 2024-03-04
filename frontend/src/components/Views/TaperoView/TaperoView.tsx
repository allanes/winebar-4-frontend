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

const TaperoView = () => {
  return (
    <CartProvider>
    <>
      <Header title='Atención de Clientes' />
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
