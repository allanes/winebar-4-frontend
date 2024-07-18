import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';
import TimestampFormateadoBadge from '../../Common/TimestampFormateadoBadge';
import { OrdenCompraDetallada } from '../../../codegen_output';

interface FooterOrdenCerradaProps {
  ordenData: OrdenCompraDetallada;
}

const FooterOrdenCerrada: React.FC<FooterOrdenCerradaProps> = ({ ordenData }) => {

  return (
    <div>
      <Row className="mb-2">
        <Col>
          <TimestampFormateadoBadge timestamp={ordenData.timestamp_cierre_orden || ''} />
        </Col>
        <Col className='text-white'>
          {'Cobrada'}
        </Col>
        <Col className="text-end">
          <CheckCircleFill color='green' size={30} />
        </Col>      
      </Row>
      <Row className="mb-1 text-white">
        <Col>
          <strong>Efectivo:</strong> ${ordenData.monto_cobrado_efectivo?.toLocaleString('es-ES') || '0.00'}
        </Col>
        <Col>
          <strong>Tarjeta:</strong> ${ordenData.monto_cobrado_tarjeta?.toLocaleString('es-ES') || '0.00'}
        </Col>
        <Col>
          <strong>Transferencia:</strong> ${ordenData.monto_cobrado_transferencia?.toLocaleString('es-ES') || '0.00'}
        </Col>
        <Col>
          <strong>Exportado a Fudo:</strong> ${ordenData.monto_cargado_fudo?.toLocaleString('es-ES') || '0.00'}
        </Col>
      </Row>
    </div>
  );
};

export default FooterOrdenCerrada;