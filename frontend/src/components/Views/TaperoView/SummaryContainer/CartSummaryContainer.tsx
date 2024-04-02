import React, { useState, useEffect } from 'react';
import { Button, Card, Badge, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import { useCart } from '../CartContext';
import { displayLcdInfoCliente, clearLcd } from '../LcdService';
import { OrdenCompraDetallada, OrdenesService } from '../../../../codegen_output';
import { handleApiError } from '../../../ClientsContainer/ClientsContainer';
import OrdenViewForTapero from './OrdenViewForTapero';

const CartSummaryContainer = () => {    
  const { cartItems, tarjetaCliente, clienteSiendoAtendido, ordenCliente, pedidoEnCurso, confirmOrder } = useCart()!;
  const [showHistory, setShowHistory] = useState(false);
  const [ordenData, setOrdenData] = useState<OrdenCompraDetallada | null>(null);

  const handleGetOrdenDetalladaData = async () => {
    if (tarjetaCliente) {
      try {
        const response = await OrdenesService.handleReadOrdenByClientRfidBackendApiV1OrdenesByRfidTarjetaIdGet(tarjetaCliente);
        setOrdenData(response);
      } catch (error) {
        console.error('Error reading card:', error);
        handleApiError(error);
      }
    }
  };

  useEffect(() => {
    if (clienteSiendoAtendido && pedidoEnCurso) {
      const subtotal = cartItems.reduce((total, item) => total + item.cantidad * item.monto, 0);
      displayLcdInfoCliente({
        nombre: clienteSiendoAtendido.nombre,
        carrito: subtotal,
        consumos: ordenCliente?.monto_cargado || 0,
      });
      handleGetOrdenDetalladaData()
    }

    return () => {
      clearLcd();
    };
  }, [cartItems, clienteSiendoAtendido, pedidoEnCurso]);

  if (!tarjetaCliente || !clienteSiendoAtendido || !ordenCliente) {
    return null;
  }

  const itemCount = cartItems.reduce((count, item) => count + item.cantidad, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.cantidad * item.monto, 0);
  const maxAmount = pedidoEnCurso!.monto_maximo_pedido;

  const handleShowHistory = () => setShowHistory(true);
  const handleCloseHistory = () => setShowHistory(false);

  return (
    <Card className="mt-3">
      <Card.Header className="bg-primary text-white">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Resumen del carrito</h4>
            <Badge bg="warning" text="dark">
              ${maxAmount.toFixed(2)} MAX              
            </Badge>                      
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title className="mb-4 text-center">
          <Button variant="light" size="lg" onClick={handleShowHistory}>
            <h2 >
              {clienteSiendoAtendido.nombre}
            </h2>
          </Button>
        </Card.Title>
        <ListGroup className="mb-4">
          <ListGroupItem className='d-flex justify-content-between'>
            <div>Orden <strong> #{ordenCliente.id} </strong></div>
            <div>Pedido <strong> #{pedidoEnCurso?.id} </strong></div>            
            <h5><Badge bg="info" pill>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </Badge></h5>
          </ListGroupItem>
          <ListGroupItem className="d-flex justify-content-between align-items-center">
            <strong>Subtotal:</strong>
            <h4 className="mb-0">${subtotal.toFixed(2)}</h4>
          </ListGroupItem>
        </ListGroup>
        <div className="d-grid gap-3">
          <Button variant="primary" size="lg" onClick={confirmOrder}>
            Confirmar
          </Button>
          {/* <Button variant="secondary" size="lg" onClick={handleShowHistory}>
            Ver historial
          </Button> */}
        </div>
      </Card.Body>

      <Modal show={showHistory} onHide={handleCloseHistory} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Historial de consumos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add the consumption history content here */}
          {/* <p>Aquí se mostrará el historial de consumos del cliente.</p> */}
          {ordenData && <OrdenViewForTapero ordenData={ordenData} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseHistory}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default CartSummaryContainer;