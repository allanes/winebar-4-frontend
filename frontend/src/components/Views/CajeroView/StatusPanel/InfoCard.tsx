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
      // Remove non-numeric characters except for decimal points
      const cleanedCount = typeof count === 'string' ? count.replace(/[^\d.-]/g, '') : count;
      const number = Number(cleanedCount); // Use Number for better handling of floats and cleaned strings
      if (isNaN(number)) return "0";
      const converted = number.toLocaleString('de-DE'); // Adjust locale as needed for correct thousand separator
      if (typeof(count) === 'string' && count.startsWith('$')) {
        return `$${converted}`
      } else {
        return converted
      }
  };

  console.log("Formatted number:", formatCount(count)); // Debugging line to see the formatted output

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



export default InfoCard;
