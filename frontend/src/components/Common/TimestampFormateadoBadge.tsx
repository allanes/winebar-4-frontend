import React from 'react';
import Badge from 'react-bootstrap/Badge';

interface FormattedTimestampProps {
  timestamp: string;
  variantToRender?: string;
}

const TimestampFormateadoBadge: React.FC<FormattedTimestampProps> = ({ timestamp, variantToRender = 'secondary' }) => {
  const date = new Date(timestamp);
  const now = new Date();

  const isSameDate = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

  const formattedTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });

  const formattedTimestamp = isSameDate
    ? formattedTime
    : `${formattedTime} (${date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })})`;

  return (
    <Badge pill bg={variantToRender}>
      {formattedTimestamp}
    </Badge>
  );
};

export default TimestampFormateadoBadge;