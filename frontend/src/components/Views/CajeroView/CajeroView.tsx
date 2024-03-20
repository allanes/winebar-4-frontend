import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderWithUser from '../../Header/HeaderWithUser';
import TurnoPanel from './TurnoPanel';
import AccionesPanel from './AccionesPanel';
import StatusPanel from './StatusPanel/StatusPanel';
import { useAuth } from '../../auth/AuthContext';


const CajeroView = () => {
  const {isLoggedIn} = useAuth()

  return (
    <>
      <HeaderWithUser 
        title='Cajero'
      />
      <Container fluid>
        {isLoggedIn && (
          <>
            <Row className="mb-4">
              <Col>
                <AccionesPanel />
              </Col>
              <Col>
                <StatusPanel />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <TurnoPanel />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}

export default CajeroView;
