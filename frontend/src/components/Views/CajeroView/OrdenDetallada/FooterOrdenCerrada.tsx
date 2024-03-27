import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';
import TimestampFormateadoBadge from '../../../Common/TimestampFormateadoBadge';

interface FooterOrdenCerradaProps {
  timestamp_cierre_orden: string;
}

const FooterOrdenCerrada: React.FC<FooterOrdenCerradaProps> = ({ timestamp_cierre_orden }) => {
  return (
    <Row>
      <Col>
        <TimestampFormateadoBadge timestamp={timestamp_cierre_orden} />
      </Col>
      <Col>
        {'Cobrada'}
      </Col>
      <Col>
        <CheckCircleFill color='green' size={30} />
      </Col>      
    </Row>
  );
};

export default FooterOrdenCerrada;