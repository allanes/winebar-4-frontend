// src/components/RolesDropdown/RolesDropdown.tsx

import React, { useEffect, useState } from 'react';
import { Rol, RolesService, ApiError } from '../../codegen_output';
import { Form } from 'react-bootstrap';

interface Props {
  onRoleSelect: (selectedRoleId: number, selectedRoleName: string) => void;
}

export const RolesDropdown = ({ onRoleSelect }: Props) => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [selectedRole, setSelectedRole] = useState<number>();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    RolesService.readRolesBackendApiV1RolesGet()
      .then((fetchedRoles) => {
        setRoles(fetchedRoles);
        if (fetchedRoles.length > 0) {
          setSelectedRole(fetchedRoles[3].id);
          onRoleSelect(fetchedRoles[3].id, fetchedRoles[3].nombre_largo);
        }
      })
      .catch((error: unknown) => {
        const err = error as ApiError;
        console.error('Error fetching roles:', err.body?.detail || 'Unknown error');
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    const selectedRole = roles.find(role => role.id === selectedId);
    setSelectedRole(selectedId);
    if (selectedRole) {
      onRoleSelect(selectedId, selectedRole.nombre_largo);
    }
  };

  return (
    <Form.Select aria-label="Elegir Rol" onChange={handleChange} value={selectedRole}>
      {roles.map(role => (
        <option key={role.id} value={role.id}>
           {role.nombre_largo}
        </option>
        // <RolBadge key={role.id} roleId={role.id} roleName={role.nombre_corto} />
      ))}
    </Form.Select>
  );
};
