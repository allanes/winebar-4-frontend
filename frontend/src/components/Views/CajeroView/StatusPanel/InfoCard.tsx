// InfoCard.tsx
import React from 'react';
import { Card } from 'react-bootstrap';
// import './styles/components/_cajeroView.scss'; // Path to your SCSS file

interface InfoCardProps {
  title: string;
  count: number | string;
}

const InfoCard = ({ title, count }: InfoCardProps) => {
  return (
    <Card className="estado--tarjeta">
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <div className="estado--contador">
          {count}
        </div>
        <div className="estado--titulo">
          {title}
        </div>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
