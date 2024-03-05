import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { useCart } from '../CartContext';
import { PedidosService, ApiError } from '../../../../codegen_output';
import Swal from 'sweetalert2';

const CartSummaryContainer = () => {    
  const { cartItems, tarjetaCliente, clienteSiendoAtendido, ordenCliente } = useCart()!;

  if (!tarjetaCliente || !clienteSiendoAtendido || !ordenCliente) {
    return <></>
  }

  const itemCount = cartItems.reduce((count, item) => count + item.cantidad, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.cantidad * item.monto, 0);

  const handleApiError = (error: unknown) => {
    const err = error as ApiError;
    let errorMessage = 'Ocurrió un error.';
    if (err.body && err.body.detail) {
      errorMessage = err.body.detail;
    }
    Swal.fire('Error', errorMessage, 'error');
  };

  const handleConfirmar = () => {
    console.log('Confirmar')
    PedidosService.handleCerrarPedidoBackendApiV1PedidosCerrarPost(tarjetaCliente)
        .then((response) => {
            Swal.fire('Pedido cargado', `
                <div>
                    <p>Nombre: ${clienteSiendoAtendido.nombre}</p>
                    <p>Atendido por: ${response.atendido_por}</p>
                    <p>Fecha: ${response.timestamp_pedido}</p>
                    <p>Cerrado: ${response.cerrado}</p>
                    <p>Monto cargado: ${subtotal}</p>
                </div>                
            `).then(() => {
                window.location.reload();
            })
        })
        .catch((error) => {
            handleApiError(error)
        })
  }

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
        <Button variant="primary" onClick={handleConfirmar}>Confirmar</Button>
      </Card.Body>
    </Card>
  );
};

export default CartSummaryContainer;
