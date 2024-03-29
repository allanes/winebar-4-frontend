// CierreDeCaja.tsx
import React, {useState, useEffect} from 'react';
import { Modal, Button, Row, Col, Badge, Accordion } from 'react-bootstrap';
import InfoCard from './InfoCard';
import { Turno, OrdenesService, OrdenCompra, OrdenCompraDetallada } from '../../../../codegen_output';
import TimestampFormateadoBadge from '../../../Common/TimestampFormateadoBadge';
import { OrdenesList } from '../../../OrdenesContainer/OrdenesList';
import TurnoDetalle from '../../../TurnosContainer/TurnoDetail';

interface CierreDeCajaProps {
    show: boolean;
    onHide: () => void;
    turnoData: Turno | null;
    handleGetTurnoInfo: () => void;
    handleCerrarTurno: () => void;
}

const CierreDeCaja = ({ show, onHide, turnoData, handleGetTurnoInfo, handleCerrarTurno }: CierreDeCajaProps) => {
    
    const handleConfirm = () => {
        handleCerrarTurno();
        // onHide();
    };

    
    return (
        <Modal show={show} onHide={onHide} centered size='lg'>
        <Modal.Header closeButton />
        <Modal.Body>
            <TurnoDetalle
                turnoData={turnoData}
                handleCerrarTurno={handleConfirm}
                handleGetTurnoInfo={handleGetTurnoInfo}
            />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
            Cancelar
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
            Confirmar Cierre
            </Button>
        </Modal.Footer>
        </Modal>
    );
};

export default CierreDeCaja;