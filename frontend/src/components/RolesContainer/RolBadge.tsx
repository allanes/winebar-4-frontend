import React from 'react';
import Badge from 'react-bootstrap/Badge';

interface RolBadgeProps {
  roleName: string;
}

const badgeColors: { [key: string]: string } = {
  ADMIN: "primary",
  EMPLEADO_CAJERO: "success",
  EMPLEADO_TAPERO: "info",
  CLIENTE_ESTANDAR: "warning",
  CLIENTE_VIP: "danger",
  CLIENTE_GRUPAL: "dark"
};

export const RolBadge: React.FC<RolBadgeProps> = ({ roleName }) => {
  const badgeColor = badgeColors[roleName] || 'secondary';
  return (
    <h5>
      <Badge pill bg={badgeColor}>
        {roleName}
      </Badge>
    </h5>
  );
};