import React, { useState, useEffect } from 'react';
import { Button, Card, Badge, ListGroup, ListGroupItem, Modal, Row, Col } from 'react-bootstrap';
import { useCart } from '../CartContext';
import { displayLcdInfoCliente, clearLcd } from '../LcdService';
import { OrdenCompraDetallada, OrdenesService } from '../../../../codegen_output';
import { handleApiError } from '../../../ClientsContainer/ClientsContainer';
import OrdenViewForTapero from './OrdenViewForTapero';

const CartSummaryContainer = () => {    
  const { cartItems, tarjetaCliente, clienteSiendoAtendido, ordenCliente, pedidoEnCurso, confirmOrder, addToCartByPhysPort } = useCart()!;
  const [showHistory, setShowHistory] = useState(false);
  const [ordenData, setOrdenData] = useState<OrdenCompraDetallada | null>(null);

  useEffect(() => {
    if (clienteSiendoAtendido && pedidoEnCurso) {
      const subtotal = cartItems.reduce((total, item) => total + item.monto, 0);
      displayLcdInfoCliente({
        nombre: clienteSiendoAtendido.nombre,
        carrito: subtotal,
        consumos: ordenCliente?.monto_cargado || 0,
      });
    }

    return () => {
      clearLcd();
    };
  }, [cartItems, clienteSiendoAtendido, pedidoEnCurso, ordenCliente]);

  useEffect(() => {
    handleGetOrdenDetalladaData();
  }, [tarjetaCliente]);

  const handleGetOrdenDetalladaData = async () => {
    if (tarjetaCliente) {
      try {
        const response = await OrdenesService.handleReadOrdenByClientRfidBackendApiV1OrdenesByRfidTarjetaIdGet(tarjetaCliente);
        setOrdenData(response);

        const physPortResponse = await fetch(`http://localhost:3001/lectores-rfid/get_phys_port?card_number=${tarjetaCliente}`);
        const physPort = await physPortResponse.json();
        if (physPort) {
          console.log('Phys Port encontrado:', physPort);
          addToCartByPhysPort(physPort);
          
        }
        
        // console.log('Phys Port:', physPort.phys_port);
      } catch (error) {
        console.error('Phys Port no detectado. Asumiendo que el cliente está queriendo reloguearse:', error);
        // handleApiError(error);
      }
    }
  };

  if (!tarjetaCliente || !clienteSiendoAtendido || !ordenCliente) {
    return null;
  }

  const itemCount = cartItems.reduce((count, item) => count + item.cantidad, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.monto, 0);
  const maxAmount = pedidoEnCurso!.monto_maximo_pedido;

  const handleShowHistory = () => setShowHistory(true);
  const handleCloseHistory = () => setShowHistory(false);

  return (
    <Card className="mt-3 separador-principal">
      <Card.Header className="items-pill text-white">
        <h4 className="mb-0">Resumen del carrito</h4>
      </Card.Header>
      <Card.Body className='cart-summary-body'>
        <Card.Title className="mb-4 text-center">
          <Row className='align-items-center'>
            <Col>
              <h4>
                <Badge pill className='items-pill' >
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </Badge>
              </h4>
            </Col>
            <Col>
              <Button className='items-pill' size="lg" onClick={handleShowHistory}>
                <h2>
                  {clienteSiendoAtendido.nombre}
                </h2>
              </Button>
            </Col>
            <Col>
              <h4><Badge pill bg="warning" text="dark" className='text-white'>
                <Row className='px-3 pb-1'>$ {maxAmount.toFixed(0)}</Row>
                <Row className='justify-content-center'>MAX</Row>
              </Badge></h4>
            </Col>
          </Row>
        </Card.Title>
        <ListGroup className="mb-4">
          <ListGroupItem className='d-flex justify-content-between light-background'>
            <div>Orden <strong> #{ordenCliente.id} </strong></div>
            <div>Pedido <strong> #{pedidoEnCurso?.id} </strong></div>            
            
          </ListGroupItem>
          <ListGroupItem className="d-flex justify-content-between align-items-center light-background">
            <strong>Subtotal:</strong>
            <h4 className="mb-0">${subtotal.toFixed(2)}</h4>
          </ListGroupItem>
        </ListGroup>
        <Row>
          <Col className='d-flex justify-content-center'>
            <Button variant='success' size="lg" onClick={confirmOrder}>
              <h2>Confirmar</h2>
            </Button>
          </Col>
        </Row>
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