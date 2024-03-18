import React, { useState, useRef } from 'react';
import { ClienteCreate } from '../../codegen_output';
import CardReaderModal from './CardReaderModal';
import useNewClientForm from '../../hooks/useNewClientsForm';
import { Row, Col, Button, Form, Accordion, Modal, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

interface Props {
  onNewClient: (newClient: ClienteCreate, tarjetaId: number) => void;
  expanded?: boolean;
}

export const ClientsCreate = ({ onNewClient, expanded = false }: Props) => {
  const [inputValues, dispatch] = useNewClientForm();
  const [showCardReader, setShowCardReader] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [clientData, setClientData] = useState<ClienteCreate | null>(null);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = evt.target;
    dispatch({
      type: 'change_value',
      payload: {
        inputName: id,
        inputValue: value,
      },
    });
  };

  const handleContinue = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setClientData(inputValues); // Temporarily store the client data
    setShowCardReader(true); // Show card reader modal
  };

  const handleCardRead = (tarjetaId: string) => {
    setShowCardReader(false); // Hide card reader modal
    if (clientData) {
      // Parse the string to a number and continue with the client creation process
      onNewClient(clientData, parseInt(tarjetaId, 10));
    }
    formRef.current?.reset();
  };

  // Use the expanded prop to set the defaultActiveKey of the Accordion
  const defaultActiveKey = expanded ? '0' : undefined;

  return (
    <Accordion defaultActiveKey={defaultActiveKey} className='table-container-xl mb-4'>
      <Accordion.Item eventKey="0" className='table-container-l text-center mb-5'>
        <Accordion.Header><h3>Agregar Cliente</h3></Accordion.Header>
        <Accordion.Body>
          <Form ref={formRef} onSubmit={handleContinue}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control onChange={handleChange} type="text" placeholder="Ingrese el nombre" />
                </Form.Group>
              </Col>
              {/* Other fields */}
            </Row>

            <Button variant="outline-warning" type="reset" className="m-2">
              Borrar
            </Button>

            <Button type="submit" className="m-2">
              Continuar
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>

      <CardReaderModal 
        show={showCardReader} 
        onHide={() => setShowCardReader(false)}
        onCardRead={handleCardRead}
      />      
    </Accordion>
  );
};

export default ClientsCreate;
