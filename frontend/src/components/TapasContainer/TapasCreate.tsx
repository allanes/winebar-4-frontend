import React, { useRef } from 'react'
import { Tapa, TapaConProductoCreate } from '../../codegen_output'
import useNewTapasForm from '../../hooks/useNewTapasForm'

import { Row, Col, Button, Form } from 'react-bootstrap'

import Swal from 'sweetalert2'

interface Props {
  onNewTapa: (newTapa: TapaConProductoCreate) => void
}

export const TapasCreate = ({ onNewTapa: onNewTapaPropIn }: Props) => {

  const [inputValues, dispatch] = useNewTapasForm()
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
    onNewTapaPropIn(inputValues)
    formRef.current?.reset()
  }

  return (
    <div className='table-container-xl mb-4'>
      <div className='table-container-l text-center mb-5'>
        <p className='h3'>Nueva Tapa</p>
      </div>
      <Form ref={formRef} onSubmit={handleSubmit} >
      <Row>
          <Col>
            <Form.Group className="mb-3" controlId="titulo">
              <Form.Label>Títutlo</Form.Label>
              <Form.Control onChange={handleChange} type="text" placeholder="Titulo" />
            </Form.Group>
          </Col>          
          <Col>
            <Form.Group className="mb-3" controlId="precio">
              <Form.Label>Precio</Form.Label>
              <Form.Control onChange={handleChange} type="float" placeholder="Ingrese el precio" />
            </Form.Group>
          </Col>          
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control onChange={handleChange} type="number" placeholder="0" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control onChange={handleChange} type="text" placeholder="Ingrese la Descripción" />
            </Form.Group>
          </Col>                    
          <Col>
            <Form.Group className="mb-3" controlId="foto">
              <Form.Label>Foto</Form.Label>
              <Form.Control onChange={handleChange} type="text" placeholder="Ruta a la foto" />
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