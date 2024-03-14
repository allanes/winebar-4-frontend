import React, { useRef } from 'react'
import { Tarjeta, TarjetaCreate } from '../../codegen_output'
import useNewTarjetasForm from '../../hooks/useNewTarjetasForm'
import { RolesDropdown } from '../RolesContainer/RolesList'
import { Row, Col, Button, Form, Accordion } from 'react-bootstrap'

import Swal from 'sweetalert2'

interface Props {
  onNewTarjeta: (newTarjeta: TarjetaCreate) => void;
  expanded?: boolean;
}

export const TarjetasCreate = ({ onNewTarjeta: onNewTarjetaPropIn, expanded = false }: Props) => {

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

  const handleRoleSelect = (selectedRoleId: number, selectedRoleName: string) => {
    dispatch({
      type: "change_value",
      payload: {
        inputName: 'rol_nombre',
        inputValue: selectedRoleName
      }
    });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (!inputValues.raw_rfid) {
      return
    }
    onNewTarjetaPropIn(inputValues)
    formRef.current?.reset()
  }

  // Use the expanded prop to set the defaultActiveKey of the Accordion
  const defaultActiveKey = expanded ? '0' : undefined;

  return (
    // <div className='table-container-xl mb-4'>
    //   <div className='table-container-l text-center mb-5'>
    //     <p className='h3'>Nueva Tarjeta</p>
    //   </div>
    <Accordion defaultActiveKey={defaultActiveKey} className='table-container mb-4'>
      <Accordion.Item eventKey="0" className='table-container-l text-center mb-5'>
        <Accordion.Header className='text-center'><h3>Agregar Tarjeta</h3></Accordion.Header>
        <Accordion.Body>
          <Form ref={formRef} onSubmit={handleSubmit} >
          <Row>
              <Col>
                <Form.Group className="mb-3" controlId="rol_nombre">
                  <Form.Label>Rol</Form.Label>
                  <RolesDropdown onRoleSelect={handleRoleSelect} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="raw_rfid">
                  <Form.Label>ID de Tarjeta</Form.Label>
                  <Form.Control onChange={handleChange} type="number" placeholder="Acerque la tarjeta al lector" />
                </Form.Group>
              </Col>                    
            </Row>
            
            {/* <Button variant='outline-warning' type="reset" className="m-2">
              Borrar
            </Button>

            <Button type="submit" className="m-2">
              Dar de alta
            </Button> */}
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      {/* </div> */}
    </Accordion>
  )
}