import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Badge } from 'react-bootstrap';
import logoBar from '../../../assets/icons/logo.png';
import { useAuth } from '../../auth/AuthContext';
import LoginPanel from '../../auth/LoginPanel';

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
                setKeyboardCount(kbCountResp.length);
            } catch (error) {
                console.error('Error fetching keyboard count:', error);
            }
        };

        const fetchLcdStatus = async () => {
            try {
                // const lcdHealthResponse = await fetch('http://localhost:3001/lcd/health');
                setLcdStatus(true);
            } catch (error) {
                console.error('Error fetching LCD status:', error);
                setLcdStatus(false);
            }
        };

        fetchKeyboardCount();
        fetchLcdStatus();
    }, []);

    return (
        <div className="container-fluid container-header text-white pt-1 pb-1">
            <Row className="align-items-center">
                <Col md={4}>
                  <Row className='align-items-center'>
                    <Col md={3}>
                      <img src={logoBar} className="float-start logobar" alt="Logo del bar" />
                    </Col>
                    <Col className='text-start'>
                      <h5>Altacava <br/>Winebar</h5>
                    </Col>
                  </Row>
                  <Row >
                    <Col md={4}>
                      <Badge bg='info'>
                        Lectores {' '}
                        {keyboardCount > 0 ? (
                            <span className="text-success">● ({keyboardCount})</span>
                        ) : (
                            <span className="text-danger">●</span>
                        )}                          
                      </Badge>
                    </Col>
                    <Col>
                      <Badge bg='info'>
                          Pantalla cliente {lcdStatus ? (
                              <span className="text-success">●</span>
                          ) : (
                              <span className="text-danger">●</span>
                          )}
                      </Badge>
                    </Col>
                  </Row>
                </Col>
                <Col xs={4} className="text-center">
                    <h2>{title}</h2>
                </Col>
                <Col xs={4} className="text-end">
                  <Row>
                    <Col>
                      {isLoggedIn && user ? (
                        <>
                            <p>{`${user.nombre} ${user.apellido ? user.apellido : ''}`}</p>
                            <Button variant="success" onClick={logout}>Cerrar sesión</Button>
                        </>
                      ) : (
                        <Button variant="success" onClick={() => setShowLoginModal(true)}>Iniciar sesión</Button>
                      )}
                    </Col>
                  </Row>
                </Col>		                
            </Row>
            {showLoginModal && !isLoggedIn && (
                <LoginPanel />
            )}
        </div>
    );
};

export default TaperoHeader;
