import React from 'react';
import { ListGroup, Button, Card, Row, Col } from 'react-bootstrap';
import { Renglon } from '../../../../codegen_output';
import tapaNotAvailableImage from '../../../../assets/icons/generic_tapa_not_available.webp'

interface RenglonItemProps {
    renglon: Renglon;
}

const RenglonItem: React.FC<RenglonItemProps> = ({ renglon }) => {
    return (
        <Card className="cart-item">
            <div className="card-content">
                <div className="d-flex align-items-center">
                {/* Product Image */}
                <div className="cart-item-image">
                    <img src={tapaNotAvailableImage} alt={renglon.producto.titulo} />
                </div>
                {/* Quantity Buttons */}
                <div className="cart-item-quantity">
                    <span>{renglon.cantidad}</span>
                </div>
                {/* Product Details */}
                <div className="cart-item-details">
                    <div>{renglon.producto.titulo}</div>            
            </div>
            <div>
                </div>
                    <p><strong>Monto:</strong> {renglon.monto}</p>
                    <p><strong>Promoción aplicada:</strong> {renglon.promocion_aplicada ? 'Sí' : 'No'}</p>
                </div>
            </div>
        </Card>
    );
};

export default RenglonItem;