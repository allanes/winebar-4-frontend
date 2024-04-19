// PanelInfoPagoOrden.tsx
import React from 'react';
import { Modal, Button, Form, Row, Col, Badge } from 'react-bootstrap';
import { OrdenCompraInfoPago, OrdenCompraDetallada } from '../../../codegen_output';
import useOrdenCompraInfoPagoForm from '../../../hooks/useOrdenCompraInfoPagoForm';
import InfoCard from './StatusPanel/InfoCard';
import FormGroupMontoCobrado from './FormGroupMedioDePagoCobradoComponent';

interface PanelInfoPagoOrdenProps {
    show: boolean;
    onHide: () => void;
    onSubmit: (infoPago: OrdenCompraInfoPago) => void;
    ordenData: OrdenCompraDetallada;
}

const PanelInfoPagoOrden = ({ show, onHide, onSubmit, ordenData }: PanelInfoPagoOrdenProps) => {
    const { form, handleChange, handleSubmit } = useOrdenCompraInfoPagoForm(onSubmit);

    const fillRemainingAmount = (field: keyof OrdenCompraInfoPago) => {
        const totalPaid = (form.cobrado_efectivo || 0) + (form.cobrado_tarjeta || 0) + (form.cobrado_transferencia || 0);
        const remainingAmount = ordenData.monto_cargado - totalPaid + Number(form[field] || 0);
        handleChange({ target: { name: field, value: remainingAmount.toString() } } as React.ChangeEvent<HTMLInputElement>);
    };

    const fillTotalAmount = (field: keyof OrdenCompraInfoPago) => {
        handleChange({ target: { name: field, value: ordenData.monto_cargado.toString() } } as React.ChangeEvent<HTMLInputElement>);
    };

    const totalPaid = (form.cobrado_efectivo || 0) + (form.cobrado_tarjeta || 0) + (form.cobrado_transferencia || 0);
    const remainingAmount = ordenData.monto_cargado - totalPaid;

    return (
        <Modal show={show} onHide={onHide} centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Información de Pago</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <Row className='mb-4'><h2>
                    Ingresar medio de pago usado
                </h2></Row>

                <Form onSubmit={handleSubmit}>
                    <Row >
                        <Col md={4}>
                            <FormGroupMontoCobrado
                                label="Efectivo"
                                name="cobrado_efectivo"
                                value={form.cobrado_efectivo?.toString() || ''}
                                onChange={handleChange}
                                max={ordenData.monto_cargado}
                                onFillRemainingAmount={() => fillRemainingAmount('cobrado_efectivo')}
                                onFillTotalAmount={() => fillTotalAmount('cobrado_efectivo')}
                            />
                        </Col>
                        <Col md={4}>
                            <FormGroupMontoCobrado
                                label="Tarjeta"
                                name="cobrado_tarjeta"
                                value={form.cobrado_tarjeta?.toString() || ''}
                                onChange={handleChange}
                                max={ordenData.monto_cargado}
                                onFillRemainingAmount={() => fillRemainingAmount('cobrado_tarjeta')}
                                onFillTotalAmount={() => fillTotalAmount('cobrado_tarjeta')}
                            />
                        </Col>
                        <Col md={4}>
                            <FormGroupMontoCobrado
                                label="Transferencia"
                                name="cobrado_transferencia"
                                value={form.cobrado_transferencia?.toString() || ''}
                                onChange={handleChange}
                                max={ordenData.monto_cargado}
                                onFillRemainingAmount={() => fillRemainingAmount('cobrado_transferencia')}
                                onFillTotalAmount={() => fillTotalAmount('cobrado_transferencia')}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="comentarios" className="mb-3">                        
                                <Form.Label>Comentarios</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="comentarios"
                                    value={form.comentarios || ''}
                                    onChange={handleChange}
                                    rows={3}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>Recibido:</strong> ${totalPaid.toFixed(2)}
                                </div>
                                <div>
                                    <h4><Badge bg='warning'>A Cobrar: <strong>${ordenData.monto_cargado.toFixed(2)}</strong></Badge></h4>
                                </div>
                                <div>
                                    <strong>Restante:</strong> ${remainingAmount.toFixed(2)}
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className="d-grid">
                                <Button variant="primary" type="submit" size="lg" disabled={remainingAmount !== 0}>
                                    Confirmar Pago
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PanelInfoPagoOrden;