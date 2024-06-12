// CierreDeCaja.tsx
import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Turno, InfoDeCierre } from '../../../../codegen_output';
import TurnoDetalle from '../../../TurnosContainer/TurnoDetail';
import InfoCierreForm from '../../../../hooks/useNewCierreCajaInfoCierreForm';

interface CierreDeCajaProps {
    show: boolean;
    onHide: () => void;
    turnoData: Turno | null;
    handleGetTurnoInfo: () => void;
    handleCerrarTurno: (infoDeCierre: InfoDeCierre) => void;
    onReloadStatus: () => void;
}

const CierreDeCaja = ({ show, onHide, turnoData, handleGetTurnoInfo, handleCerrarTurno, onReloadStatus }: CierreDeCajaProps) => {
    const [showInfoCierreForm, setShowInfoCierreForm] = useState(false);

    const handleInfoCierreSubmit = (infoDeCierre: InfoDeCierre) => {
        handleCerrarTurno(infoDeCierre);
        setShowInfoCierreForm(false);
    };

    const handleContinuar = () => {
        setShowInfoCierreForm(true);
    };

    const handleOnHide = () => {
        onHide();
        setShowInfoCierreForm(false);
    }

    return (
        <Modal show={show} onHide={handleOnHide} centered size='lg'>
            <Modal.Header closeButton />
            <Modal.Body>
                {showInfoCierreForm ? (
                    <InfoCierreForm 
                        sumaCobradaOrdenes={turnoData?.suma_ordenes_cobradas || 0}
                        onSubmit={handleInfoCierreSubmit} 
                    />
                ) : (
                    <TurnoDetalle turnoData={turnoData} onReloadStatus={onReloadStatus} />
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleOnHide}>
                    Cancelar
                </Button>
                {!showInfoCierreForm && (
                    <Button className='boton-cop' onClick={handleContinuar} size='lg'>
                        Continuar
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}; 

export default CierreDeCaja;