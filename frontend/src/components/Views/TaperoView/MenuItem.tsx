import React, { useContext } from 'react';
import { Tapa } from '../../../codegen_output';
import { CartContext } from './CartContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface Props {
  product: Tapa
}

function MenuItem({ product }: Props) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className="product-item" id={product.id}>
      <Card.Body>
        <Card.Title>{product.nombre}</Card.Title>
        <Card.Text>
          Precio: ${product.precio} 
        </Card.Text>
        <Button variant="primary" onClick={handleAddToCart}>Agregar</Button>
      </Card.Body>
    </Card>
  );
}

export default MenuItem;