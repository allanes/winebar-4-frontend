import React, { useState, useEffect, ChangeEvent } from 'react';
import { Configuracion, ConfiguracionService, ConfiguracionCreate } from '../../codegen_output';
import { Form, Card, Row, Col, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';

interface ConfiguracionMontosCardProps {
  onChange?: (name: string, value: number) => void;
}

const ConfiguracionMontosCard: React.FC<ConfiguracionMontosCardProps> = ({ onChange }) => {
  const [config, setConfig] = useState<ConfiguracionCreate>({
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
        monto_maximo_pedido_def: lastConfig.monto_maximo_pedido_def || 0
      });
    } catch (error) {
      console.error('Failed to fetch configuration:', error);
      Swal.fire('Error', 'Error al cargar la configuración de montos.', 'error');
    }
  };

  const formatNumber = (value: number) => value.toLocaleString('es-ES');

  const parseNumber = (value: string) => parseFloat(value.replace(/[^0-9]/g, ''));

  const handleChangeFromEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    handleChange(name, value)
  };

  const handleChange = (name: string, value: string) => {
    const numericalValue = parseNumber(value);

    setConfig(prev => ({
      ...prev,
      [name]: numericalValue
    }));

    if (onChange) {
      onChange(name, numericalValue);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md={4}>Máximo General</Form.Label>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="text"
                  name="monto_maximo_orden_def"
                  value={formatNumber(config.monto_maximo_orden_def || 0)}
                  onChange={handleChangeFromEvent}
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
                  value={formatNumber(config.monto_maximo_pedido_def || 0)}
                  onChange={handleChangeFromEvent}
                />
              </InputGroup>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ConfiguracionMontosCard;
