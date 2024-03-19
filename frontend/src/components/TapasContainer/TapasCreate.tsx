import React, { useRef, useState } from 'react'
import { Tapa, TapaConProductoCreate } from '../../codegen_output'
import useNewTapasForm from '../../hooks/useNewTapasForm'

import { Row, Col, Button, Form } from 'react-bootstrap'
import CustomFormField from '../PersonalContainer/CustomFormField'

import Swal from 'sweetalert2'

interface Props {
  onNewTapa: (
    newTapa: TapaConProductoCreate,
    fotoFile: File | null) => void
}

export const TapasCreate = ({ onNewTapa }: Props) => {
  const [inputValues, dispatch] = useNewTapasForm()
  const [fotoFile, setFotoFile] = useState<File | null>(null);
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

  const handleFotoChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files && evt.target.files[0];
    setFotoFile(file || null);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onNewTapa(inputValues, fotoFile);
    formRef.current?.reset();
    setFotoFile(null);
  };

  return (
    <div className="table-container-s mb-4">
          <Form ref={formRef} onSubmit={handleSubmit}>
            <CustomFormField
              id="titulo"
              label="Títutlo"
              type="string"
              placeholder="Titulo"
              onChange={handleChange}
              value={inputValues.titulo || ''}
              required
            />          
            <CustomFormField
              id="precio"
              label="Precio"
              type="number"
              placeholder="Ingrese el precio"
              onChange={handleChange}
              value={inputValues.precio || ''}
              required
            />          
            <CustomFormField
              id="stock"
              label="Stock"
              type="number"
              placeholder="0"
              onChange={handleChange}
              value={inputValues.stock || ''}                  
            />          
            <CustomFormField
              id="descripcion"
              label="Descripción"
              type="string"
              placeholder="Ingrese la Descripción"
              onChange={handleChange}
              value={inputValues.descripcion || ''}                  
            />          
            <Row>
              <Col xs={2}>
                <Form.Label>Foto</Form.Label>
              </Col>
              <Col xs={7}>
                <Form.Control type="file" onChange={handleFotoChange}/>
              </Col>
            </Row>

            <div className="d-flex justify-content-center">
              <Button type="submit" className="m-4" size='lg'>
                Dar de alta
              </Button>
            </div>
          </Form>
        </div>
      )
    }