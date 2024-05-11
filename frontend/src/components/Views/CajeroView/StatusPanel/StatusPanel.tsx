import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import InfoCard from './InfoCard';
import { InfoDeCierre, Turno, TurnosService } from '../../../../codegen_output';
import { handleApiError } from '../../../ClientsContainer/ClientsContainer';
import CierreDeCaja from './CierreDeCaja';
import Swal from 'sweetalert2';

const StatusPanel = () => {
  const [turnoData, setTurnoData] = useState<Turno | null>(null);
  const [showCierreDeCajaDetalle, setShowCierreDeCajaDetalle] = useState(false);

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
        handleApiError(error);
      });
  };

  const handleCerrarTurno = async (infoDeCierre: InfoDeCierre) => {
    try {
      const updatedTurnoData = await TurnosService.handleCerrarTurnoBackendApiV1TurnosCerrarPost(
        infoDeCierre
      );
      setTurnoData(updatedTurnoData);    
      Swal.fire('Turno Cerrado', '', 'success')
      .then(() => window.location.reload())
    } catch (error: unknown) {
      // setTurnoData(null);
      handleApiError(error); // You can remove this line
    }
  };

  const handleShowCierreDeCajaDetalle = () => {
    handleGetTurnoInfo()
    setShowCierreDeCajaDetalle(true);
  }

  const handleCloseCierreDeCajaDetalle = () => {
    // setTurnoData(null)
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
              <InfoCard
                title="Clientes Activos"
                count={(turnoData && turnoData.clientes_activos) ? turnoData.clientes_activos : '0'}
              />
            </Col>
            <Col>
              <InfoCard
                title="Clientes Totales"
                count={turnoData ? turnoData.cantidad_de_ordenes : 0}
              />
            </Col>
          </Row>
      </Card.Body>
      <Card.Footer className='d-flex justify-content-center'>
        <Button variant='warning' onClick={handleShowCierreDeCajaDetalle}>Cerrar Caja</Button>
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
