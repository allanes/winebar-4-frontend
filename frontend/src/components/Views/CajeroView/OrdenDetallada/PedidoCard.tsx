import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { Pedido } from '../../../../codegen_output';
import RenglonList from './RenglonesList';
import TimestampFormateadoBadge from '../../../Common/TimestampFormateadoBadge';
import { CheckCircleFill, ExclamationCircle } from 'react-bootstrap-icons';

interface PedidoCardProps {
pedido: Pedido;
}

const PedidoCard: React.FC<PedidoCardProps> = ({ pedido }) => {
return (
    <Card className="pedido-card">
    <Card.Header className="d-flex justify-content-between align-items-center">
        <strong>Pedido</strong>        
        {pedido.cerrado ? (
            <span className="text-success">
                <CheckCircleFill /> Cerrado
            </span>
            ) : (
            <span className="text-warning">
                <ExclamationCircle /> Abierto
            </span>
        )}
    </Card.Header>
    <Card.Body>
        <div className="pedido-metadata">
            <Row className="badge-row justify-content-between">
                <Col md={3}>
                    <Badge pill><strong>#{pedido.id}</strong></Badge>
                </Col>
                <Col md={6}>
                    {pedido.timestamp_pedido && 
                        <TimestampFormateadoBadge timestamp={pedido.timestamp_pedido} />
                    }
                </Col>
            </Row>
            <Row className="badge-row">
                <Col>
                    <Badge pill className='ps-4 pe-4'>
                        <Row className='text-center'>
                            <span>Atendido por</span>
                        </Row>
                        <Row className='mt-1'>
                            <h6><strong>{pedido.atendido_por_nombre}</strong></h6>
                        </Row>
                    </Badge>
                </Col>
            </Row>
        </div>
        <RenglonList renglones={pedido.renglones} />
    </Card.Body>
    </Card>
);
};

export default PedidoCard;