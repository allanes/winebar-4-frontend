import React, { useContext } from 'react';
import CartItem from './CartItem';
// import CartSummary from './CartSummary';
import { Row, Col } from 'react-bootstrap';
import { useCart } from '../CartContext';
import { Renglon } from '../../../../codegen_output';

function Cart() {
  const context = useCart();
  
  if (!context) {
    // Handle the case where context is null, perhaps return a loading spinner or a message
    return <div>Loading...</div>;
  }

  const { cartItems } = context;

  return (
    <Row className="cart ">
      <Col md={6} className="cart-items separador-principal">
        {cartItems.map((item: Renglon) => (
          <CartItem key={item.id} item={item} />
        ))}
      </Col>
      <Col md={6} className="cart-summary">
        {/* <CartSummary /> */}
      </Col>
    </Row>
  );
}

export default Cart;
