import React, { useState } from 'react';
import { Tarjeta, TarjetasService, ApiError } from '../../codegen_output';
import { Form } from 'react-bootstrap';
import { RolBadge } from '../RolesContainer/RolBadge';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

interface TarjetaInputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: string | number;
}

const TarjetaInputField: React.FC<TarjetaInputFieldProps> = ({
  id,
  label,
  placeholder,
  onChange,
  required = false,
  value,
}) => {
  const [tarjeta, setTarjeta] = useState<Tarjeta | null>(null);
  const [checkPassed, setCheckPassed] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission

      try {
        const response = await TarjetasService.handleCheckPuedeSerEntregadaAPersonalBackendApiV1TarjetasPuedeSerEntregadaIdGet(Number(value));
        setTarjeta(response);
        setErrorMessage(null)
      } catch (error) {
        setTarjeta(null);
        const apiError = error as ApiError;
        setErrorMessage(apiError.body?.detail || 'An error occurred');
        console.error('Error fetching tarjeta:', error);
      }
    }
  };

  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <div className="d-flex align-items-center">
        <Form.Control
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          required={required}
          value={value}
        />        
      </div>
      
      {tarjeta && (
        <RolBadge key={tarjeta.rol.id} roleId={tarjeta.rol.id} roleName={tarjeta.rol.nombre_corto} />
      )}
      {errorMessage && 
      <>
        <XCircleFill className="text-danger ml-2" />
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
        </>
        }
    </Form.Group>
  );
};

export default TarjetaInputField;