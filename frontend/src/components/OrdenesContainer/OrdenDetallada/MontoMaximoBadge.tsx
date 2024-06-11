import React, { useState, KeyboardEvent, useEffect, useRef } from 'react';
import { Badge, FormControl, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { OrdenesService } from '../../../codegen_output';
import Swal from 'sweetalert2';
import { ArrowClockwise, ArrowRightSquare } from 'react-bootstrap-icons';

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
  const ref = useRef<HTMLDivElement>(null);  // Ref to help detect clicks outside the component

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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);  // Cancel editing on escape key
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsEditing(false);  // Close if clicking outside of the component
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <Row ref={ref}>
      <Col md={11}>
        <Badge
          bg="secondary"
          className="p-2 monto-maximo-badge"
          onClick={() => !isEditing && setIsEditing(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ width: '100%', padding: '6px 12px' }}
        >
          {isEditing ? (
            <InputGroup>
              <FormControl
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                autoFocus
                style={{ height: '30px', fontSize: '14px' }}
              />
              <Button variant="outline-dark" onClick={handleSave} style={{ padding: '0 6px' }}>
                <ArrowRightSquare size={20} />
              </Button>
            </InputGroup>
          ) : (
            <>
              {isHovered ? 
                <Row><ArrowClockwise className="ms-2 boton-refresh-status" /></Row>
              :
                <Col>
                  <Row className='ms-3 text-center'>
                    ${value}
                  </Row>
                  <Row className='ms-3 text-center'>
                    {label}
                  </Row>
                </Col>
              }
            </>
          )}
        </Badge>
      </Col>
    </Row>
  );
};

export default MontoMaximoBadge;
