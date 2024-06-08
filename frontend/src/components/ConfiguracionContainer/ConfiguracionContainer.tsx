import React from 'react';
import { ConfiguracionService } from '../../codegen_output';
import { LectorTapasContainer } from '../LectorTapasContainer/LectorTapasContainer';
import ConfiguracionMontosCard from './ConfiguracionMontosCard';
import { Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const ConfiguracionContainer = () => {

  const handleConfigValueChanged = () => {
    console.log('Button clicked');
    // Add your button click logic here
  };

  const handleFormSubmit = async (inputs: { monto_maximo_orden_def: number, monto_maximo_pedido_def: number }) => {
    try {
      await ConfiguracionService.handleCreateConfiguracionBackendApiV1ConfiguracionesPost(inputs);
      Swal.fire('Actualizado', 'Configuración de montos actualizada correctamente.', 'success');
    } catch (error) {
      console.error('Failed to update configuration:', error);
      Swal.fire('Error', 'No se pudo actualizar la configuración de montos.', 'error');
    }
  };

  return (
    <div>
      <Row className="mb-3 d-flex">
        <Col>
          <LectorTapasContainer />       
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col md={7}>
          <ConfiguracionMontosCard 
            showSubmitButton={true} 
            onChange={handleConfigValueChanged} 
            onSubmit={handleFormSubmit}
          />
        </Col>
      </Row>
    </div>
  );
};
