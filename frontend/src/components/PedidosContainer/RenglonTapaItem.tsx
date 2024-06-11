import React, { useEffect, useState } from 'react';
import { Row, Col, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Renglon, PedidosService } from '../../codegen_output';
import Swal from 'sweetalert2';
import { fetchTapaImageByProductId } from '../Common/ImageFetcher';
import tapaNotAvailableImage from '../../assets/icons/generic_tapa_not_available.webp';
import { XCircleFill } from 'react-bootstrap-icons';
import { handleApiError } from '../ClientsContainer/ClientsContainer';

interface RenglonTapaItemProps {
    renglon: Renglon;
    refreshData: () => void;  // Passed from the parent to trigger a refresh
}

const RenglonTapaItem: React.FC<RenglonTapaItemProps> = ({ renglon, refreshData }) => {
    const [loadedImage, setLoadedImage] = useState<string | null>(null);
    const [showCancel, setShowCancel] = useState(false); // State to manage hover
    const [cancelled, setCancelled] = useState(false); // State to track if the renglon is cancelled

    useEffect(() => {
        const fetchImage = async () => {
            const imageUrl = await fetchTapaImageByProductId(renglon.producto_id);
            setLoadedImage(imageUrl);
        };
        
        fetchImage();
    }, [renglon.producto_id]);

    const handleCancel = async () => {
        const result = await Swal.fire({
            title: 'Cancelar Renglón',
            text: "El reglon será cancelado. Continuar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No'
        });

        if (result.isConfirmed) {
            try {
                // Assume cancellation is always successful
                await PedidosService.handleCancelarRenglonBackendApiV1PedidosCancelarRenglonRenglonIdPost(renglon.id);
                setCancelled(true); // Update the visual state to indicate cancellation
                refreshData(); // Call to refresh the parent component or modal
                Swal.fire('Cancelado Correctamente!', 'Este renglón fue cancelado del pedido.', 'success');
            } catch (error) {
                handleApiError(error);
            }
        }
    };

    const itemStyle = cancelled ? { opacity: 0.1 } : {}; // Style to darken the item if cancelled

    return (
        <div className="cart-item" style={itemStyle}>
            <div className="card-content">
                <Row className="d-flex align-items-center">
                    <Col md={2} className="text-center">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>{showCancel ? 'Cancelar Renglon' : 'Cantidad'}</Tooltip>}
                            onToggle={setShowCancel}
                        >
                            <Badge bg={showCancel ? 'danger' : 'light'} className='text-dark' onClick={showCancel ? handleCancel : undefined}>
                                {showCancel ? <XCircleFill color="white" /> : renglon.cantidad}
                            </Badge>
                        </OverlayTrigger>
                    </Col>
                    <Col md={2} className='me-2 p-0'>
                        <img
                            src={loadedImage || tapaNotAvailableImage}
                            alt="Tapa"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Col>
                    <Col md={3}>
                        <Row>
                            <h4><Badge bg='secondary' className='p-1'>$ {renglon.monto.toLocaleString('es-ES')}</Badge></h4>
                        </Row>
                        <Row className='justify-content-end'>
                            {renglon.promocion_aplicada &&
                                <h6><Badge bg='warning'>Con Promo</Badge></h6>
                            }
                        </Row>
                    </Col>
                    <Col md={4} className="cart-item-details">
                        <Row className='text-center'>
                            <h5>{renglon.producto.titulo}</h5>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default RenglonTapaItem;
