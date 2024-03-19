import React from 'react';
import { Button } from 'react-bootstrap';
import logoBar from '../../assets/icons/logo.png';
import { useAuth } from '../auth/AuthContext';

interface HeaderWithUserProps {
  title: string;
}

const HeaderWithUser: React.FC<HeaderWithUserProps> = ({ title }) => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <div className="container-fluid container-header text-white py-4">
        <div className="row align-items-center">
            <div className="col d-flex align-items-center">
                <img src={logoBar} className="float-start mx-4 logobar" alt="Logo del bar" />
                <h1 className='h5 text-center'>Altacava <br/>Winebar</h1>
            </div>
            <div className="col text-center">
                <h2>{title}</h2>
            </div>
            <div className="col text-end">
                {isLoggedIn && user ? (
                    <>
                        <p>{`${user.nombre} ${user.apellido ? user.apellido : ''}`}</p>
                        <Button variant="success" onClick={logout}>Cerrar sesión</Button>
                    </>
                ) : (
                    <Button variant="success" disabled>Iniciar sesión</Button>
                )}
            </div>		
        </div>
    </div>
  );
};

export default HeaderWithUser;
