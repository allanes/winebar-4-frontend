import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import InfoCard from '../../Views/CajeroView/StatusPanel/InfoCard';

interface UserCardProps {
  montoEnCaja: number;
}

const SegunUsuarioCard = ({ montoEnCaja }: UserCardProps) => {
  return (
    <Card>
        <Card.Title>
                <h4 className='mb-2'>Según Usuario</h4>
            </Card.Title>
            <Card.Body>
                <Row>
                    <Col className='info-card-total mt-4'>
                        <InfoCard title="Efectivo" count={`$${montoEnCaja}`} />
                    </Col>
                </Row>
            </Card.Body>
    </Card>
  );
};

export default SegunUsuarioCard;
