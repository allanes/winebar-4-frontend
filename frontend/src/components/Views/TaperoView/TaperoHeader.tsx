import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function TaperoHeader() {    

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Shopping Cart</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="#cart">
          {/* 🛒 <span className="header__icon--total">{cartItems.length}</span> */}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default TaperoHeader;
