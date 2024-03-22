import React, { useState } from 'react';
import { Modal, Button, ListGroup, Row, Col, Card } from 'react-bootstrap';
import { OrdenesService, OrdenCompraCerrada } from '../../../../codegen_output';
import CardReaderInput from '../../../ClientsContainer/CardReaderInput';
import PedidosList from './PedidosList';
import { handleApiError } from '../../../ClientsContainer/ClientsContainer';

interface PanelCobroProps {
  show: boolean;
  onHide: () => void;
}

const PanelCobro: React.FC<PanelCobroProps> = ({ show, onHide }) => {
  const [tarjetaIdCliente, setTarjetaIdCliente] = useState('');
  const [ordenData, setOrdenData] = useState<OrdenCompraCerrada | null>(null);

  const handleCardReadWrapper = async (tarjetaId: string) => {
    try {
      const response = await OrdenesService.handleReadOrdenByClientRfidBackendApiV1OrdenesByRfidTarjetaIdGet(Number(tarjetaId));
      setOrdenData(response);
      setTarjetaIdCliente(tarjetaId);
    } catch (error) {
      console.error('Error reading card:', error);
      handleApiError(error);
    }
  };

  const handleClose = () => {
    setOrdenData(null)
    setTarjetaIdCliente('')
    onHide()
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Panel de Cobro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tarjetaIdCliente && ordenData ? (
          <div>
            <Row>
              <Col md={6}>
                <Card>
                  <Card.Header>Información de la Orden</Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>ID:</strong> {ordenData.id}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Cliente ID:</strong> {ordenData.cliente_id}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Abierta por:</strong> {ordenData.abierta_por}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Cerrada por:</strong> {ordenData.cerrada_por}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <Card.Header>Detalles de la Orden</Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Precarga usada:</strong> {ordenData.precarga_usada}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Monto máximo orden:</strong> {ordenData.monto_maximo_orden}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Monto cargado:</strong> {ordenData.monto_cargado}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Monto cobrado:</strong> {ordenData.monto_cobrado}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>                
              </Col>
            </Row>
            <Row>
              <PedidosList pedidos={ordenData.pedidos} />
            </Row>
          </div>
        ) : (
        //   <p>Loading data...</p>
          <CardReaderInput
            onCardRead={handleCardReadWrapper}
          />
        )}

        {/* Render the Ordenes listing component here */}
      </Modal.Body>
    </Modal>
  );
};

export default PanelCobro;