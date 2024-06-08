  import React, { useState, useEffect } from 'react';
  import { Button, Row, Col, Badge } from 'react-bootstrap';
  import logoBar from '../../../assets/icons/logo_bn.png';
  import { useAuth } from '../../auth/AuthContext';
  import LoginPanel from '../../auth/LoginPanel';
  import { HeaderStatusBadgeTapero } from '../../Header/HeaderStatusBadge';
  import { LectoresDeTapasService, LectorTapaReceive, VinosService } from '../../../codegen_output';
  import servidorClavesConfig from '../../../config';

  interface TaperoHeaderProps {
      title: string;
  }

  const TaperoHeader: React.FC<TaperoHeaderProps> = ({ title }) => {
      const [showLoginModal, setShowLoginModal] = useState(true);
      const { isLoggedIn, user, login, logout } = useAuth();
      const [keyboardCount, setKeyboardCount] = useState(0);
      const [lcdStatus, setLcdStatus] = useState(false);
      const [vitteIsOnline, setVitteIsOnline] = useState(false);

      useEffect(() => {
          if (!isLoggedIn && showLoginModal) {
              setShowLoginModal(true);            
          }
      }, [isLoggedIn]);

      useEffect(() => {
          const fetchKeyboardCount = async () => {
              try {
                  const response = await fetch(`http://localhost:${servidorClavesConfig.servidorClavesPort}/lectores-rfid/keyboard_ports`);
                  const kbCountResp = await response.json()
                  
                  // Assuming kbCountResp is an array of keyboard identifiers
                  const lectorTapaReceive: LectorTapaReceive = {
                    lista_lectores_disponibles: kbCountResp
                  };

                  // Call the method to inform the backend about the available lectores
                  await LectoresDeTapasService.handleAgregarLectorTapaBackendApiV1LectoresTapasInformarLectorTapaPost(
                    lectorTapaReceive
                  );
                  setKeyboardCount(kbCountResp.length);
              } catch (error) {
                  console.error('Error fetching keyboard count:', error);
              }
          };

          const fetchLcdStatus = async () => {
              try {
                  const lcdHealthResponse = await fetch(`http://localhost:${servidorClavesConfig.servidorClavesPort}/lcd/health`);
                  if (lcdHealthResponse.status == 200) {
                    setLcdStatus(true);
                  }
                  else {
                    setLcdStatus(false);
                  }
              } catch (error) {
                  console.error('Error fetching LCD status:', error);
                  setLcdStatus(false);
              }
          };

          const fetchVitteStatus = async () => {
            try {
                const response = await VinosService.handleCheckHealthBackendApiV1VinosCheckHealthGet();
                setVitteIsOnline(true); // Assuming the API just returns a successful response if healthy
            } catch (error) {
                console.error('Failed to check Vitte health:', error);
                setVitteIsOnline(false);
            }
          }

          fetchKeyboardCount();
          fetchLcdStatus();
          fetchVitteStatus();
      }, []);

      return (
          <Col className="container-fluid container-header text-white pt-1 pb-1">
              <Row className="align-items-center">
                  <Col >
                    <Row className='mb-1'>
                      <Col>
                        <HeaderStatusBadgeTapero 
                          status={vitteIsOnline} 
                          label={`Vitte`} 
                        />
                      </Col>
                      <Col>
                        <HeaderStatusBadgeTapero 
                          status={keyboardCount > 0} 
                          label={`Lectores (${keyboardCount})`} 
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <HeaderStatusBadgeTapero 
                          status={lcdStatus} 
                          label={'Pantalla cliente'}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col className="d-flex align-items-center">
                    <img src={logoBar} className="logobar-small" alt="Logo del bar" />                    
                  </Col>
                  <Col xs={4} className="text-end">
                    <Row>
                      <Col  className='d-flex justify-content-end'>
                        {isLoggedIn && user ? (
                            <Row className='pe-3 '><Button  className="header-button" onClick={logout}>{`Cerrar Sesion (${user.nombre})`}</Button></Row>
                        ) : (
                            <Row><Button  className="header-button" onClick={() => setShowLoginModal(true)}>Iniciar sesión</Button></Row>
                        )}
                    </Col>	
                    </Row>
                  </Col>		                
              </Row>
              {showLoginModal && !isLoggedIn && (
                  <LoginPanel />
              )}
          </Col>
      );
  };

  export default TaperoHeader;
