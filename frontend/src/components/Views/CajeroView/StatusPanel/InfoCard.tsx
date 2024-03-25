// InfoCard.tsx
import React from 'react';
import { Card } from 'react-bootstrap';
// import './styles/components/_cajeroView.scss'; // Path to your SCSS file

interface InfoCardProps {
  title: string;
  count: number | string | null;
  onClick?: () => void;
  clickable?: boolean;
}

const InfoCard = ({ title, count, onClick, clickable }: InfoCardProps) => {
    return (
        <Card className={`info-card ${clickable ? 'clickable' : ''}`} onClick={onClick}>
          <Card.Body className="info-card-body">
            <div className="info-card-count">
              {count ? count : 0}
            </div>
            <div className="info-card-title">
              {title}
            </div>
          </Card.Body>
        </Card>
    );
};

export default InfoCard;
