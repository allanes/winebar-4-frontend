import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { Pedido } from '../../../../codegen_output';
import RenglonList from './RenglonesList';
import TimestampFormateadoBadge from '../../../Common/TimestampFormateadoBadge';
import { CheckCircleFill, ExclamationCircle, CurrencyDollar } from 'react-bootstrap-icons';

interface PedidoCardProps {
    pedido: Pedido;
    pedidoNumberedNumber: number;
}

const PedidoCard: React.FC<PedidoCardProps> = ({ pedido, pedidoNumberedNumber }) => {
    // Calculate the total cantidad of all renglones
    const totalCantidad = pedido.renglones.reduce((total, renglon) => total + renglon.cantidad, 0);

    return (
        <Col>
            <Row className=''>
                <Card className="pedido-card">
                    <Card.Header >
                        <Row md={12}>
                            <Col md={4}>
                                <h5><strong>Pedido {pedidoNumberedNumber}</strong></h5>
                            </Col>
                            <Col md={4}>
                                {pedido.timestamp_pedido && 
                                    <h5><TimestampFormateadoBadge timestamp={pedido.timestamp_pedido} /></h5>
                                }
                            </Col>                    
                            <Col md={4}>
                                {pedido.cerrado ? (
                                    <span className="text-success">
                                        <CheckCircleFill /> Cargado
                                    </span>
                                    ) : (
                                    <span className="text-warning">
                                        <ExclamationCircle /> Abierto
                                    </span>
                                )}
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <div className="pedido-metadata">
                            <Row className="badge-row">
                                <Col>
                                    <Badge bg='secondary' className='ps-4 pe-4'>
                                        <Row className='text-center'>
                                            <span>Atendido por</span>
                                        </Row>
                                        <Row className='mt-1'>
                                            <h6><strong>{pedido.atendido_por_nombre}</strong></h6>
                                        </Row>
                                    </Badge>
                                </Col>
                                <Col >
                                    <Badge bg='secondary' className='ps-4 pe-4'>
                                        <Row className='text-center mt-1 mb-0'>
                                            <h5>{totalCantidad}</h5>
                                        </Row>
                                        <Row className='mt-0'>
                                            <span>{totalCantidad === 1 ? ' item' : ' items'}</span>
                                        </Row>                        
                                    </Badge>
                                </Col>
                                <Col>
                                    <h2><Badge bg='success'>$ {pedido.monto_cargado}</Badge></h2>
                                </Col>
                            </Row>
                        </div>
                        <RenglonList renglones={pedido.renglones} />
                    </Card.Body>
                </Card>
            </Row>
        </Col>
    );
};

export default PedidoCard;
