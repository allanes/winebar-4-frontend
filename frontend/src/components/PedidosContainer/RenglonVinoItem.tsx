import React, {useEffect, useState} from 'react';
import { ListGroup, Button, Card, Row, Col, Badge } from 'react-bootstrap';
import { Renglon, VinosService, Vino } from '../../codegen_output';
import { fetchVinoImageByNombre } from '../Common/ImageFetcher';
import tapaNotAvailableImage from '../../assets/icons/generic_tapa_not_available.webp'

interface RenglonVinoItemProps {
    renglonVino: Renglon;
}

const RenglonVinoItem: React.FC<RenglonVinoItemProps> = ({ renglonVino }) => {
    const [vinoDetails, setVinoDetails] = useState<Vino | null>(null);
    const [loadedImage, setLoadedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            const imageUrl = await fetchVinoImageByNombre(renglonVino.producto.titulo);
            setLoadedImage(imageUrl);
        };

        fetchImage();
    }, [renglonVino.producto.titulo]);

    useEffect(() => {
        const fetchVinoDetails = async () => {
            try {
                const response = await VinosService.handleReadVinoByProductIdBackendApiV1VinosProductIdGet(renglonVino.producto_id);
                setVinoDetails(response);
            } catch (error) {
                console.error("Failed to fetch vino details", error);
                // Handle error as needed
            }
        };

        if (renglonVino.producto_id) {
            fetchVinoDetails();
        }
    }, [renglonVino.producto_id]);

    const volumenKeys = ['15', '75', '150'] as const;
    type VolumenKey = typeof volumenKeys[number];

    const mapa_tamaños: { [key in VolumenKey]: string } = {
        '15': 'Degustacion',
        '75': 'Media Copa',
        '150': 'Copa'
    };

    const getTamañoVino = (volumen: string): string => {
        return mapa_tamaños[volumen as VolumenKey] || `Tamaño desconocido (${volumen} cc)`;
    };

    return (
        <div className="renglon-list">
            <Col>
                <Row md={7}>
                    <div className="cart-item">
                        <div className="card-content">
                            <Row className="d-flex align-items-center">
                                <Col md={3} className="text-center  ">
                                    <Badge bg='light' className='text-dark'>
                                        <Row>
                                            <h6>
                                                {/* <Badge pill bg={'secondary'} className=''> */}
                                                    {vinoDetails && getTamañoVino(`${vinoDetails.volumen}`)}
                                                {/* </Badge> */}
                                            </h6>
                                        </Row>
                                        <Row><p className=' '>
                                            {`${vinoDetails && vinoDetails.volumen} cc`}
                                        </p></Row>
                                    </Badge>
                                </Col>
                                <Col md={2} className='me-2 p-0'>
                                    <img
                                        src={loadedImage || tapaNotAvailableImage}
                                        alt="Tapa"
                                        style={{ width: '100%', height: 'auto' }}
                                    />                        
                                </Col>                
                                <Col md={6}>
                                    <Row>
                                        <h4><Badge bg='secondary' className='p-1'>$ {renglonVino.producto.precio}</Badge></h4>
                                    </Row>
                                    {/* <Row className='justify-content-end'>
                                        {renglonVino.promocion_aplicada && 
                                            <h6><Badge bg='warning'>Con Promo</Badge></h6>
                                        }                             
                                    </Row> */}
                                {/* </Col>
                                <Col md={4} className="cart-item-details"> */}
                                    <Row className='text-center'>
                                        <h5>{renglonVino.producto.titulo}</h5>
                                    </Row>
                                    
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Row>
            </Col>
        </div>
    );
};

export default RenglonVinoItem;