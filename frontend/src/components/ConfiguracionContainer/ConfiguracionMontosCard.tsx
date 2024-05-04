import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Configuracion, ConfiguracionService } from '../../codegen_output';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';
import { Button, Form, Card, Row, Col, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ConfiguracionMontosCard = () => {
  const [config, setConfig] = useState({
    monto_maximo_orden_def: 0,
    monto_maximo_pedido_def: 0,
    fecha_ultima_actualizacion: ''
  });

  const [inputs, setInputs] = useState({
    monto_maximo_orden_def: 0,
    monto_maximo_pedido_def: 0
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const lastConfig: Configuracion = await ConfiguracionService.handleGetLastConfiguracionBackendApiV1ConfiguracionesLastGet();
      setConfig({
        monto_maximo_orden_def: lastConfig.monto_maximo_orden_def || 0,
        monto_maximo_pedido_def: lastConfig.monto_maximo_pedido_def || 0,
        fecha_ultima_actualizacion: lastConfig.fecha_ultima_actualizacion || ''
      });
      setInputs({
        monto_maximo_orden_def: lastConfig.monto_maximo_orden_def || 0,
        monto_maximo_pedido_def: lastConfig.monto_maximo_pedido_def || 0
      });
    } catch (error) {
      console.error('Failed to fetch configuration:', error);
      Swal.fire('Error', 'Error al cargar la configuración de montos.', 'error');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await ConfiguracionService.handleCreateConfiguracionBackendApiV1ConfiguracionesPost({
        monto_maximo_orden_def: inputs.monto_maximo_orden_def,
        monto_maximo_pedido_def: inputs.monto_maximo_pedido_def
      });
      Swal.fire('Actualizado', 'Configuración de montos actualizada correctamente.', 'success');
      fetchConfig();
    } catch (error) {
      console.error('Failed to update configuration:', error);
      Swal.fire('Error', 'No se pudo actualizar la configuración de montos.', 'error');
    }
  };

  const isUnchanged = config.monto_maximo_orden_def === inputs.monto_maximo_orden_def &&
                      config.monto_maximo_pedido_def === inputs.monto_maximo_pedido_def;

  return (
    <Card>
      <Card.Body>
        <Card.Title><h3>Configuración de Montos</h3></Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={4}>Máximo por Orden</Form.Label>
            <Col md={4}>  {/* Shorter input fields */}
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  name="monto_maximo_orden_def"
                  value={inputs.monto_maximo_orden_def}
                  onChange={handleChange}
                />
              </InputGroup>
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={4}>Máximo por Pedido</Form.Label>
            <Col md={4}>  {/* Shorter input fields */}
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  name="monto_maximo_pedido_def"
                  value={inputs.monto_maximo_pedido_def}
                  onChange={handleChange}
                />
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4}>Última Actualización</Form.Label>
            <Col sm={8}>
              <TimestampFormateadoBadge 
                timestamp={config.fecha_ultima_actualizacion}
              />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isUnchanged}>Actualizar</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ConfiguracionMontosCard;
