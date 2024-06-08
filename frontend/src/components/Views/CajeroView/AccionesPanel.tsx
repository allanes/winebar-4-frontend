// AccionesPanel.tsx
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { handleApiError } from '../../ClientsContainer/ClientsContainer';
import ClientsCreateModal from '../../ClientsContainer/ClientsCreateModal';
import { ClienteCreate, ClientesService } from '../../../codegen_output';
import { CurrencyDollar } from 'react-bootstrap-icons';
import PanelCobroOrden from './PanelCobroOrdenOverview';
import Swal from 'sweetalert2';
import copaImage from '../../../assets/icons/copa.png'

const AccionesPanel = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [showPanelCobro, setShowPanelCobro] = useState(false);

  const handleNewClient = async (newClient: ClienteCreate, tarjetaId: number): Promise<void> => {
    try {
      const response = await ClientesService.handleCreateClienteWithTarjetaBackendApiV1ClientesPost(tarjetaId, { cliente_in: newClient });
      Swal.fire(`${newClient.nombre}`, 'ha sido guardado con éxito', 'success');      
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleClosePanelCobro = () => {
    setShowPanelCobro(false);
  };

  const handleAbrirPanelCobro = () => {
    setShowPanelCobro(true)
  }

  return (
    <Card className='transparent-card acciones-width'>
        <Card.Header>Acciones</Card.Header>
        <Card.Body>
            <div className="accionable" >
            <Button 
                className="accionable-button" // Apply the custom class
                onClick={handleShow}
            >
                    <div className="accionable--contenido">
                        <img src={copaImage} alt="Copa Icon" className="icon" />
                        <h3>Cliente Estandar</h3>
                    </div>
                </Button>
            </div>
            <div className="accionable" >
                <Button 
                    variant='dark'
                    className="accionable-button" // Apply the custom class
                    disabled={true}
                >
                    <div className="accionable--contenido">
                        <img src={copaImage} alt="Copa Icon" className="icon" />
                        <h3>Cliente VIP</h3>
                    </div>
                </Button>
            </div>
            <div className="accionable" >
                <Button 
                    variant='dark'
                    className="accionable-button" // Apply the custom class
                    disabled={true}
                >
                    <div className="accionable--contenido">
                        <img src={copaImage} alt="Copa Icon" className="icon" />
                        <h3>Cliente Grupal</h3>
                    </div>
                </Button>
            </div>
            <div className="accionable" >
                <Button 
                    className="accionable-button" // Apply the custom class
                    onClick={handleAbrirPanelCobro}
                >
                    <div className="accionable--contenido">
                        <CurrencyDollar className="icon"/>
                        <h3>Cobrar Tarjeta</h3>
                    </div>
                </Button>
            </div>
        </Card.Body>
    
        <div>
            <ClientsCreateModal
                show={showModal}
                onHide={handleClose}
                onNewClient={handleNewClient}
                expanded={true}
            />            
        </div>


        <PanelCobroOrden
            show={showPanelCobro}
            onHide={handleClosePanelCobro}
        />
    </Card>
  );
};

export default AccionesPanel;
