// InfoCierreForm.tsx
import React, { useState } from 'react';
import { Form, Card, Button, Col, Row } from 'react-bootstrap';
import InfoCard from '../components/Views/CajeroView/StatusPanel/InfoCard';
import { InfoDeCierre } from '../codegen_output';

interface InfoCierreFormProps {
    sumaCobradaOrdenes: number;
    onCerrarTurno: (infoDeCierre: InfoDeCierre) => void;
    onCambiarCajero: (infoDeCierre: InfoDeCierre) => void;
}

const InfoCierreForm = ({ sumaCobradaOrdenes, onCerrarTurno, onCambiarCajero }: InfoCierreFormProps) => {
    const [comentarios, setComentarios] = useState('');
    const [montoEnCaja, setMontoEnCaja] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCerrarTurno({ comentarios, monto_en_caja: montoEnCaja });
    };

    const handleCambiarCajeroSubmit = () => {
        onCambiarCajero({ comentarios, monto_en_caja: montoEnCaja });
    };

    return (
        <Card className='card-in-modal-content'>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Col md={7} className='m-3'>
                        <Row>
                            <InfoCard
                                title='Suma Cobrada'
                                count={`$${sumaCobradaOrdenes}`}
                            />
                        </Row>
                        <Row className='mt-4'>
                            <Form.Group controlId="montoEnCaja">
                                <Form.Label>Monto en Caja</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={montoEnCaja}
                                    onChange={(e) => setMontoEnCaja(parseFloat(e.target.value))}  
                                />
                            </Form.Group>
                        </Row>
                        <Row className='mt-4'>
                            <Form.Group controlId="comentarios">
                                <Form.Label>Comentarios</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={comentarios}
                                    onChange={(e) => setComentarios(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row className='mt-4'>
                            <Col>
                                <Button type="submit" className='boton-cop'>
                                    Cerrar Turno
                                </Button>
                            </Col>
                            <Col>
                                <Button onClick={handleCambiarCajeroSubmit} className='boton-cop'>
                                    Cambiar Cajero
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default InfoCierreForm;
