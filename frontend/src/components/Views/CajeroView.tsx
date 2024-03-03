import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from '../Header/Header';
import TurnoPanel from './TurnoPanel';
import AccionesPanel from './AccionesPanel';
import StatusPanel from './StatusPanel';

const CajeroView = () => {
  return (
    <>
      <Header />
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <TurnoPanel />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <AccionesPanel />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StatusPanel />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CajeroView;
