import React, { useRef } from 'react';
import { PersonalInterno, PersonalInternoCreate } from '../../codegen_output';
import useNewPersonalInternoForm from '../../hooks/useNewPersonalForm';
import TarjetaInputField from './TarjetaInputField';
import CustomFormField from './CustomFormField';
import { Row, Col, Button, Form, Accordion } from 'react-bootstrap';

interface Props {
  onNewPersonal: (newPersonalInterno: PersonalInternoCreate, tarjetaId: number) => void;
  expanded?: boolean;
}

export const PersonalesCreate = ({ onNewPersonal, expanded = false }: Props) => {
  const [inputValues, dispatch] = useNewPersonalInternoForm();
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = evt.target;

    dispatch({
      type: 'change_value',
      payload: {
        inputName: id,
        inputValue: value,
      },
    });
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(inputValues);
    if ('tarjetaId' in inputValues) {
      const { tarjetaId, ...personalInternoData } = inputValues;
      try {
        await onNewPersonal(personalInternoData, Number(tarjetaId));
        formRef.current?.reset();
      } catch (error) {
        console.error('Error creating personal interno:', error);
        // Handle the error silently without displaying any messages
      }
    } else {
      console.error('tarjetaId is missing');
    }
  };

  const defaultActiveKey = expanded ? '0' : undefined;

  return (
    <Accordion defaultActiveKey={defaultActiveKey} className='table-container-m mb-4'>
      <Accordion.Item eventKey="0" className='table-container-s text-center mb-3'>
        <Accordion.Header><h3>Agregar Cliente</h3></Accordion.Header>
        <Accordion.Body>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <TarjetaInputField
              id="tarjetaId"
              label="Tarjeta"
              placeholder="Haga clic aquí y acerque la tarjeta al lector"
              onChange={handleChange}
              value={inputValues.tarjetaId || ''}
              required
            />
            <CustomFormField
              id="id"
              label="Documento de identidad (*)"
              type="number"
              placeholder="Ingrese el DNI"
              onChange={handleChange}
              required
              value={inputValues.id}
            />
            <CustomFormField
              id="nombre"
              label="Nombre (*)"
              type="text"
              placeholder="Ingrese el nombre"
              onChange={handleChange}
              required
              value={inputValues.nombre}
            />
            <CustomFormField
              id="apellido"
              label="Apellido (*)"
              type="text"
              placeholder="Ingrese el apellido"
              onChange={handleChange}
              required
              value={inputValues.apellido}
            />
            <CustomFormField
              id="telefono"
              label="Teléfono"
              type="text"
              placeholder="Ingrese el teléfono"
              onChange={handleChange}
              value={inputValues.telefono || ''}
            />            
          
            <Button variant="outline-warning" type="reset" className="m-2">
              Borrar
            </Button>

            <Button type="submit" className="m-2">
              Dar de alta
            </Button>
        </Form>
      </Accordion.Body>      
    </Accordion.Item>
  </Accordion>
    
  );
};