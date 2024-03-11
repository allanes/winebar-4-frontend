import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import logoBar from '../../assets/icons/logo.png'

interface HeaderWithUserProps {
  title: string;
  isLoggedIn: boolean;
  user: { name: string };
  onLogin: () => void; // Placeholder function for login action
  onLogout: () => void; // Function to handle logout
}

const HeaderWithUser: React.FC<HeaderWithUserProps> = ({ title, isLoggedIn, user, onLogin, onLogout }) => {
  return (
    <div className="container-fluid container-header text-white py-4">
        <div className="row align-items-center">
            <div className="col d-flex align-items-center">
                <img src={logoBar} className="float-start mx-4 logobar" alt="Logo del bar" />
                <h1 className='h5 text-center' >Altacava <br/>Winebar </h1>
            </div>
            <div className="col text-center">
                <h2>{title}</h2>
            </div>
            <div className="col text-end">
                {isLoggedIn ? (
                    <>
                        <p >{user.name}</p>
                        <p><Button variant="success" onClick={onLogout}>Cerrar sesión</Button></p>
                    </>
                ) : (
                    <Button variant="success" onClick={onLogin}>Iniciar sesión</Button>
                )}
            </div>		
        </div>
    </div>    
  );
};

export default HeaderWithUser;
