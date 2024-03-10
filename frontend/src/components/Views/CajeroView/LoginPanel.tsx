import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { LoginService } from '../../../codegen_output/services/LoginService';

const LoginPanel = () => {
    const [rfid, setRfid] = useState('');

    const handleLogin = async () => {
        try {
            // Simulate reading RFID from card reader
            const formData = new FormData();
            formData.append('username', rfid); // Assuming 'username' field can be used for RFID
            formData.append('password', ''); // Assuming password is not needed for RFID login
            const response = await LoginService.loginBackendApiV1LoginAccessTokenPost(formData, true);
            console.log('Login successful', response);
            // Proceed with login success actions
        } catch (error) {
            console.error('Login failed', error);
            // Handle login failure
        }
    };

    return (
        <Card>
            <Card.Body>
                <Button onClick={handleLogin}>Login with RFID</Button>
            </Card.Body>
        </Card>
    );
};

export default LoginPanel;
