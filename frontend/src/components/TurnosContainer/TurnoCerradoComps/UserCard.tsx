import React from 'react';
import { Card } from 'react-bootstrap';
import InfoCard from '../../Views/CajeroView/StatusPanel/InfoCard';

interface UserCardProps {
  montoEnCaja: number;
}

const SegunUsuarioCard = ({ montoEnCaja }: UserCardProps) => {
  return (
    <Card className='info-card'>
      <Card.Body>
        <h6>Según usuario</h6>
        <InfoCard title="Efectivo" count={`$${montoEnCaja}`} />
      </Card.Body>
    </Card>
  );
};

export default SegunUsuarioCard;
