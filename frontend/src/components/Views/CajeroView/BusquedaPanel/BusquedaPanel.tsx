// BusquedaPanel.tsx
import React, { useState } from 'react';
import { Button, Modal, Card, Form, Row, Col } from 'react-bootstrap';
import { handleApiError } from '../../../ClientsContainer/ClientsContainer';
import { OrdenesService, OrdenCompraDetallada } from '../../../../codegen_output';
import { OrdenesList } from '../../../OrdenesContainer/OrdenesListCard';
import { Search } from 'react-bootstrap-icons';

const BusquedaPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [matchingOrdenes, setMatchingOrders] = useState<OrdenCompraDetallada[]>([]);
  const [clientName, setClientName] = useState('');

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSearchClient = async (): Promise<void> => {
    try {
      const response = await OrdenesService.handleReadOrdenAbiertaByClientNameBackendApiV1OrdenesByNameClientNameGet(clientName);
      setMatchingOrders(response);
      setShowModal(true); // Show the modal with the results after fetching
    } catch (error) {
      handleApiError(error);      
    }
  };

  return (
    <Card className='transparent-card acciones-width'>
      <Card.Header>Buscar Cliente</Card.Header>
      <Card.Body>
        <Form>
            <Row >
                <Col>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese un nombre..."
                        value={clientName}
                        onChange={e => setClientName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Button variant="secondary" onClick={handleSearchClient} className='p-2'>
                        <Search size={20} className="" />
                    </Button>
                </Col>
            </Row>
        </Form>
      </Card.Body>

      <Modal show={showModal} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Ordenes Encontradas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrdenesList
            ordenesList={matchingOrdenes}
            onDeleteOrden={() => {}}
            columnasReducidas={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default BusquedaPanel;
