// CierreDeCaja.tsx
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Turno, InfoDeCierre } from '../../../../codegen_output';
import TurnoDetalle from '../../../TurnosContainer/TurnoDetail';
import InfoCierreForm from '../../../../hooks/useNewCierreCajaInfoCierreForm';
import CardReaderModal from '../../../ClientsContainer/CardReaderModal';

interface CierreDeCajaProps {
    show: boolean;
    onHide: () => void;
    turnoData: Turno | null;
    handleGetTurnoInfo: () => void;
    handleCerrarTurno: (infoDeCierre: InfoDeCierre) => void;
    handleCambiarCajero: (infoDeCierre: InfoDeCierre, nuevoCajeroRfid: number) => void;
    onReloadStatus: () => void;
}

const CierreDeCaja = ({ show, onHide, turnoData, handleGetTurnoInfo, handleCerrarTurno, handleCambiarCajero, onReloadStatus }: CierreDeCajaProps) => {
    const [showInfoCierreForm, setShowInfoCierreForm] = useState(false);
    const [showCardReader, setShowCardReader] = useState(false);
    const [currentInfoCierre, setCurrentInfoCierre] = useState<InfoDeCierre | null>(null);

    const handleInfoCierreSubmit = (infoDeCierre: InfoDeCierre) => {
        setCurrentInfoCierre(infoDeCierre);
        handleCerrarTurno(infoDeCierre);
        setShowInfoCierreForm(false);
    };

    const handleCambiarCajeroClick = () => {
        if (currentInfoCierre) {
            setShowCardReader(true);
        } else {
            console.log("No InfoDeCierre available"); // Debugging line
        }
    };

    const handleCardRead = (tarjetaId: string) => {
        setShowCardReader(false);
        if (currentInfoCierre) {
            handleCambiarCajero(currentInfoCierre, Number(tarjetaId));
        }
    };

    const handleOnHide = () => {
        onHide();
        setShowInfoCierreForm(false);
        setShowCardReader(false);
    };

    const handleContinuar = () => {
        setShowInfoCierreForm(true);
    };

    return (
        <Modal show={show} onHide={handleOnHide} centered size='lg'>
            <Modal.Header closeButton />
            <Modal.Body>
                {showInfoCierreForm ? (
                    <InfoCierreForm 
                        sumaCobradaOrdenes={turnoData?.suma_ordenes_cobradas || 0}
                        onCerrarTurno={handleInfoCierreSubmit}
                        onCambiarCajero={() => handleCambiarCajeroClick()} // Ensure this is being called
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
            <CardReaderModal
                title='Tarjeta del Cajero NUEVO'
                show={showCardReader}
                onHide={() => setShowCardReader(false)}
                onCardRead={handleCardRead}
            />
        </Modal>
    );
}; 

export default CierreDeCaja;
