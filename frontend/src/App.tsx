import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar/NavNar';
import { Header } from './components/Header/Header';
import { AdminView } from './components/Views/AdminView';
import CajeroView from './components/Views/CajeroView';

const renderSwitch = (props: string) => {
  switch (props) {
    case 'taperosView':
      return <AdminView />;
    case 'cajerosView':
      return <CajeroView />;
    default:
      return <AdminView />;
  }
};

interface appState {
  route: Array<string>
}

function App() {
  const [currentRoute, setCurrentRoute] = useState<appState["route"]>([]);

  useEffect(() => {
    setCurrentRoute((window.location.pathname).split("/"));
  }, [])
  
  useEffect(() => {
  }, [currentRoute])

  return (
    <>
      {renderSwitch(currentRoute[1])}
    </>
  );
}

export default App;
