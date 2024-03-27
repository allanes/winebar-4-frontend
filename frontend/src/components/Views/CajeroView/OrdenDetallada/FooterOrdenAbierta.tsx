import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';

interface FooterOrdenAbiertaProps {
  openedPedidos: number;
  onCobrar?: () => void;
}

const FooterOrdenAbierta: React.FC<FooterOrdenAbiertaProps> = ({ openedPedidos, onCobrar }) => {
  const handleCobrar = () => {
    onCobrar?.();
  };
  
  return (
    <Row>
      <Col md={4} />
      <Col md={4} className='justify-content-center'>
        {/* <Button variant="success" size="lg" onClick={onCobrar}> */}
        <Button variant="success" size="lg" onClick={handleCobrar} disabled={!onCobrar}>
          Cobrar
        </Button>
      </Col>
      <Col md={4}>
        <Row className='boton-cobro-advertencia justify-content-start'>
          {openedPedidos > 0 && "Los pedidos abiertos seran borrados"}
        </Row>
      </Col>
    </Row>
  );
};

export default FooterOrdenAbierta;