// FormGroupMontoCobrado.tsx
import React from 'react';
import { Form, InputGroup, Row, Col, Button, Card } from 'react-bootstrap';

interface FormGroupMontoProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    max: number;
    onFillRemainingAmount: () => void;
    onFillTotalAmount: () => void;
}

const FormGroupMontoCobrado = ({
    label,
    name,
    value,
    onChange,
    max,
    onFillRemainingAmount,
    onFillTotalAmount,
}: FormGroupMontoProps) => {
    return (
        <Card className="mb-3">
            <Card.Header>
                <strong>{label}</strong>
            </Card.Header>
            <Card.Body>
                <Form.Group controlId={name}>
                    <Row className='align-items-center'>
                        <Col>
                            <Row>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        name={name}
                                        step="0.01"
                                        min="0"
                                        max={max + 1000}
                                        value={value}
                                        onChange={onChange}
                                    />
                                </InputGroup>
                            </Row>
                            <Row className='mt-2 justify-content-end'>
                                <Col>
                                    <Button variant="outline-secondary" onClick={onFillRemainingAmount} size='sm'>
                                        Restante
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="outline-secondary" onClick={onFillTotalAmount} size='sm' >
                                        Total
                                    </Button>
                                </Col>
                            </Row>
                        </Col>                        
                    </Row>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default FormGroupMontoCobrado;