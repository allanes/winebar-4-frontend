import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import InfoCard from './InfoCard';
import { InfoDeCierre, Turno, TurnosService } from '../../../../codegen_output';
import CierreDeCaja from './CierreDeCaja';
import Swal from 'sweetalert2';
import { ArrowClockwise } from 'react-bootstrap-icons'; // Importing the refresh icon

interface StatusPanelProps {
  reloadStatus: boolean;
  onReloadStatus: () => void;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ reloadStatus, onReloadStatus }) => {
  const [turnoData, setTurnoData] = useState<Turno | null>(null);
  const [showCierreDeCajaDetalle, setShowCierreDeCajaDetalle] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    handleGetTurnoInfo();
  }, [reloadStatus]);

  useEffect(() => {
    if (lastUpdated) {
      const interval = setInterval(() => {
        forceUpdate(); // Force a re-render to update the elapsed time
      }, 1000);
      return () => clearInterval(interval); // Clear the interval on component unmount
    }
  }, [lastUpdated]);

  const handleGetTurnoInfo = async () => {
    try {
      const turnoResponse = await TurnosService.handleGetTurnoAbiertoBackendApiV1TurnosTurnoEnCursoGet();
      setTurnoData(turnoResponse);
      setLastUpdated(new Date()); // Update the last updated time
    } catch (error) {
      setTurnoData(null);
    }
  };

  const handleAbrirTurno = async () => {
    try {
      const turnoResponse = await TurnosService.handleAbrirTurnoBackendApiV1TurnosAbrirPost();
      setTurnoData(turnoResponse);
      setLastUpdated(new Date()); // Update the last updated time
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
      setLastUpdated(new Date()); // Update the last updated time
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
    onReloadStatus();
  };

  const handleRefreshClick = () => {
    handleGetTurnoInfo(); // Call the function to refresh the data
  };

  const handleCambiarCajero = async (infoDeCierre: InfoDeCierre, nuevoCajeroRfid: number) => {
    try {
        await TurnosService.handleCambiarCajeroBackendApiV1TurnosCambiarCajeroPost(nuevoCajeroRfid, infoDeCierre);
        Swal.fire('Cambio de Cajero Realizado', '', 'success');
    } catch (error) {
        Swal.fire('Error', 'No se pudo cambiar el cajero.', 'error');
    }
  };

  // Helper function to force a component re-render
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const getElapsedTime = (date: Date | null): string => {
    if (!date) return '';
    const now = new Date();
    const elapsedSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (elapsedSeconds < 60) return `Actualizado hace ${elapsedSeconds} segundos`;
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    if (elapsedMinutes < 60) return `Actualizado hace ${elapsedMinutes} minutos`;
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    return `Actualizado hace ${elapsedHours} horas`;
  };

  return (
    <Card className="transparent-card">
      <Card.Header className="d-flex justify-content-between align-items-center">
        Estado
        <span>
          <Button variant="link" className="text-decoration-none" onClick={handleRefreshClick} aria-label="Refresh">
            <ArrowClockwise className='boton-refresh-status' />
          </Button>
          {getElapsedTime(lastUpdated)}
        </span>
      </Card.Header>
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
            <InfoCard title="Clientes Activos" count={turnoData && turnoData.clientes_activos !== undefined ? turnoData.clientes_activos : '0'} />
          </Col>
          <Col>
          <InfoCard title="Clientes Totales" count={turnoData && turnoData.cantidad_de_ordenes !== undefined ? turnoData.cantidad_de_ordenes : 0} />
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
        handleCambiarCajero={handleCambiarCajero}
        onReloadStatus={onReloadStatus}
      />
    </Card>
  );
};

export default StatusPanel;
