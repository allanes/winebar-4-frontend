// TurnoPanel.tsx
import React from 'react';
import { Button } from 'react-bootstrap';

const TurnoPanel = () => {
  // Placeholder functionality to close shift
  const handleCloseShift = () => {
    console.log('Shift closed');
  };

  return (
    <div>
      <h3>Información del turno actual</h3>
      <Button variant="danger" onClick={handleCloseShift}>Close Shift</Button>
    </div>
  );
};

export default TurnoPanel;
