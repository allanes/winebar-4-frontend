import React, { useState, useRef } from 'react';
import { ClienteCreate, DetallesAdicionalesForUI, ConfiguracionCreate } from '../../codegen_output';
import CardReaderModal from './CardReaderModal';
import useNewClientForm from '../../hooks/useNewClientsForm';
import { Button, Form, Accordion } from 'react-bootstrap';
import CustomFormField from '../PersonalContainer/CustomFormField';
import ConfiguracionMontosCard from '../ConfiguracionContainer/ConfiguracionMontosCard';

interface Props {
  onNewClient: (
    newClient: ClienteCreate, 
    tarjetaId: number, 
    additionalDetails?: DetallesAdicionalesForUI,
    maxAmounts?: ConfiguracionCreate
  ) => void;
  expanded?: boolean;
}

export const ClientsCreate = ({ onNewClient, expanded = false }: Props) => {
  const [inputValues, dispatch] = useNewClientForm();
  const [additionalDetails, setAdditionalDetails] = useState<DetallesAdicionalesForUI>({});
  const [showCardReader, setShowCardReader] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [clientData, setClientData] = useState<ClienteCreate | null>(null);
  const [maxAmounts, setMaxAmounts] = useState<ConfiguracionCreate>({
    monto_maximo_orden_def: 0,
    monto_maximo_pedido_def: 0
  });

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

  const handleMaxAmountsChange = (name: string, value: number) => {
    setMaxAmounts((prevAmounts) => ({
      ...prevAmounts,
      [name]: value.toString(),
    }));
  };

  const handleContinue = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setClientData(inputValues);
    setShowCardReader(true);
  };

  const handleCardRead = (tarjetaId: string) => {
    setShowCardReader(false);
    if (clientData) {
      onNewClient(clientData, parseInt(tarjetaId, 10), additionalDetails, maxAmounts);
    }
    formRef.current?.reset();
  };

  const defaultActiveKey = expanded ? undefined : '0';

  return (
    <div className="table-container-xs mb-4 form-background text-white">
      <Form ref={formRef} onSubmit={handleContinue} className='fully-transparent-card'>
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
          <Accordion.Item eventKey="0" className='fully-transparent-card'>
            <Accordion.Header>Detalles Adicionales</Accordion.Header>
            <Accordion.Body className='text-white'>
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

          <Accordion.Item eventKey="1" className='mt-2 fully-transparent-card'>
            <Accordion.Header>Montos máximos para este cliente</Accordion.Header>
            <Accordion.Body className='text-white'>
              <ConfiguracionMontosCard onChange={handleMaxAmountsChange} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="d-flex justify-content-center">
          <Button type="submit" className="m-4" size='lg' variant='dark'>
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
