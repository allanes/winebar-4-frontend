import React, { useEffect, useState } from 'react';
import { Row, Col, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Renglon, PedidosService } from '../../codegen_output';
import { fetchTapaImageByProductId } from '../Common/ImageFetcher';
import tapaNotAvailableImage from '../../assets/icons/generic_tapa_not_available.webp';
import { XCircleFill } from 'react-bootstrap-icons'; // Import the red cross icon
import { handleApiError } from '../ClientsContainer/ClientsContainer';

interface RenglonTapaItemProps {
    renglon: Renglon;
}

const RenglonTapaItem: React.FC<RenglonTapaItemProps> = ({ renglon }) => {
    const [loadedImage, setLoadedImage] = useState<string | null>(null);
    const [showCancel, setShowCancel] = useState(false); // State to manage hover

    useEffect(() => {
        const fetchImage = async () => {
            const imageUrl = await fetchTapaImageByProductId(renglon.producto_id);
            setLoadedImage(imageUrl);
        };

        fetchImage();
    }, [renglon.producto_id]);

    const handleCancel = () => {
        try {
            // Call the API to cancel the renglon
            // PedidosService.handleCancelarRenglon(renglon.id) assuming this method exists and you pass the renglon id
            console.log('Canceling renglon:', renglon.id);
            PedidosService.handleCancelarRenglonBackendApiV1PedidosCancelarRenglonRenglonIdPost(renglon.id)
        } catch (error) {
            handleApiError(error);
        }
        
    };

    return (
        <div className="cart-item">
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
