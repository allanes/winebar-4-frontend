import React from 'react';
import { Card } from 'react-bootstrap';
import InfoCard from '../../Views/CajeroView/StatusPanel/InfoCard';

interface DifferenceCardProps {
  diferencia: number;
}

const DifferenceCard = ({ diferencia }: DifferenceCardProps) => {
  return (
    <Card className='info-card'>
      <Card.Body>
        <h6>Diferencia</h6>
        <InfoCard title="Diferencia" count={`$${diferencia}`} />
      </Card.Body>
    </Card>
  );
};

export default DifferenceCard;
