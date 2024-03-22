import React from 'react';
import { Col, Card, ListGroup } from 'react-bootstrap';
import { OrdenCompraCerrada } from '../../../../codegen_output';

interface OrdenMetadataProps {
  ordenData: OrdenCompraCerrada;
}

const OrdenMetadata: React.FC<OrdenMetadataProps> = ({ ordenData }) => {
  return (
    <>
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
    </>
  );
};

export default OrdenMetadata;