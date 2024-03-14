// src/components/RoleBadge/RoleBadge.tsx

import React from 'react';
import Badge from 'react-bootstrap/Badge';

interface RolBadgeProps {
  roleId: number;
  roleName: string;
}

const badgeColors: { [key: number]: string } = {
  1: "primary",   // ADMIN
  2: "success",   // EMPLEADO_CAJERO
  3: "info",      // EMPLEADO_TAPERO
  4: "warning",   // CLIENTE_ESTANDAR
  5: "danger",    // CLIENTE_VIP
  6: "dark"       // CLIENTE_GRUPAL
};

export const RolBadge = ({ roleId, roleName }: RolBadgeProps) => {
  const badgeColor = badgeColors[roleId] || 'secondary';
    console.log(`color: ${badgeColor}`)
  return (
    <h5>
        <Badge pill bg={badgeColor}>
            {roleName}
        </Badge>
    </h5>
  );
};
