import React from 'react';
import { OrdenCompraDetallada, OrdenesService } from '../../codegen_output';
import { Card, Col, Row, Form, Modal } from 'react-bootstrap';
import { OrdenesListBase } from './OrdenesListBase';

interface Props {
  ordenesList: Array<OrdenCompraDetallada>;
  onDeleteOrden: (id: number) => void;
  columnasReducidas?: boolean;
  onChangeOrdenesGetToggle?: (checked: boolean) => void;
  ordenCobradaTrigger?: () => void;
}

export const OrdenesList = ({
  ordenesList,
  onDeleteOrden,
  columnasReducidas = false,
  onChangeOrdenesGetToggle,
  ordenCobradaTrigger
}: Props) => {

  return (
    <Card className="mb-4 transparent-card">
      <Card.Header className='table-container-title'>
        <Row className='align-items-center'>
          <Col md={5} >
            {onChangeOrdenesGetToggle && (
              <Form.Check 
                type="switch"
                id="ordenes-get-toggle"
                label="Solo del turno abierto"
                defaultChecked
                className="form-check-warning"
                onChange={(e) => onChangeOrdenesGetToggle!(e.target.checked)}
              />
            )}
          </Col>
          <Col  className='text-start'>
            <h3>
              Lista de Ordenes
            </h3>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <OrdenesListBase 
          ordenesList={ordenesList} 
          onDeleteOrden={onDeleteOrden}
          columnasReducidas={columnasReducidas}
          ordenCobradaTrigger={ordenCobradaTrigger}
        />
      </Card.Body>
    </Card>
  );
};
