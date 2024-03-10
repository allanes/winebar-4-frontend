import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import CardReaderModal from '../../ClientsContainer/CardReaderModal';
import { LoginService } from '../../../codegen_output/services/LoginService';

const LoginPanel = () => {
    const [rfid, setRfid] = useState('');
    const [showCardReader, setShowCardReader] = useState(false);

    const handleLogin = async () => {
        try {
            // Simulate reading RFID from card reader
            // Correctly construct the object expected by the login method
            const loginData: Body_login_backend_api_v1_login_access_token_post = {
                username: rfid, // Assuming 'username' field can be used for RFID
                password: '', // Assuming password is not needed for RFID login
            };
            const response = await LoginService.loginBackendApiV1LoginAccessTokenPost(loginData, true);
            console.log('Login successful', response);
            // Proceed with login success actions
        } catch (error) {
            console.error('Login failed', error);
            // Handle login failure
        }
    };
    
    const handleCardRead = (cardId: string) => {
        setRfid(cardId);
        handleLogin();
    };

    return (
        <Card>
            <Card.Body>
                <Button onClick={() => setShowCardReader(true)}>Login with RFID</Button>
                <CardReaderModal show={showCardReader} onHide={() => setShowCardReader(false)} onCardRead={handleCardRead} title="Login RFID" />
            </Card.Body>
        </Card>
    );

    
};

export default LoginPanel;
