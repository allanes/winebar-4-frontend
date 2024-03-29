import React from 'react';
import { Col, Card, Container, Row, Badge, Button } from 'react-bootstrap';
import { OrdenCompraCerrada } from '../../../../codegen_output';
import { RolBadge } from '../../../RolesContainer/RolBadge';
import TimestampFormateadoBadge from '../../../Common/TimestampFormateadoBadge';

interface OrdenMetadataProps {
  ordenData: OrdenCompraCerrada;
  onCobrar: () => void;
}

const OrdenMetadata: React.FC<OrdenMetadataProps> = ({ ordenData, onCobrar }) => {
  const openedPedidos = ordenData.pedidos.filter(pedido => pedido.cerrado===false).length;

  return (
    <Container>
      <Card>
        <Card.Body>
          <Row>
            <Col md={4}>
              <h5><Badge bg="secondary">Orden #{ordenData.id}</Badge></h5>
            </Col>
            <Col md={4}>
              <h5><TimestampFormateadoBadge timestamp={ordenData.timestamp_apertura_orden} /></h5>
            </Col>
            <Col md={4}>
              <h5><Badge bg="secondary">Monto Máx: ${ordenData.monto_maximo_orden}</Badge></h5>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col>
              <Row>
                <h1>{ordenData.nombre_cliente}</h1>
              </Row>
              <Row>
                <h4>
                  <RolBadge 
                    roleName={ordenData.rol}
                  />                            
                </h4>
              </Row>
            </Col>
            <Col>
              <Badge pill bg='success' className='ps-5 pe-5'>
                <Row>
                  <h1>{`$ ${ordenData.monto_cargado}`}</h1>
                </Row>
                <Row>
                  <h6>Monto Cargado</h6>
                </Row>
              </Badge>
            </Col>
          </Row>        
        </Card.Body>
        <Card.Footer>
          <Row >
            <Col md={4} />
            <Col md={4} className='justify-content-center'>
              <Button variant="success" size="lg"  onClick={onCobrar}>
                Cobrar
              </Button>
            </Col>
            <Col md={4} className='boton-cobro-advertencia '>
              {(openedPedidos > 0) && (
                "Los pedidos abiertos seran borrados"
              )}
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default OrdenMetadata;