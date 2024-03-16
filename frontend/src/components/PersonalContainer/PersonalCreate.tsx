import React, { useRef } from 'react'
import { PersonalInterno, PersonalInternoCreate } from '../../codegen_output'
import useNewPersonalInternoForm from '../../hooks/useNewPersonalForm'
import CustomFormField from './CustomFormField'

import { Row, Col, Button, Form } from 'react-bootstrap'

import Swal from 'sweetalert2'

interface Props {
  onNewPersonal: (newPersonalInterno: PersonalInternoCreate, tarjetaId: number) => void
}

export const PersonalesCreate = ({ onNewPersonal: onNewPersonalInterno }: Props) => {

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

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(inputValues);
    if ('tarjetaId' in inputValues) {
      const { tarjetaId, ...personalInternoData } = inputValues;
      onNewPersonalInterno(personalInternoData, Number(tarjetaId));
    } else {
      console.error('tarjetaId is missing');
    }
    formRef.current?.reset();
  };

  return (
    <div className="table-container-xl mb-4">
      <div className="table-container-l text-center mb-5">
        <p className="h3">Nuevo Personal Interno</p>
      </div>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Row>
          <Col>
            <CustomFormField
              id="id"
              label="Documento de identidad (*)"
              type="number"
              placeholder="Ingrese el DNI"
              onChange={handleChange}
              required
              value={inputValues.id}
            />
          </Col>
          <Col>
            <CustomFormField
              id="nombre"
              label="Nombre (*)"
              type="text"
              placeholder="Ingrese el nombre"
              onChange={handleChange}
              required
              value={inputValues.nombre}
            />
          </Col>
          <Col>
            <CustomFormField
              id="apellido"
              label="Apellido (*)"
              type="text"
              placeholder="Ingrese el apellido"
              onChange={handleChange}
              required
              value={inputValues.apellido}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CustomFormField
              id="telefono"
              label="Teléfono"
              type="text"
              placeholder="Ingrese el teléfono"
              onChange={handleChange}
              value={inputValues.telefono || ''}
            />
          </Col>
          <Col>
            <CustomFormField
              id="tarjetaId"
              label="ID de Tarjeta"
              type="number"
              placeholder="Haga clic aquí y acerque la tarjeta al lector"
              onChange={handleChange}
              value={inputValues.tarjetaId || ''}
              required
            />
          </Col>
        </Row>

        <Button variant="outline-warning" type="reset" className="m-2">
          Borrar
        </Button>

        <Button type="submit" className="m-2">
          Dar de alta
        </Button>
      </Form>
    </div>
  );
};