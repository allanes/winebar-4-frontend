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
        <Card className="info-card">
          <Card.Body className="info-card-body">
            <div className="info-card-count">
              {count}
            </div>
            <div className="info-card-title">
              {title}
            </div>
          </Card.Body>
        </Card>
    );
};

export default InfoCard;
