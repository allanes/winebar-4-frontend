// OrdenMetadata.tsx
import React from 'react';
import { Col, Card, Container, Row, Badge } from 'react-bootstrap';
import { OrdenCompraDetallada, OrdenCompraInfoPago } from '../../codegen_output';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';
import FooterOrdenAbierta from '../OrdenesContainer/OrdenDetallada/FooterOrdenAbierta';
import FooterOrdenCerrada from '../OrdenesContainer/OrdenDetallada/FooterOrdenCerrada';
import ConfiguracionMontoEditableBadge from '../OrdenesContainer/OrdenDetallada/MontoMaximoBadge';

interface OrdenMetadataProps {
  ordenData: OrdenCompraDetallada;
  onCobrar?: (ordenId: number, infoPago: OrdenCompraInfoPago) => void;
  onUpdate?: () => void; // Optional update callback
}

const OrdenMetadata: React.FC<OrdenMetadataProps> = ({ ordenData, onCobrar, onUpdate }) => {
  const openedPedidos = ordenData.pedidos.filter(pedido => pedido.cerrado === false).length;

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
              <h5>
                <ConfiguracionMontoEditableBadge
                  montoMaximo={ordenData.monto_maximo_orden}
                  ordenId={ordenData.id}
                  onUpdate={onUpdate || (() => window.location.reload())} // Default to page reload
                />
              </h5>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col>
              <Row>
                <h1>{ordenData.nombre_cliente}</h1>
              </Row>
              <Row>
                <h4>
                  <Badge bg="info" pill>{ordenData.rol}</Badge>
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
          {ordenData.cerrada_por ? (
            <FooterOrdenCerrada
              ordenData={ordenData}
            />
          ) : (
            <FooterOrdenAbierta
              ordenData={ordenData}
              openedPedidos={openedPedidos}
              onCobrar={onCobrar!}
              ordenId={ordenData.id}
            />
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default OrdenMetadata;
