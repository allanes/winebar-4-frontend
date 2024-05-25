// BusquedaPanel.tsx
import React, { useState } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import { handleApiError } from '../../../ClientsContainer/ClientsContainer';
import { ClientesService, ClienteCreate, OrdenesService, OrdenCompraDetallada } from '../../../../codegen_output';
import Swal from 'sweetalert2';
import copaImage from '../../../../assets/icons/copa.png'
import { OrdenesList } from '../../../OrdenesContainer/OrdenesListCard';

const BusquedaPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [matchingOrdenes, setMatchingOrders] = useState<OrdenCompraDetallada[]>([]);
  const [showPanelBusqueda, setShowPanelBusqueda] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSearchClient = async (clientName: string): Promise<void> => {
      
    try {
        const response = await OrdenesService.handleReadOrdenAbiertaByClientNameBackendApiV1OrdenesByNameClientNameGet(clientName);
        setMatchingOrders(response)
    } catch (error) {
        handleApiError(error)
    }
  };

  const handleClosePanelCobro = () => {
    setShowPanelBusqueda(false);
  };

  const handleAbrirPanelCobro = () => {
    setShowPanelBusqueda(true)
  }

  return (
    <Card className='transparent-card acciones-width'>
        <Card.Header>Buscar Cliente</Card.Header>
        <Card.Body>
            <div className="accionable" >
            <Button 
                className="accionable-button" // Apply the custom class
                onClick={handleShow}
            >
                    <div className="accionable--contenido">
                        <img src={copaImage} alt="Copa Icon" className="icon" />
                        <h3>Buscar Cliente</h3>
                    </div>
                </Button>
            </div>            
        </Card.Body>
    
        <Modal>
            <OrdenesList
                ordenesList={matchingOrdenes}
                onDeleteOrden={() => {}}
                columnasReducidas={true}
            />
        </Modal>
    </Card>
  );
};

export default BusquedaPanel;
