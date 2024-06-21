// TurnoDetalle.tsx
import React from 'react';
import { Card, Badge, Col } from 'react-bootstrap';
import { Turno } from '../../codegen_output';
import OpenTurnDetail from './TurnoDetailOpened';
import ClosedTurnDetail from './TurnoDetailClosed';

interface TurnoProps {
  turnoData: Turno | null;
  onReloadStatus: () => void;
}

const TurnoDetalle = ({ turnoData, onReloadStatus }: TurnoProps) => {
  if (!turnoData) {
    return <div>No hay datos del turno disponibles.</div>;
  }

  const isClosed = turnoData.cerrado_por;

  return (
    <Card className='card-in-modal-content'>
      <Card.Header>
        <Card.Title className='d-flex justify-content-between align-items-center'>
          <Col md={8}>
            <h3>Cierre de Caja</h3>
          </Col>
          <Col className='justify-content-end'>
            {isClosed ? <Badge bg='success'>Cerrada</Badge> : <Badge bg='warning'>EN CURSO</Badge>}
          </Col>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        {isClosed ? (
          <ClosedTurnDetail turnoData={turnoData} />
        ) : (
          <OpenTurnDetail turnoData={turnoData} onReloadStatus={onReloadStatus} />
        )}
      </Card.Body>
    </Card>
  );
};

export default TurnoDetalle;
