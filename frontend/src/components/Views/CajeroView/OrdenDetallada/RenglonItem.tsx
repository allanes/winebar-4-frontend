import React, {useEffect, useState} from 'react';
import { ListGroup, Button, Card, Row, Col, Badge } from 'react-bootstrap';
import { Renglon, Tapa } from '../../../../codegen_output';
import { fetchTapaImageByProductId } from '../../../Common/ImageFetcher';
import tapaNotAvailableImage from '../../../../assets/icons/generic_tapa_not_available.webp'

interface RenglonItemProps {
    renglon: Renglon;
}

const RenglonItem: React.FC<RenglonItemProps> = ({ renglon }) => {
    const [loadedImage, setLoadedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
        const imageUrl = await fetchTapaImageByProductId(renglon.producto_id); // Use the fetchTapaImage function
            setLoadedImage(imageUrl);
        };

        fetchImage();
    }, [renglon.producto_id]);

    return (
        <div className="cart-item">
            <div className="card-content">
                <Row className="d-flex align-items-center">
                    <Col md={1} className="cart-item-quantity ">                        
                        {renglon.cantidad}
                    </Col>
                    <Col md={2} className='me-2 p-0'>
                        <img
                            src={loadedImage || tapaNotAvailableImage}
                            alt="Tapa"
                            style={{ width: '100%', height: 'auto' }}
                        />                        
                    </Col>                
                    <Col md={3}>
                        <h3><Badge bg='secondary' className='p-1'>$ {renglon.monto}</Badge></h3>
                    </Col>
                    <Col className="cart-item-details">
                        <Row className='text-start'>
                            <h4>{renglon.producto.titulo}</h4>
                        </Row>
                        <Row md={4} className='justify-content-end me-5 pe-3'>
                            {renglon.promocion_aplicada && 
                                <h5><Badge bg='warning'>Con Promo</Badge></h5>
                            }                            
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default RenglonItem;