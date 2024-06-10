import React, { useState } from 'react';
import { Badge, FormControl, Button, InputGroup, Row } from 'react-bootstrap';
import { OrdenesService } from '../../../codegen_output';
import Swal from 'sweetalert2';
import { ArrowClockwise } from 'react-bootstrap-icons'; // Importing the refresh icon

interface MontoMaximoBadgeProps {
  id: number;
  label: string;
  field: 'monto_maximo_orden' | 'monto_maximo_pedido';
  initialValue: number;
}

const MontoMaximoBadge: React.FC<MontoMaximoBadgeProps> = ({ id, label, field, initialValue }) => {
  const [value, setValue] = useState<string>(initialValue.toLocaleString('es-ES', { minimumFractionDigits: 0 }));
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/[^0-9]/g, '');
    setValue(parseInt(formattedValue, 10).toLocaleString('es-ES', { minimumFractionDigits: 0 }));
  };

  const handleSave = async () => {
    try {
      const updatedValue = parseInt(value.replace(/\./g, ''), 10);
      await OrdenesService.handleUpdateOrdenBackendApiV1OrdenesIdPut(id, { [field]: updatedValue });
      setIsEditing(false);
      Swal.fire('Actualizado', `El campo ${label} ha sido actualizado correctamente.`, 'success');
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar el campo.', 'error');
    }
  };

  return (
    <Row md={8}>
      <Badge
        bg="secondary"
        className="p-2 monto-maximo-badge"
        onClick={() => setIsEditing(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isEditing ? (
          <InputGroup>
            <FormControl
              type="text"
              value={value}
              onChange={handleChange}
              onBlur={handleSave}
              autoFocus
            />
            <Button variant="outline-secondary" onClick={handleSave}>Guardar</Button>
          </InputGroup>
        ) : (
          <>
            <>{label}: ${value}</>
            {isHovered && <ArrowClockwise className="ms-2 boton-refresh-status" />}
          </>
        )}
      </Badge>
    </Row>
  );
};

export default MontoMaximoBadge;
