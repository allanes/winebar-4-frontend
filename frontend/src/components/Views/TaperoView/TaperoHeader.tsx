  import React, { useState, useEffect } from 'react';
  import { Button, Row, Col, Badge } from 'react-bootstrap';
  import logoBar from '../../../assets/icons/logo_bn.png';
  import { useAuth } from '../../auth/AuthContext';
  import LoginPanel from '../../auth/LoginPanel';
  import { PatchCheckFill, XCircleFill, CheckLg } from 'react-bootstrap-icons';
  import { LectoresDeTapasService, LectorTapaReceive } from '../../../codegen_output';

  interface TaperoHeaderProps {
      title: string;
  }

  const TaperoHeader: React.FC<TaperoHeaderProps> = ({ title }) => {
      const [showLoginModal, setShowLoginModal] = useState(true);
      const { isLoggedIn, user, login, logout } = useAuth();
      const [keyboardCount, setKeyboardCount] = useState(0);
      const [lcdStatus, setLcdStatus] = useState(false);

      useEffect(() => {
          if (!isLoggedIn && showLoginModal) {
              setShowLoginModal(true);            
          }
      }, [isLoggedIn]);

      useEffect(() => {
          const fetchKeyboardCount = async () => {
              try {
                  const response = await fetch('http://localhost:3001/lectores-rfid/keyboard_ports');
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
                  const lcdHealthResponse = await fetch('http://localhost:3001/lcd/health');
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

          fetchKeyboardCount();
          fetchLcdStatus();
      }, []);

      return (
          <Col className="container-fluid container-header text-white pt-1 pb-1">
              <Row className="align-items-center">
                  <Col md={4}>
                    {/* <Row className='align-items-center'>
                      <Col md={3}>
                        <img src={logoBar} className="float-start logobar" alt="Logo del bar" />
                      </Col>
                    </Row>
                    <Row > */}
                      <Row md={4}>
                        <Badge bg='info'>
                          {keyboardCount > 0 ? (
                            <CheckLg className='text-success' />
                          ) : (
                            <XCircleFill className='text-danger' />
                          )}                          
                          {' Lectores '}
                          {keyboardCount > 0 && `(${keyboardCount})`}
                        </Badge>
                      </Row>
                      <Row md={4}>
                        <Badge bg='info'>
                          {keyboardCount > 0 ? (
                            <CheckLg className='text-success' />
                          ) : (
                            <XCircleFill className='text-danger' />
                          )}                          
                          {' Lectores '}
                          {keyboardCount > 0 && `(${keyboardCount})`}
                        </Badge>
                      </Row>
                      <Row md={4}>
                        <Badge bg='info'>
                            {lcdStatus ? (
                                <CheckLg className='text-success' />
                            ) : (
                                <XCircleFill className='text-danger' />
                            )}
                            {' Pantalla cliente'}
                        </Badge>
                      </Row>
                    {/* </Row> */}
                  </Col>
                  <Col className="d-flex align-items-center">
                    <img src={logoBar} className="logobar-small" alt="Logo del bar" />                    
                  </Col>
                  <Col xs={4} className="text-end">
                    <Row>
                      <Col  className='d-flex justify-content-end'>
                        {isLoggedIn && user ? (
                            <Col md={2} className='pe-2'>
                                <Row className='justify-content-center pb-1'>{`${user.nombre}`}</Row>
                                <Row><Button  className="header-button" onClick={logout}>Cerrar</Button></Row>
                            </Col>
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
