import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from '../../Header/Header';
import MenuList from './MenuList';
// import FooterBanner from './Footer';
// import Cart from './Cart';
import { CartProvider } from './CartContext';

const TaperoView = () => {
  return (
    <>
      <Header title='Atención de Clientes' />
      {/* <Container fluid> */}
      <Container fluid className='main'>
        <CartProvider>
            <Header />
            <MenuList />
            {/* <Cart /> */}
            {/* <FooterBanner /> */}
        </CartProvider>
      </Container>
    </>
  );
}

export default TaperoView;
