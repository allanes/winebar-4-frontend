import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import InfoCard from './InfoCard';
import { Turno, TurnosService } from '../../../../codegen_output';
import { handleApiError } from '../../../ClientsContainer/ClientsContainer';

const noStatusData: Turno = {
  abierto_por: 0,
  id: 0,
  timestamp_apertura: '',
  cantidad_de_ordenes: 0,
  cantidad_tapas: 0,
  cantidad_usuarios_vip: 0,
  ingresos_totales: 0,
  cerrado_por: null,
  timestamp_cierre: null,
};

const StatusPanel = () => {
  const [turnoData, setTurnoData] = useState<Turno | null>(null);

  useEffect(() => {
    handleGetTurnoInfo();
  }, []);

  const handleGetTurnoInfo = async () => {
    TurnosService.handleGetTurnoAbiertoBackendApiV1TurnosTurnoEnCursoGet()
      .then((turnoResponse) => {
        setTurnoData(turnoResponse);
      })
      .catch((error: unknown) => {
        setTurnoData(null);
        // handleApiError(error); // You can remove this line
      });
  };

  const handleAbrirTurno = async () => {
    TurnosService.handleAbrirTurnoBackendApiV1TurnosAbrirPost()
      .then((turnoResponse) => {
        setTurnoData(turnoResponse);
      })
      .catch((error: unknown) => {
        setTurnoData(null);
        handleApiError(error); // You can remove this line
      });
  };

  return (
    <Card>
      <Card.Header>Estado</Card.Header>
      <Card.Body>
        {turnoData === null && (
          <Row className='sin-turno-abierto-overlay ms-1'>
            <Col md={12} className='sin-turno-abierto-overlay-p d-flex flex-column justify-content-center align-items-center'>
              <div className='mb-2'>No hay un turno abierto</div>
              <div><Button size='lg' onClick={handleAbrirTurno}>Abrir Turno</Button></div>
            </Col>
          </Row>
        )}
          <Row>
            <Col>
              <InfoCard
                title="Clientes Activos"
                count={turnoData ? turnoData.cantidad_de_ordenes : '0'}
              />
            </Col>
            <Col>
              <InfoCard
                title="Clientes Totales"
                count={turnoData ? turnoData.cantidad_de_ordenes : -1}
              />
            </Col>
          </Row>
          <Col>
            <InfoCard
              title="Monto cobrado"
              count={`$${turnoData ? turnoData.ingresos_totales : '0'}`}
            />
          </Col>
                
      </Card.Body>
    </Card>
  );
};

export default StatusPanel;
