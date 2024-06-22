// DetalleTurnoMetadataCard.tsx
import React from 'react';
import { Row, Col, Card, Badge, Image } from 'react-bootstrap';
import { Turno } from '../../codegen_output';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';
import durationIcon from '../../assets/icons/turno-elapsed.png';
import startTimeIcon from '../../assets/icons/turno-start.png';
import stopTimeIcon from '../../assets/icons/turno-stop.png';
import { ExclamationTriangleFill, PersonFill } from 'react-bootstrap-icons'; // Importing the warning icon from react-bootstrap-icons

interface DetalleTurnoMetadataCardProps {
  turnoData: Turno;
}

const DetalleTurnoMetadataCard = ({ turnoData }: DetalleTurnoMetadataCardProps) => {
  const isClosed = Boolean(turnoData.cerrado_por);
  const isDifferentUser = isClosed && turnoData.abierto_por_nombre !== turnoData.cerrado_por_nombre;

  // Calculate duration if closed
  const duration = isClosed
    ? new Date(turnoData.timestamp_cierre!).getTime() - new Date(turnoData.timestamp_apertura).getTime()
    : new Date().getTime() - new Date(turnoData.timestamp_apertura).getTime();

  const formatDuration = (milliseconds: number | null) => {
    if (milliseconds === null) return 'En curso';
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className='detalle-turno-metadata-card w-auto'>
      <Card.Body>
        {/* <Row className='d-flex justify-content-around'> */}
        <Row className='align-items-center'>
          <Col className='text-center'>
            <h4>
              <Badge pill className='info-pill'>
                <div>Turno</div>
                <div className='mt-2'>
                  <strong># {turnoData.id}</strong>
                </div>
              </Badge>
            </h4>
          </Col>
          <Col className='text-center'>
            <Row>
              <h4>
                <Badge pill className='p-1 info-pill'>
                  {isClosed ? (
                    <Badge bg='success'>CERRADO</Badge>
                  ) : (
                    <Badge bg='warning'>EN CURSO</Badge>
                  )}
                </Badge>
              </h4>
            </Row>
            <Row>
              <Col>
                <Badge pill className='info-pill header-badge-image'>
                  <span>
                    <Image src={durationIcon} className='me-2' />
                    <strong>{formatDuration(duration)}</strong>
                  </span>
                </Badge>
              </Col>
            </Row>
          </Col>
          <Col className='text-center'>            
            <Row className='text-center'>
              <Badge pill className='info-pill header-badge-image'>
                <span>
                  <Image src={startTimeIcon} className='me-2' />
                  <TimestampFormateadoBadge timestamp={turnoData.timestamp_apertura || '0'} className='sin' />
                </span>
              </Badge>
            </Row>
            {isClosed && 
              <Row className=''>
                <Badge pill className='info-pill header-badge-image'>
                  <span className='text-start'>
                    <Image src={stopTimeIcon} className='me-2' />
                    <TimestampFormateadoBadge timestamp={turnoData.timestamp_cierre || '0'} className='sin' />
                  </span>
                </Badge>
              </Row>
            }
          </Col>
          <Col className='text-center'>
            <h4>
              <Badge pill className='info-pill'>
                <PersonFill size={20} color="white" />
                <div className='mt-2'>
                  <strong>{isClosed ? turnoData.cerrado_por_nombre : turnoData.abierto_por_nombre}</strong>
                </div>
                {isClosed && isDifferentUser && (
                  <div className='mt-2'>
                    <ExclamationTriangleFill size={15} color="orange" />
                  </div>
                )}
              </Badge>
            </h4>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DetalleTurnoMetadataCard;
