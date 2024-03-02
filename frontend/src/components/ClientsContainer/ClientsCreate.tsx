import React, { useRef } from 'react'
import { Cliente, ClienteCreate } from '../../codegen_output'
import useNewClientForm from '../../hooks/useNewClientsForm'

import { Row, Col, Button, Form } from 'react-bootstrap'

import Swal from 'sweetalert2'

interface Props {
  onNewClient: (newClient: ClienteCreate, tarjetaId: number) => void
}

export const ClientsCreate = ({ onNewClient: onNewClient }: Props) => {

  const [inputValues, dispatch] = useNewClientForm()
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
      const { tarjetaId, ...clientData } = inputValues;
      onNewClient(clientData, Number(tarjetaId));
    } else {
      console.error('tarjetaId is missing');
    }
    formRef.current?.reset();
  }

  return (
    <div className='table-container-xl mb-4'>
      <div className='table-container-l text-center mb-5'>
        <p className='h3'>Nuevo Cliente</p>
      </div>
      <Form ref={formRef} onSubmit={handleSubmit} >
        <Row>
          {/* <Col>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>Documento de identidad</Form.Label>
              <Form.Control onChange={handleChange} type="number" placeholder="Ingrese el DNI" />
            </Form.Group>
          </Col> */}
          <Col>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control onChange={handleChange} type="text" placeholder="Ingrese el nombre" />
            </Form.Group>
          </Col>
          {/* <Col>
            <Form.Group className="mb-3" controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control onChange={handleChange} type="text" placeholder="Ingrese el apellido" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="fecha_nacimiento">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control onChange={handleChange} type="date" placeholder="Ingrese la fecha nacimiento" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={handleChange} type="text" placeholder="Ingrese el email" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control onChange={handleChange} type="text" placeholder="Ingrese el teléfono" />
            </Form.Group>
          </Col> */}
          <Col>
           <Form.Group className="mb-3" controlId="tarjetaId">
             <Form.Label>ID de Tarjeta</Form.Label>
             <Form.Control onChange={handleChange} type="number" placeholder="Ingrese el ID de la tarjeta" />
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