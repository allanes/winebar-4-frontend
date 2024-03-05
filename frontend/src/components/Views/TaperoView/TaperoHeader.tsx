import React, { useContext } from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { useCart } from './CartContext';

function TaperoHeader() {    
  const {clienteSiendoAtendido, ordenCliente} = useCart()!;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Nuevo Pedido</Navbar.Brand>
      {clienteSiendoAtendido && <Navbar.Brand href="#home">Cliente: {clienteSiendoAtendido.nombre}</Navbar.Brand>}
      {ordenCliente && <Navbar.Brand href="#home">Máximo: ${ordenCliente.monto_maximo_orden}</Navbar.Brand>}
      <Nav className="ml-auto">
        <Nav.Link href="#cart">
          {/* 🛒 <span className="header__icon--total">{cartItems.length}</span> */}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default TaperoHeader;
