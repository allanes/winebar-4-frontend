// StatusPanel.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import InfoCard from './InfoCard';

const StatusPanel = () => {
  // Placeholder data - you'll fetch actual data from the backend
  const statusData = {
    activeClients: 30,
    shiftClients: 100,
    totalAmount: 5000,
  };

  return (
    <Card className="contenedor-paneles--estado">
        <Card.Header>Estado</Card.Header>
        <Card.Body className="estado--contenedor">
            <InfoCard 
              title='Clientes Activos'
              count={statusData.activeClients}
            />
            {/* <div className="estado--tarjeta">
                    <p className="estado--contador">{statusData.activeClients}</p>
                    <p className="estado--titulo">Clientes Activos</p>
            </div> */}
            <div className="estado--tarjeta"> 
                    <p className="estado--contador">{statusData.shiftClients}</p>
                    <p className="estado--titulo">Clientes Totales</p>
            </div>
            <div className="estado--tarjeta">
                    <p className="estado--contador">{statusData.totalAmount}</p>
                    <p className="estado--titulo">Monto cobrado</p>
            </div>            
        </Card.Body>
    </Card>
  );
};

export default StatusPanel;
