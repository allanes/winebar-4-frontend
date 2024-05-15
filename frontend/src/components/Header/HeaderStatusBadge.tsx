import React from 'react';
import { Badge } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

interface HeaderStatusBadgeProps {
  status: boolean;
  label: string;
}

export const HeaderStatusBadgeTapero: React.FC<HeaderStatusBadgeProps> = ({ status, label}) => {
  return (
    <Badge bg="light" text="dark" className="status-badge-tapero">
      {status ? (
        <CheckCircleFill size={20} className="text-success" />
      ) : (
        <XCircleFill size={20} className="text-danger" />
      )}
      <span className="badge-label-tapero">{` ${label}`}</span>
    </Badge>
  );
};

export const HeaderStatusBadgeClassic: React.FC<HeaderStatusBadgeProps> = ({ status, label }) => {
  return (
    <Badge className="status-badge">
      {status ? (
        <CheckCircleFill size={13} className="text-success" />
      ) : (
        <XCircleFill size={13} className="text-danger" />
      )}
      <span className="badge-label">{` ${label}`}</span>
    </Badge>
  );
};
