import React, { useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';

interface CustomFormFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: string | number;
}

const CustomFormField: React.FC<CustomFormFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  onChange,
  required = false,
  value,
}) => {
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  const isInvalid = required && touched && (value === '' || value === 0);

  return (
    <Row className='mb-3'>
        <Col xs={2}>
            <Form.Label>{label}</Form.Label>
        </Col>
        <Col xs={5}>
            <Form.Control
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={handleBlur}
                isInvalid={isInvalid || (submitted && isInvalid)}
                required={required}
                value={value}
            />
        
            <Form.Control.Feedback type="invalid">
                Este campo es obligatorio.
            </Form.Control.Feedback>
        </Col>
        
    </Row>
  );
};

export default CustomFormField;