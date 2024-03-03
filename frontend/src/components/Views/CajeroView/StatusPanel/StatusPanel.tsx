// StatusPanel.tsx
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import InfoCard from './InfoCard';

const StatusPanel = () => {
  // Placeholder data - you'll fetch actual data from the backend
  const statusData = {
    activeClients: 30,
    shiftClients: 100,
    totalAmount: 5000,
  };

  return (
    <Card >
        <Card.Header>Estado</Card.Header>
        <Card.Body>
            <Row >
              <Col>
                <InfoCard title='Clientes Activos' count={statusData.activeClients} />
              </Col>
              <Col>
                <InfoCard title='Clientes Totales' count={statusData.shiftClients} />
              </Col>
            </Row>
              <Col>
                <InfoCard title='Monto cobrado' count={`$${statusData.totalAmount}`} />
              </Col>
        </Card.Body>
    </Card>
  );
};

export default StatusPanel;
