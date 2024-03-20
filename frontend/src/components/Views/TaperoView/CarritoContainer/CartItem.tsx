import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { PlusCircle, DashCircle, XCircle } from 'react-bootstrap-icons';
import { Renglon } from '../../../../codegen_output';
import { useCart } from '../CartContext';

interface Props {
  item: Renglon;
}

function CartItem({ item }: Props) {
  const context = useCart();

  if (!context) {
    // Handle the case where context is null, perhaps return a loading spinner or a message
    return <div>Loading...</div>;
  }

  // Destructure the needed functions from context
  const { removeFromCart, addToCart } = context;

  const handleRemoveFromCart = () => {
    removeFromCart(item.producto_id);
  };

  const handleIncreaseQuantity = () => {
    addToCart(item.producto_id, 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.cantidad > 1) {
      addToCart(item.producto_id, -1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <Card className="cart-item" key={item.id}>
      <Card.Body className="d-flex justify-content-between">
        <div>
          <Card.Title>{/* Title from item */}</Card.Title>
          <Card.Text>
            ${item.monto.toFixed(2)}
          </Card.Text>
          <Card.Text>
            Cantidad: {item.cantidad}
          </Card.Text>
        </div>
        <div className="cart-item-buttons">
          <Button variant="primary" onClick={handleIncreaseQuantity} className="cart-item-button" size="lg"><PlusCircle /></Button>
          <Button variant="primary" onClick={handleDecreaseQuantity} className="cart-item-button" size="lg"><DashCircle /></Button>
          <Button variant="danger" onClick={handleRemoveFromCart} className="cart-item-button" size="lg"><XCircle /></Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CartItem;
