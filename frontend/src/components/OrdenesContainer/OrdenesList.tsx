import React, { useState } from 'react';
import { OrdenCompraDetallada } from '../../codegen_output';
import { Card, Col, Row, Form, Modal } from 'react-bootstrap';
import OrdenView from './OrdenView';
import { OrdenesListBase } from './OrdenesListBase';

interface Props {
  ordenesList: Array<OrdenCompraDetallada>;
  onDeleteOrden: (id: number) => void;
  columnasReducidas?: boolean;
  onChangeOrdenesGetToggle?: (checked: boolean) => void;
}

export const OrdenesList = ({
  ordenesList,
  onDeleteOrden,
  columnasReducidas = false,
  onChangeOrdenesGetToggle,
}: Props) => {
  const [selectedOrden, setSelectedOrden] = useState<OrdenCompraDetallada | null>(null);
  const [showOrdenView, setShowOrdenView] = useState(false);

  const handleOrdenClick = async (ordenId: number) => {
    OrdenesService.handleReadOrdenByIdBackendApiV1OrdenesIdGet(
      ordenId
    ).then((ordenDetalladaResponse) => {
      setSelectedOrden(ordenDetalladaResponse);
      setShowOrdenView(true);
    })
    .catch(handleApiError)
  };

  const handleCloseOrdenView = () => {
    setSelectedOrden(null);
    setShowOrdenView(false);
  };

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
        />
      </Card.Body>
      <Modal show={showOrdenView} onHide={handleCloseOrdenView} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Detalle de Orden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrden && (
            <OrdenView 
              ordenData={selectedOrden} 
            />
          )}
        </Modal.Body>
      </Modal>
    </Card>
  );
};
