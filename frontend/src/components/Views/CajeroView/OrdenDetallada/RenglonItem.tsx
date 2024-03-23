import React from 'react';
import { ListGroup, Button, Card, Row, Col, Badge } from 'react-bootstrap';
import { Renglon } from '../../../../codegen_output';
import tapaNotAvailableImage from '../../../../assets/icons/generic_tapa_not_available.webp'

interface RenglonItemProps {
    renglon: Renglon;
}

const RenglonItem: React.FC<RenglonItemProps> = ({ renglon }) => {
    return (
        <div className="cart-item">
            <div className="card-content">
                <Row className="d-flex align-items-center">
                    <Col md={1} className="cart-item-quantity ">                        
                        {renglon.cantidad}
                    </Col>
                    <Col md={1} className='me-2'>
                        <div className="cart-item-image">
                            <img src={tapaNotAvailableImage} alt={renglon.producto.titulo} />
                        </div>
                    </Col>                
                    <Col md={3}>
                        <h3><Badge bg='secondary' className='p-1'>$ {renglon.monto}</Badge></h3>
                    </Col>
                    <Col className="cart-item-details">
                        <Row className='text-start'>
                            <h4>{renglon.producto.titulo}</h4>
                        </Row>
                        <Row md={4} className='justify-content-end me-5'>
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