import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderWithUser from '../../Header/HeaderWithUser';
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
      <Container fluid className="cajero-background">
        {isLoggedIn && (
          <>
            <Row className="mb-4 pb-5">
              <Col className='d-flex justify-content-center'>
                <AccionesPanel />
              </Col>
              <Col>
                <StatusPanel />
              </Col>
            </Row>
            
          </>
        )}
      </Container>
    </>
  );
}

export default CajeroView;
