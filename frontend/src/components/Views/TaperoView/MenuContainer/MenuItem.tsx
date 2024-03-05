import React, { useContext } from 'react';
import { Tapa, PedidosService, RenglonCreate } from '../../../../codegen_output';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useCart } from '../CartContext';

interface Props {
  tapa: Tapa
}

function MenuItem({ tapa }: Props) {
  const { tarjetaCliente, addToCart } = useCart()!;
  if (!tarjetaCliente) {
    return <></>
  }

  const handleAddToCart = () => {
    const renglonCreate: RenglonCreate = {
      cantidad: 1,
      producto_id: tapa.producto.id,
    };
    PedidosService.handleAgregarProductoBackendApiV1PedidosAgregarProductoPost(tarjetaCliente, renglonCreate)
      .then((renglon) => {
        addToCart(renglon);
      })
      .catch((error) => console.error('Error adding item to cart:', error));
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