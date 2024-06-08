import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Configuracion, ConfiguracionService } from '../../codegen_output';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';
import { Button, Form, Card, Row, Col, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';

interface ConfiguracionMontosCardProps {
  onChange?: (name: string, value: number) => void;
  showSubmitButton?: boolean;
  onSubmit?: (inputs: { monto_maximo_orden_def: number, monto_maximo_pedido_def: number }) => Promise<void>;
}

const ConfiguracionMontosCard: React.FC<ConfiguracionMontosCardProps> = ({ onChange, showSubmitButton = true, onSubmit }) => {
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

  const formatNumber = (value: number) => {
    return value.toLocaleString('es-ES');
  };

  const parseNumber = (value: string) => {
    return parseFloat(value.replace(/[^0-9]/g, ''));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericalValue = parseNumber(value);

    setInputs(prev => ({
      ...prev,
      [name]: numericalValue
    }));

    if (onChange) {
      onChange(name, numericalValue);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      await onSubmit(inputs);
      fetchConfig();
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
            <Form.Label column md={4}>Máximo General</Form.Label>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="text"
                  name="monto_maximo_orden_def"
                  value={formatNumber(inputs.monto_maximo_orden_def)}
                  onChange={handleChange}
                />
              </InputGroup>
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={4}>Cada Pedido</Form.Label>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="text"
                  name="monto_maximo_pedido_def"
                  value={formatNumber(inputs.monto_maximo_pedido_def)}
                  onChange={handleChange}
                />
              </InputGroup>
            </Col>
          </Form.Group>

          {showSubmitButton && (
            <>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>Última Actualización</Form.Label>
                <Col sm={8}>
                  <TimestampFormateadoBadge 
                    timestamp={config.fecha_ultima_actualizacion}
                  />
                </Col>
              </Form.Group>
            
              <Button variant="primary" type="submit" disabled={isUnchanged}>Actualizar</Button>
            </>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ConfiguracionMontosCard;
