import React, { useRef } from 'react'
import { Tapa, TapaConProductoCreate } from '../../codegen_output'
import useNewTapasForm from '../../hooks/useNewTapasForm'

import { Row, Col, Button, Form } from 'react-bootstrap'
import TarjetaInputField from '../PersonalContainer/TarjetaInputField'

import Swal from 'sweetalert2'

interface Props {
  onNewTapa: (newTapa: TapaConProductoCreate) => void
}

export const TapasCreate = ({ onNewTapa }: Props) => {

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
    onNewTapa(inputValues)
    formRef.current?.reset()
  }

  return (
    <div className="table-container-s mb-4">
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <TarjetaInputField
                  id="titulo"
                  label="Títutlo"
                  placeholder="Titulo"
                  onChange={handleChange}
                  value={inputValues.titulo || ''}
                  required
                />          
                <TarjetaInputField
                  id="precio"
                  label="Precio"
                  placeholder="Ingrese el precio"
                  onChange={handleChange}
                  value={inputValues.precio || ''}
                  required
                />          
                <TarjetaInputField
                  id="stock"
                  label="Stock"
                  placeholder="0"
                  onChange={handleChange}
                  value={inputValues.stock || ''}                  
                />          
                <TarjetaInputField
                  id="descripcion"
                  label="Descripción"
                  placeholder="Ingrese la Descripción"
                  onChange={handleChange}
                  value={inputValues.descripcion || ''}                  
                />          
                <TarjetaInputField
                  id="foto"
                  label="Foto"
                  placeholder="Ruta a la foto"
                  onChange={handleChange}
                  value={inputValues.foto || ''}                  
                />
              </Col>          
            </Row>

            <div className="d-flex justify-content-center">
              <Button variant='outline-warning' type="reset" className="m-2">
                Borrar
              </Button>

              <Button type="submit" className="m-2">
                Dar de alta
              </Button>
            </div>
          </Form>
        </div>
      )
    }