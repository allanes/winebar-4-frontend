import React, { useContext } from 'react';
import { Tapa } from '../../../../codegen_output';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface Props {
  tapa: Tapa
}

function MenuItem({ tapa }: Props) {
  // const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    // addToCart(product);
  };

  return (
    <Card className="product-item" id={`${tapa.id}`}>
      <Card.Body>
        <Card.Title>{tapa.producto.titulo}</Card.Title>
        <Card.Text>
          ${tapa.producto.precio} 
        </Card.Text>
        <Button variant="primary" onClick={handleAddToCart}>Agregar</Button>
      </Card.Body>
    </Card>
  );
}

export default MenuItem;