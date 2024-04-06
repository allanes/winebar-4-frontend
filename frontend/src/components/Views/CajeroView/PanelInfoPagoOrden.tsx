// PanelInfoPagoOrden.tsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { OrdenCompraInfoPago, OrdenCompraDetallada } from '../../../codegen_output';
import useOrdenCompraInfoPagoForm from '../../../hooks/useOrdenCompraInfoPagoForm';
import InfoCard from './StatusPanel/InfoCard';

interface PanelInfoPagoOrdenProps {
    show: boolean;
    onHide: () => void;
    onSubmit: (infoPago: OrdenCompraInfoPago) => void;
    ordenData: OrdenCompraDetallada;
}

const PanelInfoPagoOrden = ({ show, onHide, onSubmit, ordenData }: PanelInfoPagoOrdenProps) => {
    const { form, handleChange, handleSubmit } = useOrdenCompraInfoPagoForm(onSubmit);

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Información de Pago</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InfoCard title='A Cobrar' count={`$${ordenData.monto_cargado}`} />
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="cobradoEfectivo">
                        <Form.Label>Recibido en Efectivo</Form.Label>
                        <Form.Control
                            type="number"
                            name="cobrado_efectivo"
                            value={form.cobrado_efectivo || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="cobradoTarjeta">
                        <Form.Label>Recibido con Tarjeta</Form.Label>
                        <Form.Control
                            type="number"
                            name="cobrado_tarjeta"
                            value={form.cobrado_tarjeta || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="cobradoTransferencia">
                        <Form.Label>Recibido por Transferencia</Form.Label>
                        <Form.Control
                            type="number"
                            name="cobrado_transferencia"
                            value={form.cobrado_transferencia || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="comentarios">
                        <Form.Label>Comentarios</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="comentarios"
                            value={form.comentarios || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Confirmar Pago
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PanelInfoPagoOrden;