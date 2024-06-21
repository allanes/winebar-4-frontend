import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import InfoCard from '../../Views/CajeroView/StatusPanel/InfoCard';

interface DifferenceCardProps {
  diferencia: number;
}

const DifferenceCard = ({ diferencia }: DifferenceCardProps) => {
  return (
    <Card>
        <Card.Title>
                <h4 className='mb-2'>Diferencia (entre usuario y sistema) </h4>
            </Card.Title>
            <Card.Body>
                <Row>
                    <Col className='info-card-total mt-4'>
                        <InfoCard title="Diferencia" count={`$${diferencia}`} />
                    </Col>
                </Row>
            </Card.Body>
    </Card>
  );
};

export default DifferenceCard;
