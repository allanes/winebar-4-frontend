import React, {useEffect, useState} from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { Renglon, VinosService, Vino, PedidosService } from '../../codegen_output';
import { fetchVinoImageByNombre } from '../Common/ImageFetcher';
import tapaNotAvailableImage from '../../assets/icons/generic_tapa_not_available.webp'
import { handleApiError } from '../ClientsContainer/ClientsContainer';
import Swal from 'sweetalert2';
import { XCircleFill } from 'react-bootstrap-icons';

interface RenglonVinoItemProps {
    renglonVino: Renglon;
    refreshData: () => void;
}

const RenglonVinoItem: React.FC<RenglonVinoItemProps> = ({ renglonVino, refreshData }) => {
    const [vinoDetails, setVinoDetails] = useState<Vino | null>(null);
    const [loadedImage, setLoadedImage] = useState<string | null>(null);
    const [hover, setHover] = useState(false);
    const [isCancelled, setIsCancelled] = useState(renglonVino.monto === 0);  

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

    const volumenKeys = ['25', '75', '150'] as const;
    type VolumenKey = typeof volumenKeys[number];

    const mapa_tamaños: { [key in VolumenKey]: string } = {
        '25': 'Degustacion',
        '75': 'Media Copa',
        '150': 'Copa'
    };

    const getTamañoVino = (volumen: string): string => {
        return mapa_tamaños[volumen as VolumenKey] || `(${volumen} cc)`;
    };

    const handleCancel = async () => {
        if (isCancelled) return;  // No action if already cancelled

        const result = await Swal.fire({
            title: 'Cancelar Renglón',
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
                await PedidosService.handleCancelarRenglonBackendApiV1PedidosCancelarRenglonRenglonIdPost(renglonVino.id);
                setIsCancelled(true); // Update state to reflect cancellation
                refreshData();  // Optionally refresh data if needed
                Swal.fire('Cancelado', 'El renglón ha sido cancelado.', 'success');
            } catch (error) {
                handleApiError(error);
            }
        }
    };

    const itemStyle = isCancelled ? { opacity: 0.4, backgroundColor: "#ccc" } : {};

    return (
        <div className="renglon-list">
            <Col>
                <Row md={7}>
                    <div className="cart-item" style={itemStyle}>
                        <div className="card-content">
                            <Row className="d-flex align-items-center">
                                <Col md={3} className="text-center  ">
                                    <Badge 
                                        bg='light' 
                                        className='text-dark'
                                        onMouseEnter={() => !isCancelled && setHover(true)}
                                        onMouseLeave={() => setHover(false)}
                                        onClick={!isCancelled ? handleCancel : undefined}
                                    >
                                        <Row>
                                            {
                                                hover && !isCancelled ? 
                                                    <XCircleFill color="red" /> 
                                                :
                                                    <h6>{vinoDetails && getTamañoVino(`${vinoDetails.volumen}`)}</h6>
                                            }
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
                                        <h4><Badge bg='success' className='p-1'>$ {renglonVino.monto}</Badge></h4>
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