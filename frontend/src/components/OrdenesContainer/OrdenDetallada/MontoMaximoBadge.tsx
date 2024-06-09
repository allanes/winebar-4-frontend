import React, { useState } from 'react';
import { Badge, FormControl, Button, InputGroup } from 'react-bootstrap';
import { OrdenesService } from '../../../codegen_output';
import Swal from 'sweetalert2';

interface MontoMaximoBadgeProps {
  id: number;
  label: string;
  field: 'monto_maximo_orden' | 'monto_maximo_pedido';
  initialValue: number;
}

const MontoMaximoBadge: React.FC<MontoMaximoBadgeProps> = ({ id, label, field, initialValue }) => {
  const [value, setValue] = useState<string>(initialValue.toLocaleString('es-ES', { minimumFractionDigits: 0 }));
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
    <Badge bg="secondary" className="p-2" onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }}>
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
        <span>{label}: ${value}</span>
      )}
    </Badge>
  );
};

export default MontoMaximoBadge;
