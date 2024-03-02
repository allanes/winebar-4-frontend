import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../Header/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SideBar } from '../SideBar/SideBar';
import { ClientsContainer } from '../ClientsContainer/ClientsContainer';
// import { OfficesContainer } from '../OfficesContainer/OfficesContainer';
// import { DoctorsContainer } from '../DoctorsContainer/DoctorsContainer';
// import { PatientsContainer } from '../PatientsContainer/PatientsContainer';
// import { categoriesList_sidebar, url_waitingRoom } from '../../types/categoriesList_sidebar';
// import { OfficesContainerPatientView } from '../OfficesContainerPatientView/OfficesContainerPatientView';
// import { DownloadsContainer } from '../DownloadsContainer/DownloadsContainer';
import Error404 from './Error404';

export const AdminView = () => {
  return (
    <>
      <Header />
      <div className='mi-app back-grey'>
        <Router>
          <div className='sidebar-container'>
            <SideBar />
          </div>
          <div className='pages-container'>
            <Routes>
              <Route path='/' element={<ClientsContainer />} />
              {/* <Route path={categoriesList_sidebar[1].link} element={<OfficesContainer />} />
              <Route path={categoriesList_sidebar[2].link} element={<PatientsContainer />} />
              <Route path={categoriesList_sidebar[3].link} element={<DoctorsContainer />} />
              <Route path={`${url_waitingRoom}/:query`} element={<OfficesContainerPatientView />} />
              <Route path={categoriesList_sidebar[7].link} element={<DownloadsContainer />} /> */}
              <Route path='*' element={<Error404 />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

