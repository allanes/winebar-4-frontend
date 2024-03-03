// StatusPanel.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const StatusPanel = () => {
  // Placeholder data - you'll fetch actual data from the backend
  const statusData = {
    activeClients: 42,
    shiftClients: 100,
    totalAmount: 5000,
  };

  return (
    <Card>
        <Card.Header>Estado</Card.Header>
        <Card.Body>
            <p>Clientes Activos: {statusData.activeClients}</p>
            <p>Clientes Totales: {statusData.shiftClients}</p>
            <p>Monto cobrado: ${statusData.totalAmount}</p>
        </Card.Body>
    </Card>
  );
};

export default StatusPanel;
