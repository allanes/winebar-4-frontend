// ClosedTurnDetail.tsx
import React from 'react';
import { Turno } from '../../codegen_output';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';
import InfoCard from '../Views/CajeroView/StatusPanel/InfoCard';
import { Badge, Row, Col } from 'react-bootstrap';

interface ClosedTurnDetailProps {
  turnoData: Turno;
}

const ClosedTurnDetail = ({ turnoData }: ClosedTurnDetailProps) => {
  return (
    <>
      <Row className='mb-2 align-items-center'>
        <Col>
          <h5>
            <Badge pill className='ps-5 pe-5 info-pill'>
              <Row className='mb-1'>Turno</Row>
              <Row>
                <h4><strong>{turnoData.id}</strong></h4>
              </Row>
            </Badge>
          </h5>
        </Col>
        <Col>
          <Badge pill bg='secondary' className='info-pill'>
            <h6>Hr. de apertura</h6>
            <h5>
              <TimestampFormateadoBadge timestamp={turnoData.timestamp_apertura || '0'} className='info-pill' />
            </h5>
          </Badge>
        </Col>
        <Col>
          <Badge bg='secondary' pill className='ps-4 pe-4 info-pill'>
            <Row className='text-center'>
              <h6>Abierto por</h6>
            </Row>
            <Row>
              <h5><strong>{turnoData.abierto_por_nombre}</strong></h5>
            </Row>
          </Badge>
        </Col>
      </Row>
      <Row>
        <Col  md={6}>
            <InfoCard title="Clientes Totales" count={turnoData?.cantidad_de_ordenes || 0} />
        </Col>
        <Col md={6}>
          <InfoCard title={'Informado al Cerrar Caja'} count={`$${turnoData.monto_en_caja}`} />
        </Col>
      </Row>
      <Row className='d-flex'>
        <Col md={6}>
          <InfoCard title={'Diferencia'} count={`$${(turnoData.diferencia || 0)}`} />
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col md={3}>
          <Badge bg='light' text='dark'>Comentarios</Badge>
        </Col>
        <Col className='text-start'>{turnoData.comentarios || 'No se guardaron comentarios'}</Col>
      </Row>
    </>
  );
};

export default ClosedTurnDetail;
