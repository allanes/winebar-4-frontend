import React, { useState } from 'react';
import LoginPanel from '../auth/LoginPanel';
import { PersonalInterno, LoginService, Token, OpenAPI } from '../../codegen_output';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../Header/Header';
import HeaderWithUser from '../Header/HeaderWithUser';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SideBar } from '../SideBar/SideBar';
import { ClientsContainer } from '../ClientsContainer/ClientsContainer';
import { PersonalInternoContainer } from '../PersonalContainer/PersonalContainer';
import { TarjetasContainer } from '../TarjetasContainer/TarjetasContainer';
import { OrdenesContainer } from '../OrdenesContainer/OrdenesContainer';
import { TurnosContainer } from '../TurnosContainer/TurnosContainer';
import { TapasContainer } from '../TapasContainer/TapasContainer';
import { categoriesList_sidebar } from '../../types/categoriesList_sidebar';
import { useAuth } from '../auth/AuthContext';
import Error404 from './Error404';

export const AdminView: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [usuarioLogueado, setUsuarioLogueado] = useState<PersonalInterno | null>(null);
  const { isLoggedIn, user, logout } = useAuth();

  // const handleLoginSuccess = async (token: Token) => {
  //   localStorage.setItem('token', token.access_token); // Save token locally
  //   OpenAPI.TOKEN = token.access_token;
  //   try {
  //     const usuarioLogueadoData = await LoginService.readUsersMeBackendApiV1LoginUsersMeGet();
  //     setUsuarioLogueado(usuarioLogueadoData);
  //     setIsLoggedIn(true);
  //     setShowLoginModal(false);
  //   } catch (error) {
  //     console.error("Error fetching user data", error);
  //   }
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem('token'); // Clear token
  //   OpenAPI.TOKEN = '';
  //   setIsLoggedIn(false);
  //   setUsuarioLogueado(null);
  // };

  // const handleShowLoginModal = () => {
  //   setShowLoginModal(true);
  // };

  return (
    <>
      {/* <Header title='Panel de Administración' /> */}
      <HeaderWithUser 
        title='Panel de Administración'         
      />
      {showLoginModal && <LoginPanel target='caja' />}
      
        <div className='mi-app back-grey'>
          <Router>
            <div className='sidebar-container'>
              {isLoggedIn &&
                <SideBar />
              }
            </div>
            <div className='pages-container'>
              <Routes>
                <Route path='/' element={<ClientsContainer />} />
                <Route path={categoriesList_sidebar[1].link} element={<PersonalInternoContainer />} />
                <Route path={categoriesList_sidebar[2].link} element={<TarjetasContainer />} />
                <Route path={categoriesList_sidebar[3].link} element={<OrdenesContainer />} />
                <Route path={categoriesList_sidebar[4].link} element={<TurnosContainer />} />
                <Route path={categoriesList_sidebar[5].link} element={<TapasContainer />} />
                <Route path='*' element={<Error404 />} />
              </Routes>
            </div>
          </Router>
        </div>
    </>
  );
}

