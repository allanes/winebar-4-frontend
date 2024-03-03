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
            <div className='contenedor-paneles--estado'>
            <div className="estado--contenedor">
                <div className="estado--tarjeta">
                        <p className="estado--contador">{statusData.activeClients}</p>
                        <p className="estado--titulo">Clientes Activos</p>
                </div>
                <div className="estado--tarjeta">
                        <p className="estado--contador">{statusData.shiftClients}</p>
                        <p className="estado--titulo">Clientes Totales</p>
                </div>
                <div className="estado--tarjeta">
                        <p className="estado--contador">{statusData.totalAmount}</p>
                        <p className="estado--titulo">Monto cobrado</p>
                </div>
            </div>
            </div>
        </Card.Body>
    </Card>
  );
};

export default StatusPanel;
