import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import DetalleTurnoMetadataCard from './DetalleTurnoMetadataCard';
import SegunSistemaCard from './TurnoCerradoComps/SystemCard';
import SegunUsuarioCard from './TurnoCerradoComps/UserCard';
import DifferenceCard from './TurnoCerradoComps/DifferenceCard';
import { Turno } from '../../codegen_output';

interface TurnoDetailClosedProps {
  turnoData: Turno;
}

const TurnoDetailClosed = ({ turnoData }: TurnoDetailClosedProps) => {
  const montoCargado1 = turnoData.suma_ordenes_cobradas_efectivo || 0;
  const montoCargado2 = turnoData.suma_ordenes_cobradas_tarjeta || 0;
  const montoCargado3 = turnoData.suma_ordenes_cobradas_transferencia || 0;
  const montoCargado4 = turnoData.suma_ordenes_cobradas || 0;

  return (
    // <Card className='p-3 detalle-turno-cerrado-card'>
    <Card className='p-3 transparent-card'>
      <Card.Header>
        <div>
          <h5 className='mb-0'>Cierre de Caja</h5>
        </div>
      </Card.Header>
      <Card.Body>        
        <Row className='mt-2'>
          <Col>
            <SegunSistemaCard 
              montoCargado1={montoCargado1} 
              montoCargado2={montoCargado2} 
              montoCargado3={montoCargado3} 
              montoCargado4={montoCargado4} 
            />
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col>
            <SegunUsuarioCard montoEnCaja={turnoData.monto_en_caja} />
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col>
            <DifferenceCard diferencia={turnoData.diferencia || 0} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TurnoDetailClosed;
