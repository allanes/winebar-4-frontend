// InfoCard.tsx
import React from 'react';
import { Card } from 'react-bootstrap';

interface InfoCardProps {
  title: string;
  count: number | string | null;
  onClick?: () => void;
  clickable?: boolean;
}

const InfoCard = ({ title, count, onClick, clickable }: InfoCardProps) => {
  const formatCount = (count: number | string | null): string => {
    if (count === null || count === undefined) return "0";
    const cleanedCount = typeof count === 'string' ? count.replace(/[^\d.-]/g, '') : count;
    const number = Number(cleanedCount);
    if (isNaN(number)) return "0";
    const converted = number.toLocaleString('de-DE');
    if (typeof(count) === 'string' && count.startsWith('$')) {
      return `$${converted}`
    } else {
      return converted
    }
  };

  return (
    <Card className={`info-card ${clickable ? 'clickable' : ''}`} onClick={onClick}>
      <Card.Body className="info-card-body">
        <div className="info-card-count">
          {formatCount(count)}
        </div>
        <div className="info-card-title">
          {title}
        </div>
      </Card.Body>
    </Card>
  );
};

// New MiniInfoCard component
interface MiniInfoCardProps {
  title: string;
  count: number | string | null;
  imageSrc: string;
}

export const MiniInfoCard = ({ title, count, imageSrc }: MiniInfoCardProps) => {
  const formatCount = (count: number | string | null): string => {
    if (count === null || count === undefined) return "0";
    const cleanedCount = typeof count === 'string' ? count.replace(/[^\d.-]/g, '') : count;
    const number = Number(cleanedCount);
    if (isNaN(number)) return "0";
    const converted = number.toLocaleString('de-DE');
    if (typeof(count) === 'string' && count.startsWith('$')) {
      return `$${converted}`
    } else {
      return converted;
    }
  };

  return (
    <Card className='mini-info-card'>
      <Card.Body className='mini-info-card-body'>
        <div className='mini-info-card-image'>
          <img src={imageSrc} alt={`${title} icon`} />
        </div>
        <div className='mini-info-card-details'>
          <div className='mini-info-card-count'>
            {formatCount(count)}
          </div>
          <div className='mini-info-card-title'>
            {title}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
