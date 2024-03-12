import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderWithUser from '../../Header/HeaderWithUser';
import TurnoPanel from './TurnoPanel';
import AccionesPanel from './AccionesPanel';
import StatusPanel from './StatusPanel/StatusPanel';
import LoginPanel from './LoginPanel';
import { PersonalInterno, LoginService, Token, OpenAPI } from '../../../codegen_output'


const CajeroView = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState<PersonalInterno | null>(null);

  const handleLoginSuccess = async (token: Token) => {
    localStorage.setItem('token', token.access_token); // Save token locally
    OpenAPI.TOKEN = token.access_token;
    // Configure your API client to use the token
    // Assuming your codegen automatically handles bearer tokens if configured:
    try {
      const usuarioLogueadoData = await LoginService.readUsersMeBackendApiV1LoginUsersMeGet();
      setUsuarioLogueado(usuarioLogueadoData);
      setIsLoggedIn(true);
      setShowLoginModal(false);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    OpenAPI.TOKEN = '';
    setIsLoggedIn(false);
    setUsuarioLogueado(null);
    // Implement additional logout logic as needed
  };

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  return (
    <>
      <HeaderWithUser 
        title='Cajero' 
        isLoggedIn={isLoggedIn} 
        user={{ name: usuarioLogueado?.nombre || 'Invitado' }} 
        onLogin={handleShowLoginModal} 
        onLogout={handleLogout} 
      />
      <Container fluid>
        {showLoginModal && <LoginPanel onLoginSuccess={handleLoginSuccess} target='caja' />}
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
