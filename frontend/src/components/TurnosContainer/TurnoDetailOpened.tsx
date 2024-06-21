// OpenTurnDetail.tsx
import React, { useState, useEffect } from 'react';
import { OrdenesList } from '../OrdenesContainer/OrdenesListCard';
import { OrdenesService, OrdenCompraDetallada, Turno } from '../../codegen_output';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';
import InfoCard from '../Views/CajeroView/StatusPanel/InfoCard';
import InfoCardMontoDesglosado from '../Views/CajeroView/StatusPanel/InfoCardMontoDesglosado';
import { Badge, Row, Col, Accordion } from 'react-bootstrap';

interface OpenTurnDetailProps {
  turnoData: Turno;
  onReloadStatus: () => void;
}

const OpenTurnDetail = ({ turnoData, onReloadStatus }: OpenTurnDetailProps) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [ordenesDelTurno, setOrdenesDelTurno] = useState<OrdenCompraDetallada[]>([]);

  useEffect(() => {
    handleRecuperarOrdenesDelTurno();
  }, [turnoData]);

  const handleRecuperarOrdenesDelTurno = async () => {
    if (turnoData) {
      try {
        const ordenesResponse = await OrdenesService.handleReadOrdenByTurnoIdBackendApiV1OrdenesByTurnoTurnoIdGet(turnoData.id);
        setOrdenesDelTurno(ordenesResponse);
      } catch (error) {
        setOrdenesDelTurno([]);
      }
    }
  };

  const handleClientesActivosClick = () => {
    setActiveKey(activeKey === '0' ? null : '0');
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
      <Row className='mb-2'>
        <Col md={3}>
          <Badge bg='light' text='dark'>Comentarios</Badge>
        </Col>
        <Col className='text-start'>{turnoData.comentarios || 'No se guardaron comentarios'}</Col>
      </Row>
      <Row>
        <Accordion activeKey={activeKey} onSelect={handleClientesActivosClick}>
          <Accordion.Item eventKey="0" className='card-in-modal-colored'>
            <Accordion.Header>Lista de Ordenes</Accordion.Header>
            <Accordion.Body className='ms-4'>
              <OrdenesList ordenesList={ordenesDelTurno || []} onDeleteOrden={() => {}} columnasReducidas={true} ordenCobradaTrigger={onReloadStatus} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </>
  );
};

export default OpenTurnDetail;
