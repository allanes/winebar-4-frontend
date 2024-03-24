import React, { useState } from 'react';
import { Tarjeta, TarjetasService, ApiError } from '../../codegen_output';
import { Form, Col, Row } from 'react-bootstrap';
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
    <Row className='mb-3'>
        <Col xs={2}>
            <Form.Label>{label}</Form.Label>
        </Col>
        <Col xs={5}>
            <div className="d-flex align-items-center mb-2">
                <Form.Control
                    id={id}
                    type="text"
                    placeholder={placeholder}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    required={required}
                    value={value}
                />        
            </div>
        </Col>
        <Col xs={4} className='mt-1 text-start'>
            {tarjeta && (
                <RolBadge 
                  key={tarjeta.rol.id} 
                  roleName={tarjeta.rol.nombre_corto} 
                />
            )}
            {errorMessage && 
                <>
                    <XCircleFill className="text-danger ml-2" />
                    <Form.Text className="text-danger">{errorMessage}</Form.Text>
                </>
            }
        </Col>
    </Row>
  );
};

export default TarjetaInputField;