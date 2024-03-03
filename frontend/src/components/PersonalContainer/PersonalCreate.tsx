import React, { useRef } from 'react'
import { PersonalInterno, PersonalInternoCreate } from '../../codegen_output'
import useNewPersonalInternoForm from '../../hooks/useNewPersonalForm'

import { Row, Col, Button, Form } from 'react-bootstrap'

import Swal from 'sweetalert2'

interface Props {
  onNewPersonal: (newPersonalInterno: PersonalInternoCreate, tarjetaId: number) => void
}

export const PersonalesCreate = ({ onNewPersonal: onNewPersonalInterno }: Props) => {

  const [inputValues, dispatch] = useNewPersonalInternoForm()
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = evt.target

    dispatch({
      type: "change_value",
      payload: {
        inputName: id,
        inputValue: value
      }
    })
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    console.log(inputValues)
    if ('tarjetaId' in inputValues) {
      const { tarjetaId, ...personalInternoData } = inputValues;
      onNewPersonalInterno(personalInternoData, Number(tarjetaId));
    } else {
      console.error('tarjetaId is missing');
    }
    formRef.current?.reset();
  }

  return (
    <div className='table-container-xl mb-4'>
      <div className='table-container-l text-center mb-5'>
        <p className='h3'>Nuevo Personal Interno</p>
      </div>
      <Form ref={formRef} onSubmit={handleSubmit} >
      <Row>
          <Col>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>Documento de identidad</Form.Label>
              <Form.Control onChange={handleChange} type="number" placeholder="Ingrese el DNI" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control onChange={handleChange} type="text" placeholder="Ingrese el nombre" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control onChange={handleChange} type="text" placeholder="Ingrese el apellido" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {/* <Col>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={handleChange} type="text" placeholder="Ingrese el email" />
            </Form.Group>
          </Col> */}
          <Col>
            <Form.Group className="mb-3" controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control onChange={handleChange} type="text" placeholder="Ingrese el teléfono" />
            </Form.Group>
          </Col>
          
          <Col>
           <Form.Group className="mb-3" controlId="tarjetaId">
             <Form.Label>ID de Tarjeta</Form.Label>
             <Form.Control onChange={handleChange} type="number" placeholder="Acerque la tarjeta al lector" />
           </Form.Group>
         </Col>
        </Row> 

        <Button variant='outline-warning' type="reset" className="m-2">
          Borrar
        </Button>

        <Button type="submit" className="m-2">
          Dar de alta
        </Button>
      </Form>
    </div>
  )
}