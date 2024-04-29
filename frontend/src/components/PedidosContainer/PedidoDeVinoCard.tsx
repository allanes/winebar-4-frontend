import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { Pedido } from '../../codegen_output';
import RenglonVinoItem from './RenglonVinoItem';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';
import { CheckCircleFill, ExclamationCircle, CurrencyDollar } from 'react-bootstrap-icons';

interface PedidoDeVinoCardProps {
    pedidoDeVino: Pedido;
    pedidoNumberedNumber: number;
}

const PedidoDeVinoCard: React.FC<PedidoDeVinoCardProps> = ({ pedidoDeVino, pedidoNumberedNumber }) => {
    // Calculate the total cantidad of all renglones
    const totalCantidad = 1;

    return (
        <Col>
            <Row className=''>
                <Card className="pedido-card">
                    <Card.Header >
                        <Row md={12}>
                            <Col md={4}>
                                <h6><strong>Pedido {pedidoNumberedNumber}</strong></h6>
                            </Col>
                            <Col md={4}>
                                {pedidoDeVino.timestamp_pedido && 
                                    <h6><TimestampFormateadoBadge timestamp={pedidoDeVino.timestamp_pedido} /></h6>
                                }
                            </Col>                    
                            <Col md={4}>
                                <span className="text-success">
                                    <CheckCircleFill /> Cargado
                                </span>                                
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        
                        <RenglonVinoItem renglonVino={pedidoDeVino.renglones[0]} />
                    </Card.Body>
                </Card>
            </Row>
        </Col>
    );
};

export default PedidoDeVinoCard;
