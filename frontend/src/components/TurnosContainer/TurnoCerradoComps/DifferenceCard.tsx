import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import InfoCard from '../../Views/CajeroView/StatusPanel/InfoCard';

interface DifferenceCardProps {
  diferencia: number;
}

const DifferenceCard = ({ diferencia }: DifferenceCardProps) => {
  return (
    <Card className='transparent-card cierre-caja-pago-card'>
      <Card.Body>
        <Row>
          <Col>
            <InfoCard title="Diferencia" count={`$${diferencia}`} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DifferenceCard;
