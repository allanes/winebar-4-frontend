// InfoCierreForm.tsx
import React, { useState } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import InfoCard from '../components/Views/CajeroView/StatusPanel/InfoCard';
import { InfoDeCierre } from '../codegen_output';

interface InfoCierreFormProps {
    sumaCobradaOrdenes: number;
    onSubmit: (infoDeCierre: InfoDeCierre) => void;
}

const InfoCierreForm = ({ sumaCobradaOrdenes, onSubmit }: InfoCierreFormProps) => {
    const [comentarios, setComentarios] = useState('');
    const [montoEnCaja, setMontoEnCaja] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ comentarios, monto_en_caja: montoEnCaja });
    };

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <InfoCard
                        title='Suma Cobrada'
                        count={sumaCobradaOrdenes}
                    />
                    <Form.Group controlId="montoEnCaja">
                        <Form.Label>Monto en Caja</Form.Label>
                        <Form.Control
                            type="number"
                            value={montoEnCaja}
                            onChange={(e) => setMontoEnCaja(parseFloat(e.target.value))}
                        />
                    </Form.Group>

                    <Form.Group controlId="comentarios">
                        <Form.Label>Comentarios</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={comentarios}
                            onChange={(e) => setComentarios(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" size='lg'>
                        Confirmar Cierre
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default InfoCierreForm;