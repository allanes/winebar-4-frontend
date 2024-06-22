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
