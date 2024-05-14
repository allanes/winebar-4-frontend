import React, {useState, useEffect} from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import logoBar from '../../assets/icons/logo_bn.png';
import { useAuth } from '../auth/AuthContext';
import LoginPanel from '../auth/LoginPanel';

interface HeaderWithUserProps {
    title: string;
}

const HeaderWithUser: React.FC<HeaderWithUserProps> = ({ title }) => {
    const [showLoginModal, setShowLoginModal] = useState(true);
    const { isLoggedIn, user, login, logout } = useAuth();

    useEffect(() => {
        // Automatically show login modal if not logged in
        // setShowLoginModal(!isLoggedIn);

        if (!isLoggedIn && showLoginModal) {
            setShowLoginModal(true);            
        }

    }, [isLoggedIn]);

    return (
        <Col className="container-fluid container-header py-1">
            <Row className="align-items-center">
                <Col className="ms-2">
                    <h2>{title}</h2>
                </Col>
                <Col className="d-flex align-items-center">
                    <img src={logoBar} className="logobar" alt="Logo del bar" />                    
                </Col>
                <Col  className='d-flex justify-content-end'>
                    {isLoggedIn && user ? (
                        <Col md={3} className='pe-1'>
                            <Row className='justify-content-center pb-1'>{`${user.nombre} ${user.apellido ? user.apellido : ''}`}</Row>
                            <Row><Button  className="header-button" onClick={logout}>Cerrar sesión</Button></Row>
                        </Col>
                    ) : (
                        <Row><Button  className="header-button" onClick={() => setShowLoginModal(true)}>Iniciar sesión</Button></Row>
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
