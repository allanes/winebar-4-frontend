// AccionesPanel.tsx
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import ClientsCreateModal from '../../ClientsContainer/ClientsCreateModal';
import { CurrencyDollar } from 'react-bootstrap-icons';
import PanelCobroOrden from './PanelCobroOrdenOverview';
import copaImage from '../../../assets/icons/copa.png';

interface AccionesPanelProps {
  onReloadStatus: () => void;
}

const AccionesPanel: React.FC<AccionesPanelProps> = ({ onReloadStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPanelCobro, setShowPanelCobro] = useState(false);

  const handleShow = () => setShowModal(true);
  
  const handleClose = () => {
    setShowPanelCobro(false);
    setShowModal(false);
    onReloadStatus();
  };

//   const handleClosePanelCobro = () => {
//     setShowPanelCobro(false);
//     onReloadStatus(); // Reload when modal is closed
//   };

  const handleAbrirPanelCobro = () => {
    setShowPanelCobro(true);
  };

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
                onClientAdded={handleClose}
                expanded={true}
            />            
        </div>

        <PanelCobroOrden
            show={showPanelCobro}
            onHide={handleClose}
        />
    </Card>
  );
};

export default AccionesPanel;
