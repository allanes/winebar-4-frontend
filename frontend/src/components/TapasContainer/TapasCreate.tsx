import React, { useRef } from 'react'
import { Tarjeta, TarjetaCreate } from '../../codegen_output'
import useNewTarjetasForm from '../../hooks/useNewTarjetasForm'

import { Row, Col, Button, Form } from 'react-bootstrap'

import Swal from 'sweetalert2'

interface Props {
  onNewTarjeta: (newTarjeta: TarjetaCreate) => void
}

export const TarjetasCreate = ({ onNewTarjeta: onNewTarjetaPropIn }: Props) => {

  const [inputValues, dispatch] = useNewTarjetasForm()
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
    onNewTarjetaPropIn(inputValues)
    formRef.current?.reset()
  }

  return (
    <div className='table-container-xl mb-4'>
      <div className='table-container-l text-center mb-5'>
        <p className='h3'>Nueva Tarjeta</p>
      </div>
      <Form ref={formRef} onSubmit={handleSubmit} >
      <Row>
          <Col>
            <Form.Group className="mb-3" controlId="raw_rfid">
              <Form.Label>ID de Tarjeta</Form.Label>
              <Form.Control onChange={handleChange} type="number" placeholder="Acerque la tarjeta al lector" />
            </Form.Group>
          </Col>          
          <Col>
            <Form.Group className="mb-3" controlId="rol_nombre">
              <Form.Label>Rol</Form.Label>
              <Form.Control onChange={handleChange} type="text" placeholder="Ingrese el nombre" />
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