// OpenTurnDetail.tsx
import React from 'react';

import { Turno } from '../../codegen_output';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';
import InfoCard from '../Views/CajeroView/StatusPanel/InfoCard';
import { Badge, Row, Col } from 'react-bootstrap';

interface OpenTurnDetailProps {
  turnoData: Turno;
  onReloadStatus: () => void;
  onClickOpenOrdenes: () => void;
}

const OpenTurnDetail = ({ turnoData, onReloadStatus, onClickOpenOrdenes }: OpenTurnDetailProps) => {
  const handleClientesActivosClick = () => {
    onClickOpenOrdenes()
  };

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
        <Col>
          <InfoCard title="Clientes Activos" count={turnoData.clientes_activos || '0'} onClick={handleClientesActivosClick} clickable />
        </Col>
        <Col md={6}>
          <InfoCard title="Clientes Totales" count={turnoData.cantidad_de_ordenes || 0} />
        </Col>
      </Row>
      <Row className='d-flex'>
        <Col md={6}>
            <InfoCard
                title="Monto Cobrado"
                count={`$${turnoData.suma_ordenes_cobradas || 0}`}
            />
        </Col>
      </Row>
    </>
  );
};

export default OpenTurnDetail;
