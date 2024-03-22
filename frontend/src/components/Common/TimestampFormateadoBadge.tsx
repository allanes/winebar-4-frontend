import React from 'react';
import Badge from 'react-bootstrap/Badge';

interface FormattedTimestampProps {
  timestamp: string;
  variantToRender?: string;
}

const FORMAT = 'HH:mm';
const FORMAT_WITH_DAY = 'HH:mm (dd)';

const TimestampFormateadoBadge: React.FC<FormattedTimestampProps> = ({ timestamp, variantToRender = 'secondary' }) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInDays = Math.ceil((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
  const formattedDate = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formattedDateWithDay = date.toLocaleDateString('es-ES', { day: 'numeric' });
  const formattedTimestamp = diffInDays === 0
    ? formattedDate
    : diffInDays === 1
      ? `${formattedDate} (Ayer)`
      : `${formattedDate} (Hace ${diffInDays} días)`;
  return (
    <Badge pill bg={variantToRender}>
      {formattedTimestamp}
    </Badge>
  );
};

export default TimestampFormateadoBadge;