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
                    <Col md={2} className="text-center  ">
                        <Badge bg='light' className='text-dark'>
                            <Row>
                                <h6>
                                    <Badge pill bg={'secondary'} className=''>
                                        {renglon.cantidad}
                                    </Badge>
                                </h6>
                            </Row>
                            <Row><p className=' '>Cant.</p></Row>
                        </Badge>
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
                            <h4><Badge bg='secondary' className='p-1'>$ {renglon.monto}</Badge></h4>
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

export default RenglonItem;