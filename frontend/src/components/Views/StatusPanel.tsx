// StatusPanel.tsx
import React from 'react';

const StatusPanel = () => {
  // Placeholder data - you'll fetch actual data from the backend
  const statusData = {
    activeClients: 42,
    shiftClients: 100,
    totalAmount: 5000,
  };

  return (
    <div>
      <h3>Status Metrics</h3>
      <p>Active Clients: {statusData.activeClients}</p>
      <p>Shift Clients: {statusData.shiftClients}</p>
      <p>Total Amount: ${statusData.totalAmount}</p>
    </div>
  );
};

export default StatusPanel;
