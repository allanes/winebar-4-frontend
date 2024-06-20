import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Turno, InfoDeCierre } from '../../../../codegen_output';
import { PersonalInternoService } from '../../../../codegen_output';
import TurnoDetalle from '../../../TurnosContainer/TurnoDetail';
import InfoCierreForm from '../../../../hooks/useNewCierreCajaInfoCierreForm';
import CardReaderModal from '../../../ClientsContainer/CardReaderModal';
import Swal from 'sweetalert2';
import { useAuth } from '../../../auth/AuthContext';

interface CierreDeCajaProps {
    show: boolean;
    onHide: () => void;
    turnoData: Turno | null;
    handleGetTurnoInfo: () => void;
    handleCerrarTurno: (infoDeCierre: InfoDeCierre) => void;
    handleCambiarCajero: (infoDeCierre: InfoDeCierre, nuevoCajeroRfid: number) => void;
    onReloadStatus: () => void;
}

const CierreDeCaja = ({
    show,
    onHide,
    turnoData,
    handleGetTurnoInfo,
    handleCerrarTurno,
    handleCambiarCajero,
    onReloadStatus
}: CierreDeCajaProps) => {
    const [showInfoCierreForm, setShowInfoCierreForm] = useState(false);
    const [showCardReader, setShowCardReader] = useState(false);
    const [currentInfoCierre, setCurrentInfoCierre] = useState<InfoDeCierre | null>(null);

    const { user } = useAuth();

    const handleInfoCierreSubmit = (infoDeCierre: InfoDeCierre) => {
        setCurrentInfoCierre(infoDeCierre);
        handleCerrarTurno(infoDeCierre);
        setShowInfoCierreForm(false);
    };

    const handleCambiarCajeroClick = (infoDeCierre: InfoDeCierre) => {
        setCurrentInfoCierre(infoDeCierre);
        setShowCardReader(true);
    };

    const handleCardRead = async (tarjetaId: string) => {
        setShowCardReader(false);

        const tarjetaNumber = Number(tarjetaId);
        console.log('usuario logueado tarjeta:', user?.tarjeta?.id, 'Tipo:', typeof user?.tarjeta?.id);
        console.log('tarjeta leida:', tarjetaNumber, 'Tipo:', typeof tarjetaNumber);

        if (currentInfoCierre) {
            if (turnoData) {
                const usarioAperturaTurno = await PersonalInternoService.handleReadPersonalInternoByIdBackendApiV1PersonalIdGet(turnoData.abierto_por)
                if (user && user.tarjeta && usarioAperturaTurno.tarjeta && usarioAperturaTurno.tarjeta.id === tarjetaNumber) {
                    console.log('IDs match, showing SweetAlert');
                    try {
                        // Introduce a small delay before showing the SweetAlert
                        await new Promise(resolve => setTimeout(resolve, 100));

                        const result = await Swal.fire({
                            title: 'Está por abrir un turno con el mismo usuario que abrió el turno actual. ¿Continuar?',
                            showCancelButton: true,
                            confirmButtonText: 'Continuar',
                            cancelButtonText: 'Cancelar',
                            showConfirmButton: true
                        });

                        console.log('SweetAlert result:', result);
                        if (result.isConfirmed) {
                            console.log('Confirmed, changing cashier');
                            handleCambiarCajero(currentInfoCierre, tarjetaNumber);
                        } else {
                            console.log('Canceled by user');
                        }
                    } catch (error) {
                        console.error('SweetAlert failed:', error);
                    }
                } else {
                    console.log('IDs do not match, proceeding with handleCambiarCajero');
                    handleCambiarCajero(currentInfoCierre, tarjetaNumber);
                }
            } else {
                console.log('currentInfoCierre is null');
            }
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
                        onCambiarCajero={handleCambiarCajeroClick}
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