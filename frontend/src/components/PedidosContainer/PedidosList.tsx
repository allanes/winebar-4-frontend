import React from 'react';
import { Pedido } from '../../codegen_output';
import PedidoTapaCard from './PedidoTapaCard';
import PedidoDeVinoCard from './PedidoDeVinoCard';
import { Row, Col, Card } from 'react-bootstrap';

interface PedidosListProps {
  pedidos: Pedido[];
  refreshData: () => void;
}

const PedidosList: React.FC<PedidosListProps> = ({ pedidos, refreshData }) => {
    // Splitting pedidos into two lists
    const pedidosVino = pedidos.filter(pedido => pedido.renglones.some(renglon => renglon.vitte_consumo_id));
    const pedidosTapa = pedidos.filter(pedido => !pedido.renglones.some(renglon => renglon.vitte_consumo_id));

    const renderVinoCard = (pedido: Pedido) => (
        <PedidoDeVinoCard 
            key={pedido.id} 
            pedidoDeVino={pedido} 
            pedidoNumberedNumber={pedidosVino.length - pedidosVino.indexOf(pedido)}
            refreshData={refreshData}
        />
    );

    const renderTapaCard = (pedido: Pedido) => (
        <PedidoTapaCard 
            key={pedido.id} 
            pedido={pedido} 
            pedidoNumberedNumber={pedidosTapa.length - pedidosTapa.indexOf(pedido)}
            refreshData={refreshData}
        />
    );

    return (
        // <Row className="pedidos-list">
        <Row>
            <Col md={6} className="mb-3 pe-3">
                <Card className="mb-2">
                    <Card.Header as="h5" className="text-center">Vinos</Card.Header>
                </Card>
                <div className="scrollable-container">
                    {pedidosVino.map(renderVinoCard)}
                </div>
            </Col>
            <Col md={6} className="mb-3 ps-3">
                <Card className="mb-2">
                    <Card.Header as="h5" className="text-center">Tapas</Card.Header>
                </Card>
                <div className="scrollable-container">
                    {pedidosTapa.map(renderTapaCard)}
                </div>
            </Col>
        </Row>
    );
};

export default PedidosList;
