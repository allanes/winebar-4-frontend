import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import InfoCard from '../../Views/CajeroView/StatusPanel/InfoCard';
import { MiniInfoCard } from '../../Views/CajeroView/StatusPanel/InfoCard';
import efectivoImage from '../../../assets/icons/pago-efectivo.png';
import tarjetaImage from '../../../assets/icons/pago-tarjeta.png';
import transferenciaImage from '../../../assets/icons/pago-transferencia.png';

interface SystemCardProps {
  montoCargado1: number;
  montoCargado2: number;
  montoCargado3: number;
  montoCargado4: number;
}

const SegunSistemaCard = ({ montoCargado1, montoCargado2, montoCargado3, montoCargado4 }: SystemCardProps) => {
  return (
    <Card className='transparent-card cierre-caja-pago-card'>
      <Card.Body>
        <Row>
          <Col>
            <MiniInfoCard title="Efectivo" count={`$${montoCargado1}`} imageSrc={efectivoImage} />
          </Col>
          <Col>
            <MiniInfoCard title="Tarjeta" count={`$${montoCargado2}`} imageSrc={tarjetaImage} />
          </Col>
          <Col>
            <MiniInfoCard title="Transferencia" count={`$${montoCargado3}`} imageSrc={transferenciaImage} />
          </Col>
        </Row>
        <Row>
          <Col className='mt-4'>
            <InfoCard title="Total" count={`$${montoCargado4}`} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SegunSistemaCard;
