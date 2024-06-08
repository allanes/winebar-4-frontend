import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import InfoCard from './InfoCard';
import { InfoDeCierre, Turno, TurnosService } from '../../../../codegen_output';
import CierreDeCaja from './CierreDeCaja';
import Swal from 'sweetalert2';

interface StatusPanelProps {
  reloadStatus: boolean;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ reloadStatus }) => {
  const [turnoData, setTurnoData] = useState<Turno | null>(null);
  const [showCierreDeCajaDetalle, setShowCierreDeCajaDetalle] = useState(false);

  useEffect(() => {
    handleGetTurnoInfo();
  }, [reloadStatus]);

  const handleGetTurnoInfo = async () => {
    try {
      const turnoResponse = await TurnosService.handleGetTurnoAbiertoBackendApiV1TurnosTurnoEnCursoGet();
      setTurnoData(turnoResponse);
    } catch (error) {
      setTurnoData(null);
    }
  };

  const handleAbrirTurno = async () => {
    try {
      const turnoResponse = await TurnosService.handleAbrirTurnoBackendApiV1TurnosAbrirPost();
      setTurnoData(turnoResponse);
    } catch (error) {
      setTurnoData(null);
      Swal.fire('Error', 'No se pudo abrir el turno.', 'error');
    }
  };

  const handleCerrarTurno = async (infoDeCierre: InfoDeCierre) => {
    try {
      const updatedTurnoData = await TurnosService.handleCerrarTurnoBackendApiV1TurnosCerrarPost(infoDeCierre);
      setTurnoData(updatedTurnoData);
      Swal.fire('Turno Cerrado', '', 'success').then(() => window.location.reload());
    } catch (error) {
      setTurnoData(null);
      Swal.fire('Error', 'No se pudo cerrar el turno.', 'error');
    }
  };

  const handleShowCierreDeCajaDetalle = () => {
    handleGetTurnoInfo();
    setShowCierreDeCajaDetalle(true);
  };

  const handleCloseCierreDeCajaDetalle = () => {
    setShowCierreDeCajaDetalle(false);
  };

  return (
    <Card className="transparent-card">
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
            <InfoCard title="Clientes Activos" count={turnoData ? turnoData.clientes_activos : '0'} />
          </Col>
          <Col>
            <InfoCard title="Clientes Totales" count={turnoData ? turnoData.cantidad_de_ordenes : 0} />
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className='d-flex justify-content-center'>
        <Button className='boton-cop' onClick={handleShowCierreDeCajaDetalle}>Cerrar Caja</Button>
      </Card.Footer>

      <CierreDeCaja
        show={showCierreDeCajaDetalle}
        onHide={handleCloseCierreDeCajaDetalle}
        turnoData={turnoData}
        handleGetTurnoInfo={handleGetTurnoInfo}
        handleCerrarTurno={handleCerrarTurno}
      />
    </Card>
  );
};

export default StatusPanel;
