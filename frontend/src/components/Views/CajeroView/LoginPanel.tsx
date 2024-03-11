import React, { useState, useEffect } from 'react';
import CardReaderModal from '../../ClientsContainer/CardReaderModal';
import { Token, LoginService, Body_login_backend_api_v1_login_access_token_post, ApiError } from '../../../codegen_output';
import Swal from 'sweetalert2';

interface LoginPanelProps {
  onLoginSuccess: (token: Token) => void;
}

const LoginPanel: React.FC<LoginPanelProps> = ({ onLoginSuccess }) => {
  const [rfid, setRfid] = useState('');
  const [password, setPassword] = useState('');
  const [showCardReader, setShowCardReader] = useState(true);

  useEffect(() => {
    fetchPassword(false);
  }, []);

  useEffect(() => {
    if (rfid) {
      console.log('Tarjeta configurada: ' + rfid);
      handleLogin();
    }
  }, [rfid]); // This useEffect runs when 'rfid' changes.

  const fetchPassword = async (raise_exc = true) => {
    try {
      const response = await fetch('http://localhost:3001/getPassword');
      const data = await response.json();
      setPassword(data.api_key);
    } catch (error) {
      console.error('Failed to fetch password', error);
      if (raise_exc === true) {
        handleApiError(error);
      }
    }
  };

  const handleApiError = (error: unknown) => {
    const err = error as ApiError;
    let errorMessage = 'Ocurrió un error.';
    if (err.body && err.body.detail) {
      errorMessage = err.body.detail;
    }
    Swal.fire('Error', errorMessage, 'error');
  };

  const handleLogin = async () => {
    if (!password || !rfid) {
      console.error('Login failed: Missing RFID or password');
      return;
    }

    try {
      const loginData: Body_login_backend_api_v1_login_access_token_post = {
        username: rfid,
        password: password,
      };
      const response = await LoginService.loginBackendApiV1LoginAccessTokenPost(loginData);
      onLoginSuccess(response); // Assuming the token is in response.data
    } catch (error) {
      console.error('Login failed', error);
      handleApiError(error);
    }
};

  const handleCardRead = (cardId: string) => {
    setRfid(cardId); // This will trigger the useEffect above
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
