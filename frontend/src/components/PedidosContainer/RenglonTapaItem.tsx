import React, { useEffect, useState } from 'react';
import { Row, Col, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Renglon, PedidosService } from '../../codegen_output';
import Swal from 'sweetalert2';
import { XCircleFill } from 'react-bootstrap-icons';
import { fetchTapaImageByProductId } from '../Common/ImageFetcher';
import tapaNotAvailableImage from '../../assets/icons/generic_tapa_not_available.webp';
import { handleApiError } from '../ClientsContainer/ClientsContainer';

interface RenglonTapaItemProps {
    renglon: Renglon;
    refreshData: () => void;  // Trigger to refresh parent data
}

const RenglonTapaItem: React.FC<RenglonTapaItemProps> = ({ renglon, refreshData }) => {
    const [loadedImage, setLoadedImage] = useState<string | null>(null);
    const [isCancelled, setIsCancelled] = useState(renglon.monto === 0);  // Directly reflect cancellation based on data

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageUrl = await fetchTapaImageByProductId(renglon.producto_id);
                setLoadedImage(imageUrl);
            } catch (error) {
                setLoadedImage(tapaNotAvailableImage);  // Fallback image on error
            }
        };
        fetchImage();
    }, [renglon.producto_id]);

    const handleCancel = async () => {
        const result = await Swal.fire({
            title: '¿Cancelar Renglón?',
            text: "El renglón será cancelado. ¿Continuar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No'
        });

        if (result.isConfirmed) {
            try {
                await PedidosService.handleCancelarRenglonBackendApiV1PedidosCancelarRenglonRenglonIdPost(renglon.id);
                setIsCancelled(true); // Update state to reflect cancellation
                refreshData(); // Optionally refresh data if needed
                Swal.fire('Cancelado', 'El renglón ha sido cancelado.', 'success');
            } catch (error) {
                handleApiError(error);
            }
        }
    };

    // Conditional styling based on cancellation state
    const itemStyle = isCancelled ? { opacity: 0.4, backgroundColor: "#ccc" } : {};

    return (
        <div className="cart-item" style={itemStyle}>
            <div className="card-content">
                <Row className="d-flex align-items-center">
                    <Col md={2} className="text-center">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>{isCancelled ? 'Cancelado' : 'Cancelar'}</Tooltip>}>
                            <Badge bg={isCancelled ? 'secondary' : 'light'} className='text-dark' onClick={isCancelled ? undefined : handleCancel}>
                                {isCancelled ? <XCircleFill color="red" /> : renglon.cantidad}
                            </Badge>
                        </OverlayTrigger>
                    </Col>
                    <Col md={2} className='me-2 p-0'>
                        <img src={loadedImage || tapaNotAvailableImage} alt="Tapa" style={{ width: '100%', height: 'auto' }} />
                    </Col>
                    <Col md={3}>
                        <Row>
                            <h4><Badge bg='secondary' className='p-1'>$ {renglon.monto.toLocaleString('es-ES')}</Badge></h4>
                        </Row>
                        <Row className='justify-content-end'>
                            {renglon.promocion_aplicada && <h6><Badge bg='warning'>Con Promo</Badge></h6>}
                        </Row>
                    </Col>
                    <Col md={4} className="cart-item-details">
                        <Row className='text-center'><h5>{renglon.producto.titulo}</h5></Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default RenglonTapaItem
