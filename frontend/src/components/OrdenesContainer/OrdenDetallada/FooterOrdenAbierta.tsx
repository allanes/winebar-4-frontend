import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';

interface FooterOrdenAbiertaProps {
  openedPedidos: number;
  onCobrar: (ordenId: number) => void;
  ordenId: number;
}

const FooterOrdenAbierta: React.FC<FooterOrdenAbiertaProps> = ({ openedPedidos, onCobrar, ordenId }) => {
  const handleCobrar = () => {
    console.log()
    onCobrar(ordenId);
  };
  
  return (
    <Row>
      <Col md={4} />
      <Col md={4} className='justify-content-center'>
        {/* <Button variant="success" size="lg" onClick={onCobrar}> */}
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
  );
};

export default FooterOrdenAbierta;