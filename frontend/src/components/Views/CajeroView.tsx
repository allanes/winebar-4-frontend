// CajeroView.tsx
import React from 'react';
import { Header } from '../Header/Header';
import TurnoPanel from './TurnoPanel';
import AccionesPanel from './AccionesPanel';
import StatusPanel from './StatusPanel';

const CajeroView = () => {
  return (
    <div>
      <Header />
      <TurnoPanel />
      <AccionesPanel />
      <StatusPanel />
    </div>
  );
};

export default CajeroView;
