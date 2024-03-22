import React from 'react';
import { Col, Card, Container, Row, Badge } from 'react-bootstrap';
import { OrdenCompraCerrada } from '../../../../codegen_output';
import { RolBadge } from '../../../RolesContainer/RolBadge';

interface OrdenMetadataProps {
  ordenData: OrdenCompraCerrada;
}

const OrdenMetadata: React.FC<OrdenMetadataProps> = ({ ordenData }) => {
  return (
    <Container>
    <Card>
        <Card.Title>Detalles de la orden</Card.Title>
        <Card.Body>
        <Row>
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
                    <h1>${ordenData.monto_cargado}</h1>
                </Row>
                <Row>
                    <h6>Monto Cargado</h6>
                </Row>
                </Badge>
            </Col>
        </Row>
        <Row className='mt-4'>
            <Col md={4}>
                <h5><Badge bg="secondary">Orden #{ordenData.id}</Badge></h5>
            </Col>
            <Col md={4}>
                <h5><Badge bg="secondary">{ordenData.timestamp_apertura_orden}</Badge></h5>
            </Col>
            <Col md={4}>
                <h5><Badge bg="secondary">Monto Máx: ${ordenData.monto_maximo_orden}</Badge></h5>
            </Col>
        </Row>
        </Card.Body>
    </Card>
    </Container>
  );
};

export default OrdenMetadata;