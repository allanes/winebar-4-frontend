import React from 'react';
import { Card, Col, Row, Badge } from 'react-bootstrap';
import InfoCard from '../../Views/CajeroView/StatusPanel/InfoCard';

interface UserCardProps {
  montoEnCaja: number;
  comentarios: string | null | undefined;
}

const SegunUsuarioCard = ({ montoEnCaja, comentarios }: UserCardProps) => {
  return (
    <Card className='cierre-caja-pago-card'>
      <Card.Body>
        <Col>
          <Row>
            <InfoCard title="Efectivo" count={`$${montoEnCaja}`} />
          </Row>
          <Row>
            <Col md={3}>
                <Badge bg='light' text='dark'>
                    Comentarios
                </Badge>
            </Col>
            <Col className='text-start'>
              {comentarios || 'No se guardaron comentarios'}
            </Col>
        </Row>
        </Col>
      </Card.Body>
    </Card>
  );
};

export default SegunUsuarioCard;
