import React, { useState, useRef } from 'react';
import { ClienteCreate, DetallesAdicionalesForUI } from '../../codegen_output';
import CardReaderModal from './CardReaderModal';
import useNewClientForm from '../../hooks/useNewClientsForm';
import { Row, Col, Button, Form, Accordion } from 'react-bootstrap';
import CustomFormField from '../PersonalContainer/CustomFormField';
import Swal from 'sweetalert2';

interface Props {
  onNewClient: (newClient: ClienteCreate, tarjetaId: number, additionalDetails?: DetallesAdicionalesForUI) => void;
  expanded?: boolean;
}

export const ClientsCreate = ({ onNewClient, expanded = false }: Props) => {
  const [inputValues, dispatch] = useNewClientForm();
  const [additionalDetails, setAdditionalDetails] = useState<DetallesAdicionalesForUI>({});
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

  const handleAdditionalDetailsChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = evt.target;
    setAdditionalDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
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
      onNewClient(clientData, parseInt(tarjetaId, 10), additionalDetails);
    }
    formRef.current?.reset();
  };

  // Use the expanded prop to set the defaultActiveKey of the Accordion
  const defaultActiveKey = expanded ? undefined : '0';

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

        <Accordion defaultActiveKey={defaultActiveKey}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Detalles Adicionales</Accordion.Header>
            <Accordion.Body>
              <CustomFormField
                id="dni"
                label="DNI"
                type="number"
                placeholder="Ingrese el DNI"
                onChange={handleAdditionalDetailsChange}
                value={additionalDetails.dni || ''}
              />
              <CustomFormField
                id="apellido"
                label="Apellido"
                type="string"
                placeholder="Ingrese el Apellido"
                onChange={handleAdditionalDetailsChange}
                value={additionalDetails.apellido || ''}
              />
              <CustomFormField
                id="email"
                label="Email"
                type="email"
                placeholder="Ingrese el Email"
                onChange={handleAdditionalDetailsChange}
                value={additionalDetails.email || ''}
              />
              <CustomFormField
                id="teléfono"
                label="Teléfono"
                type="string"
                placeholder="Ingrese el Teléfono"
                onChange={handleAdditionalDetailsChange}
                value={additionalDetails['teléfono'] || ''}
              />
              <CustomFormField
                id="domicilio"
                label="Domicilio"
                type="string"
                placeholder="Ingrese el Domicilio"
                onChange={handleAdditionalDetailsChange}
                value={additionalDetails.domicilio || ''}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

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