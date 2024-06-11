import React, { useState, useEffect } from 'react';
import { ConfiguracionService, ConfiguracionCreate } from '../../codegen_output';
import { LectorTapasContainer } from '../LectorTapasContainer/LectorTapasContainer';
import ConfiguracionMontosCard from './ConfiguracionMontosCard';
import { Row, Col, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';

export const ConfiguracionContainer = () => {
  const [configInputs, setConfigInputs] = useState<ConfiguracionCreate>({
    monto_maximo_orden_def: 0,
    monto_maximo_pedido_def: 0
  });

  const handleConfigChange = (name: string, value: number) => {
    setConfigInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async () => {
    try {
      await ConfiguracionService.handleCreateConfiguracionBackendApiV1ConfiguracionesPost(configInputs);
      Swal.fire('Actualizado', 'Configuración de montos actualizada correctamente.', 'success');
    } catch (error) {
      console.error('Failed to update configuration:', error);
      Swal.fire('Error', 'No se pudo actualizar la configuración de montos.', 'error');
    }
  };

  const [lastModified, setLastModified] = useState('');

  // Simulate fetching the last modification date
  useEffect(() => {
    setLastModified(new Date().toLocaleDateString());
  }, []);

  return (
    <div>
      <Row className="mb-3 d-flex">
        <Col>
          <LectorTapasContainer />
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col md={7}>
          <h3>Configuración de Montos</h3>
          <ConfiguracionMontosCard onChange={handleConfigChange} />
          <Button onClick={handleFormSubmit} className="mt-3 boton-cop">Actualizar</Button>
          <div className="mt-2">Última Actualización: <TimestampFormateadoBadge timestamp={lastModified} /></div>
        </Col>
      </Row>
    </div>
  );
};

export default ConfiguracionContainer;
