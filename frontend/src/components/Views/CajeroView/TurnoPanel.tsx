// TurnoPanel.tsx
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const TurnoPanel = () => {
  // Placeholder functionality to close shift
  const handleCloseShift = () => {
    console.log('Shift closed');
  };

  return (
    <Card>
        <Card.Header>Información del turno actual</Card.Header>
        <Card.Body>
            <Card.Title>Turno Actual</Card.Title>
            <Card.Text>
                Here goes the current shift information...
            </Card.Text>
            <Button variant="danger" onClick={handleCloseShift}>Close Shift</Button>
        </Card.Body>
    </Card>
  );
};

export default TurnoPanel;
