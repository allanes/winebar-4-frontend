import React, { useState, useRef } from 'react';
import { ClienteCreate } from '../../codegen_output';
import CardReaderModal from './CardReaderModal';
import useNewClientForm from '../../hooks/useNewClientsForm';
import { Row, Col, Button, Form } from 'react-bootstrap';
import CustomFormField from '../PersonalContainer/CustomFormField';
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
    <div className="table-container-s mb-4">
      <Form ref={formRef} onSubmit={handleContinue}>
        <CustomFormField
          id="nombre"
          label="Nombre"
          type="string"
          placeholder="Ingrese el Nombre"
          onChange={handleChange}
          value={inputValues.nombre}
          required
        />             
        
        <div className="d-flex justify-content-center">
          <Button type="submit" className="m-4" size='lg'>
            Dar de alta
          </Button>
        </div>
      </Form>

      <CardReaderModal 
        show={showCardReader} 
        onHide={() => setShowCardReader(false)}
        onCardRead={handleCardRead}
      />      
    </div>
  );
};

export default ClientsCreate;
