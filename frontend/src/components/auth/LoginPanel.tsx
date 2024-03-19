import React, { useState } from 'react';
import CardReaderModal from '../ClientsContainer/CardReaderModal';
import { useAuth } from './AuthContext';

interface LoginPanelProps {
  target: string;
}

const LoginPanel: React.FC<LoginPanelProps> = ({ target }) => {
  const [showCardReader, setShowCardReader] = useState(true);
  const { isLoggedIn, user, login, logout } = useAuth();
  
  const handleCardRead = async (cardId: string) => {
    // setRfid(cardId); // This will trigger the useEffect above
    await login(cardId, target)
  };

  return (
    <CardReaderModal 
        show={showCardReader} 
        onHide={() => setShowCardReader(false)} 
        onCardRead={handleCardRead} 
        title="Login RFID" 
    />
  );
};

export default LoginPanel;
