// DetalleTurnoMetadataCard.tsx
import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { Turno } from '../../codegen_output';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';

interface DetalleTurnoMetadataCardProps {
  turnoData: Turno;
}

const DetalleTurnoMetadataCard = ({ turnoData }: DetalleTurnoMetadataCardProps) => {
  return (
    <Card className='detalle-turno-metadata-card w-auto'>
      <Card.Body>
        <Row className='mt-1'>
          <Col>
            <Badge pill className='info-pill'>
              <div>Turno</div>
              <div><strong>{turnoData.id}</strong></div>
            </Badge>
          </Col>
          <Col>
            <Badge pill className='info-pill'>
              <div>Hr. de apertura</div>
              <div>
                <TimestampFormateadoBadge timestamp={turnoData.timestamp_apertura || '0'} />
              </div>
            </Badge>
          </Col>
          <Col>
            <Badge pill className='info-pill'>
              <div>Abierto por</div>
              <div><strong>{turnoData.abierto_por_nombre}</strong></div>
            </Badge>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DetalleTurnoMetadataCard;
