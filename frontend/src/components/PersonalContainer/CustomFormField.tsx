import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

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

  const isInvalid = required && touched && (value === '' || value === 0);

  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
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
    </Form.Group>
  );
};

export default CustomFormField;