import React, { useState, useEffect } from 'react';
import { VinosService } from '../../codegen_output';
import { Button, Row, Col } from 'react-bootstrap';
import logoBar from '../../assets/icons/logo_bn.png';
import { useAuth } from '../auth/AuthContext';
import LoginPanel from '../auth/LoginPanel';
import { HeaderStatusBadgeClassic } from './HeaderStatusBadge';

interface HeaderWithUserProps {
    title: string;
}

const HeaderWithUser: React.FC<HeaderWithUserProps> = ({ title }) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [vitteIsOnline, setVitteIsOnline] = useState(false);
    const { isLoggedIn, user, login, logout } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            const checkVitteHealth = async () => {
                try {
                    const response = await VinosService.handleCheckHealthBackendApiV1VinosCheckHealthGet();
                    setVitteIsOnline(true); // Assuming the API just returns a successful response if healthy
                } catch (error) {
                    console.error('Failed to check Vitte health:', error);
                    setVitteIsOnline(false);
                }
            };

            checkVitteHealth();
        }
    }, [isLoggedIn]); // Dependency on isLoggedIn ensures this runs only when the login status changes

    return (
        <Col className="container-fluid container-header py-1">
            <Row className="align-items-center">
                <Col className="ms-2">
                    <Row>
                        <h2>{title}</h2>
                    </Row>
                    <Row>
                        <HeaderStatusBadgeClassic 
                            status={vitteIsOnline} 
                            label={`Vitte ${vitteIsOnline ? '(Conectado)' : '(Sin Conexión)'}`} 
                        />                        
                    </Row>
                </Col>
                <Col className="d-flex align-items-center">
                    <img src={logoBar} className="logobar" alt="Logo del bar" />                    
                </Col>
                <Col className='d-flex justify-content-end'>
                    {isLoggedIn && user ? (
                        <Col md={3} className='pe-1'>
                            <Row className='justify-content-center pb-1'>{`${user.nombre} ${user.apellido ? user.apellido : ''}`}</Row>
                            <Row><Button className="header-button" onClick={logout}>Cerrar sesión</Button></Row>
                        </Col>
                    ) : (
                        <Row><Button className="header-button" onClick={() => setShowLoginModal(true)}>Iniciar sesión</Button></Row>
                    )}
                </Col>		
            </Row>
            {showLoginModal && !isLoggedIn && (
                <LoginPanel />
            )}
        </Col>
    );
};

export default HeaderWithUser;
