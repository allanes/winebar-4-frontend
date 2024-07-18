// FooterOrdenAbierta.tsx
import React, { useState } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { Cash, BoxArrowUpRight } from 'react-bootstrap-icons';
import { OrdenCompraInfoPago, OrdenCompraDetallada } from '../../../codegen_output';
import PanelInfoPagoOrden from '../../Views/CajeroView/PanelInfoPagoOrden';
import FudoContainer from '../../FudoContainer/FudoContainer';
import exportacionFudoImage from '../../../assets/icons/icono-fudo.png';

interface FooterOrdenAbiertaProps {
  ordenData: OrdenCompraDetallada;
  openedPedidos: number;
  onCobrar: (ordenId: number, infoPago: OrdenCompraInfoPago) => void;
  ordenId: number;
}

const FooterOrdenAbierta: React.FC<FooterOrdenAbiertaProps> = ({ ordenData, openedPedidos, onCobrar, ordenId }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPanelInfoPago, setShowPanelInfoPago] = useState(false);
  const [showFudoContainer, setShowFudoContainer] = useState(false);

  const handleCobrar = () => {
    setShowModal(false);
    setShowPanelInfoPago(true);
  };

  const handleExportarFudo = () => {
    setShowModal(false);
    setShowFudoContainer(true);
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
          <Button variant="success" size="lg" onClick={() => setShowModal(true)}>
            Cobrar
          </Button>
        </Col>
        <Col md={4}>
          <Row className='boton-cobro-advertencia justify-content-start'>
            {openedPedidos > 0 && "Los pedidos abiertos seran borrados"}
          </Row>
        </Col>
      </Row>

      {/* <Modal show={show} onHide={onHide} centered size='lg'> */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccione una opción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="text-center">
              <Button variant="primary" size="lg" onClick={handleCobrar}>
                <Cash /> Cobrar Acá
              </Button>
            </Col>
            <Col className="text-center">
              <Button variant="secondary" size="lg" onClick={handleExportarFudo}>
                <img src={exportacionFudoImage} alt="" width={26}/> Exportar a Fudo
                {/* <BoxArrowUpRight /> Exportar a Fudo */}
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <PanelInfoPagoOrden
        show={showPanelInfoPago}
        onHide={() => setShowPanelInfoPago(false)}
        onSubmit={handleInfoPagoSubmit}
        ordenData={ordenData}
      />

      <FudoContainer
        show={showFudoContainer}
        onHide={() => setShowFudoContainer(false)}
        onSubmit={handleInfoPagoSubmit}
        ordenData={ordenData}
      />
    </>
  );
};

export default FooterOrdenAbierta;