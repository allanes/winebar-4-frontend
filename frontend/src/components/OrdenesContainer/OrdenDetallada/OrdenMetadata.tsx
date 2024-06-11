import React from 'react';
import { Col, Card, Container, Row, Badge } from 'react-bootstrap';
import { OrdenCompraDetallada, OrdenCompraInfoPago } from '../../../codegen_output';
import { RolBadge } from '../../RolesContainer/RolBadge';
import TimestampFormateadoBadge from '../../Common/TimestampFormateadoBadge';
import FooterOrdenAbierta from './FooterOrdenAbierta';
import FooterOrdenCerrada from './FooterOrdenCerrada';
import MontoMaximoBadge from './MontoMaximoBadge'; // Import the new component

interface OrdenMetadataProps {
  ordenData: OrdenCompraDetallada;
  onCobrar?: (ordenId: number, infoPago: OrdenCompraInfoPago) => void;
}

const OrdenMetadata: React.FC<OrdenMetadataProps> = ({ ordenData, onCobrar }) => {
  const openedPedidos = ordenData.pedidos.filter(pedido => pedido.cerrado === false).length;

  return (
    <Container>
      <Card bg='dark'>
        <Card.Header className='text-center table-container-title'>
            <Row>
              <Col md={4}>
                <h5><Badge bg="secondary">Orden #{ordenData.id}</Badge></h5>
              </Col>
              <Col md={4}>
                <h5><TimestampFormateadoBadge timestamp={ordenData.timestamp_apertura_orden} /></h5>
              </Col>
              <Col md={4}>
                <Row>
                  <Col>
                    <MontoMaximoBadge
                      id={ordenData.id}
                      label="Máx General"
                      field="monto_maximo_orden"
                      initialValue={ordenData.monto_maximo_orden}
                    />
                  </Col>
                  <Col>
                    {/* Add another badge for the new field if necessary */}
                    <MontoMaximoBadge
                      id={ordenData.id}
                      label="Cada Pedido"
                      field="monto_maximo_pedido"
                      initialValue={ordenData.monto_maximo_pedido}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Header> 
          <Card.Body>
          <Row className='mt-4'>
              <Col>
                <Row className='text-white'>
                  <h1>{ordenData.nombre_cliente}</h1>
                </Row>
                <Row>
                  <h4>
                    <RolBadge roleName={ordenData.rol} />
                  </h4>
                </Row>
              </Col>
              <Col>
                <Badge pill bg='success' className='ps-5 pe-5'>
                  <Row>
                    <h1>{`$ ${ordenData.monto_cargado.toLocaleString('es-ES')}`}</h1>
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
            <FooterOrdenCerrada ordenData={ordenData} />
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
