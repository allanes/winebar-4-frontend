// src/components/RoleBadge/RoleBadge.tsx

import React from 'react';
import Badge from 'react-bootstrap/Badge';

interface BooleanBadgeProps {
  value: boolean
}

const booleanColors: { [key: number]: string } = {
  1: "primary",   // ADMIN
  2: "success",   // EMPLEADO_CAJERO
  3: "info",      // EMPLEADO_TAPERO
  4: "warning",   // CLIENTE_ESTANDAR
  5: "danger",    // CLIENTE_VIP
  6: "dark"       // CLIENTE_GRUPAL
};

export const BooleanBadge = ({ value }: BooleanBadgeProps) => {
  const badgeColor = value ? 'success' : 'secondary';
  const texto = value ? 'Si' : 'No';
    console.log(`color: ${badgeColor}`)
  return (
    <h5>
        <Badge bg={badgeColor}>
        {texto}
        </Badge>
    </h5>
  );
};
