import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { useCart } from '../CartContext';
import { PedidosService, ApiError } from '../../../../codegen_output';
import Swal from 'sweetalert2';

const CartSummaryContainer = () => {    
  const { cartItems, tarjetaCliente, clienteSiendoAtendido, ordenCliente, confirmOrder } = useCart()!;

  if (!tarjetaCliente || !clienteSiendoAtendido || !ordenCliente) {
    return <></>
  }

  const itemCount = cartItems.reduce((count, item) => count + item.cantidad, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.cantidad * item.monto, 0);

  return (
    <Card className="mt-3 ">
      <Card.Header>Resumen del carrito</Card.Header>
      <Card.Body className='separador-principal'>
        <Card.Title>{itemCount} {itemCount === 1 ? 'item' : 'items'}</Card.Title>
        <Card.Text>            
                {/* Transacciones aprobadas: {response.transacciones_procesadas]}
                Transacciones fallidas: {response.transacciones_fallidas]} */}
                {/* Monto cargado: {response.monto]} */}
                <p>Nombre: {clienteSiendoAtendido.nombre}</p>
                <p>Orden: #{ordenCliente.id}</p>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
        </Card.Text>
        <Button variant="primary" onClick={confirmOrder}>Confirmar</Button>
      </Card.Body>
    </Card>
  );
};

export default CartSummaryContainer;
