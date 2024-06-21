import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import InfoCard from '../../Views/CajeroView/StatusPanel/InfoCard';

interface UserCardProps {
  montoEnCaja: number;
}

const SegunUsuarioCard = ({ montoEnCaja }: UserCardProps) => {
  return (
    <Card className='cierre-caja-pago-card'>
      <Card.Body>
        <Row>
          <Col>
            <InfoCard title="Efectivo" count={`$${montoEnCaja}`} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SegunUsuarioCard;
