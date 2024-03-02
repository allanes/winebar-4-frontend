import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar/NavNar';
import { Header } from './components/Header/Header';
import { AdminView } from './components/Views/AdminView';

function App() {
  return (
    <div>
      <Header />
      <AdminView />
    </div>
  );
}

export default App;
