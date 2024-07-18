// FudoContainer.tsx
import React, { useState } from 'react';
import ListadoMesas from './ListadoMesas';
import DetallesMesa from './DetallesMesa';
import { FudoService, MesaFudoCustom, OrdenCompraDetallada, OrdenCompraInfoPago } from '../../codegen_output';
import { Modal } from 'react-bootstrap';

interface PanelFudoProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (infoPago: OrdenCompraInfoPago) => void;
  ordenData: OrdenCompraDetallada;
}

function FudoContainer({ show, onHide, onSubmit, ordenData }: PanelFudoProps) {
  const [selectedMesa, setSelectedMesa] = useState<MesaFudoCustom | null>(null);
  const [refreshListado, setRefreshListado] = useState(false);

  const refreshListadoMesas = () => {
    setRefreshListado(prev => !prev); // Toggles the state to trigger a re-render
  };

  const handleSelectMesa = (mesa: MesaFudoCustom) => {
    setSelectedMesa(mesa);
  };

  return (
    <Modal show={show} onHide={onHide} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Exportación a FUDO - {ordenData.nombre_cliente}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <h4 className="mb-4">Elegir mesa y venta de Fudo</h4>
          <div className="row">
            <div className="col-md-6">
              <ListadoMesas 
                onSelectMesa={handleSelectMesa} 
                refreshTrigger={refreshListado}
              />
            </div>
            <div className="col-md-6">
              {selectedMesa && 
                <DetallesMesa 
                  mesaFudoId={selectedMesa.id} 
                  onRefreshListado={refreshListadoMesas}
                  onSubmit={onSubmit}
                />
              }
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default FudoContainer;