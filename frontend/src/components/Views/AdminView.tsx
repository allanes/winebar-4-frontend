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
  const { isLoggedIn } = useAuth();

  return (
    <>
      <HeaderWithUser 
        title='Panel de Administración'
        target='admin'
      />
        <div className='mi-app back-grey'>
          <Router>
            <div className='sidebar-container'>
              <SideBar />              
            </div>
            {isLoggedIn && 
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
            }
          </Router>
        </div>
    </>
  );
}

