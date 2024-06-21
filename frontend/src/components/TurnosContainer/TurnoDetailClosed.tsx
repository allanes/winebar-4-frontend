import React, { useState } from 'react';
import { Accordion, Card, Row, Col } from 'react-bootstrap';
import DetalleTurnoMetadataCard from './DetalleTurnoMetadataCard';
import SegunSistemaCard from './TurnoCerradoComps/SystemCard';
import SegunUsuarioCard from './TurnoCerradoComps/UserCard';
import DifferenceCard from './TurnoCerradoComps/DifferenceCard';
import { Turno } from '../../codegen_output';

interface TurnoDetailClosedProps {
  turnoData: Turno;
}

const TurnoDetailClosed = ({ turnoData }: TurnoDetailClosedProps) => {
  // Use an array to manage the open state of each accordion item
  const [openItems, setOpenItems] = useState<string[]>(['0', '1', '2']);

  const montoCargado1 = turnoData.suma_ordenes_cobradas_efectivo || 0;
  const montoCargado2 = turnoData.suma_ordenes_cobradas_tarjeta || 0;
  const montoCargado3 = turnoData.suma_ordenes_cobradas_transferencia || 0;
  const total = turnoData.suma_ordenes_cobradas || 0;

  const handleToggle = (key: string) => {
    setOpenItems(prevOpenItems => 
      prevOpenItems.includes(key) 
        ? prevOpenItems.filter(item => item !== key)
        : [...prevOpenItems, key]
    );
  };

  return (
    <Card className='p-3 cierre-caja-global-card'>
      <Card.Body>
        <Accordion activeKey={openItems}>
          <Accordion.Item eventKey="0" className='mb-2 cierre-caja-pago-card'>
            <Accordion.Header onClick={() => handleToggle('0')}>
              <Row className='w-100'>
                <Col>
                  <strong>Según Sistema</strong>
                </Col>
                <Col className='text-end'>
                  <strong>${total.toLocaleString('es-ES')}</strong>
                </Col>
              </Row>
            </Accordion.Header>
            <Accordion.Body>
              <SegunSistemaCard 
                montoCargado1={montoCargado1} 
                montoCargado2={montoCargado2} 
                montoCargado3={montoCargado3} 
                montoCargado4={total} 
              />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className='mb-2 cierre-caja-pago-card'>
            <Accordion.Header onClick={() => handleToggle('1')}>
              <Row className='w-100'>
                <Col>
                  <strong>Según Usuario</strong>
                </Col>
                <Col className='text-end'>
                  <strong>${turnoData.monto_en_caja.toLocaleString('es-ES')}</strong>
                </Col>
              </Row>
            </Accordion.Header>
            <Accordion.Body>
              <SegunUsuarioCard montoEnCaja={turnoData.monto_en_caja} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2" className='cierre-caja-pago-card'>
            <Accordion.Header onClick={() => handleToggle('2')}>
              <Row className='w-100'>
                <Col>
                  <strong>Diferencia</strong>
                </Col>
                <Col className='text-end'>
                  <strong>${turnoData.diferencia?.toLocaleString('es-ES') || 0}</strong>
                </Col>
              </Row>
            </Accordion.Header>
            <Accordion.Body>
              <DifferenceCard diferencia={turnoData.diferencia || 0} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default TurnoDetailClosed;
