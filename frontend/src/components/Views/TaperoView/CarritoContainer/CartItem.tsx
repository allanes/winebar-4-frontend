import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Tapa } from '../../../../codegen_output';
import { PlusCircle, DashCircle, XCircle } from 'react-bootstrap-icons';
import { Renglon } from '../../../../codegen_output';

interface Props {
  item: Renglon
}
import { useCart } from '../CartContext';

function CartItem({ item }: Props) {
  const { removeFromCart, updateQuantityInCart } = useCart();

  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
  };

  const handleIncreaseQuantity = () => {
    updateQuantityInCart(item.id, item.cantidad + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.cantidad > 1) {
      updateQuantityInCart(item.id, item.cantidad - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <Card className="cart-item" key={item.id}>
      <Card.Body className="d-flex justify-content-between">
        <div>
          {/* // Assuming you have a way to get the product's title, replace `item.producto.titulo` with the correct property or method */}
          <Card.Title>{/* item.producto.titulo */}</Card.Title>
          <Card.Text>
            {/* // Assuming you have a way to get the product's price, replace `item.producto.precio` with the correct property or method */}
            ${(item.monto).toFixed(2)}
          </Card.Text>
          <Card.Text>
            Cantidad: {item.cantidad}
          </Card.Text>
        </div>
        <div className="cart-item-buttons">
          <Button variant="danger" onClick={handleRemoveFromCart} className="cart-item-button" size="lg"><XCircle /></Button>
          <Button variant="primary" onClick={handleIncreaseQuantity} className="cart-item-button" size="lg"><PlusCircle /></Button>
          <Button variant="primary" onClick={handleDecreaseQuantity} className="cart-item-button" size="lg"><DashCircle /></Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CartItem;
