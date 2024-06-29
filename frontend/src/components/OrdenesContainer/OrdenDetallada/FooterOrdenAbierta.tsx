// FooterOrdenAbierta.tsx
import React, { useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { OrdenCompraInfoPago, OrdenCompraDetallada } from '../../../codegen_output';
import PanelInfoPagoOrden from '../../Views/CajeroView/PanelInfoPagoOrden';
import FudoContainer from '../../FudoContainer/FudoContainer';

interface FooterOrdenAbiertaProps {
  ordenData: OrdenCompraDetallada;
  openedPedidos: number;
  onCobrar: (ordenId: number, infoPago: OrdenCompraInfoPago) => void;
  ordenId: number;
}

const FooterOrdenAbierta: React.FC<FooterOrdenAbiertaProps> = ({ ordenData, openedPedidos, onCobrar, ordenId }) => {
  const [showPanelInfoPago, setShowPanelInfoPago] = useState(false);

  const handleCobrar = () => {
    setShowPanelInfoPago(true);
  };

  const handleInfoPagoSubmit = (infoPago: OrdenCompraInfoPago) => {
    onCobrar(ordenId, infoPago);
    setShowPanelInfoPago(false);
  };

  return (
    <>
      <Row>
        <Col md={4} />
        <Col md={4} className='justify-content-center'>
          <Button variant="success" size="lg" onClick={handleCobrar}>
            Cobrar
          </Button>
        </Col>
        <Col md={4}>
          <Row className='boton-cobro-advertencia justify-content-start'>
            {openedPedidos > 0 && "Los pedidos abiertos seran borrados"}
          </Row>
        </Col>
      </Row>
      {/* <PanelInfoPagoOrden
        show={showPanelInfoPago}
        onHide={() => setShowPanelInfoPago(false)}
        onSubmit={handleInfoPagoSubmit}
        ordenData={ordenData}
      /> */}
      <FudoContainer
        show={showPanelInfoPago}
        onHide={() => setShowPanelInfoPago(false)}
        onSubmit={handleInfoPagoSubmit}
        ordenData={ordenData}
      />
    </>
  );
};

export default FooterOrdenAbierta;