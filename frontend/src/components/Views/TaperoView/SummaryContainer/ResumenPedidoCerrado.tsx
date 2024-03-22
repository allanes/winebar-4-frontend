import React, { useState } from 'react';
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useCart } from '../CartContext';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

interface ResumenPedidoCerradoProps {
  orderClosed: boolean;
  onClose: () => void;
}

const ResumenPedidoCerrado: React.FC<ResumenPedidoCerradoProps> = ({ orderClosed, onClose }) => {
  const { clienteSiendoAtendido, cartItems, pedidoEnCurso, ordenCliente } = useCart()!;

  if (!clienteSiendoAtendido || !pedidoEnCurso || !ordenCliente) {
    return null;
  }

  const subtotal = cartItems.reduce((total, item) => total + item.cantidad * item.monto, 0);
  const itemCount = cartItems.reduce((count, item) => count + item.cantidad, 0);

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>Resumen del Pedido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Title className="mb-4 text-center">
            <Button variant="light" size="lg" >
                <h2 >
                {clienteSiendoAtendido.nombre}
                </h2>
            </Button>
        </Modal.Title>
        <ListGroup variant="flush">
          <ListGroupItem>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Items</strong>
              <span>{itemCount}</span>
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Estado</strong>
              {orderClosed ? (
                <span className="text-success">
                  <CheckCircleFill /> Cerrado
                </span>
              ) : (
                <span className="text-danger">
                  <XCircleFill /> Abierto
                </span>
              )}
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Monto cargado</strong>
              <span className="text-success h4">${subtotal.toFixed(2)}</span>
            </div>
          </ListGroupItem>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResumenPedidoCerrado;