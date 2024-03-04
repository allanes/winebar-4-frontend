import React, { useContext } from 'react';
import CartItem from './CartItem';
// import CartSummary from './CartSummary';
import { Row, Col } from 'react-bootstrap';
import { useCart } from '../CartContext';

function Cart() {
  const { cartItems } = useCart()!;

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
