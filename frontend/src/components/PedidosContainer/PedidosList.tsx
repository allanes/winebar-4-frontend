import React from 'react';
import { Pedido } from '../../codegen_output';
import PedidoTapaCard from './PedidoTapaCard';
import PedidoDeVinoCard from './PedidoDeVinoCard';

interface PedidosListProps {
  pedidos: Pedido[];
}

const PedidosList: React.FC<PedidosListProps> = ({ pedidos }) => {
    const renderCard = (pedido: Pedido) => {
        // Check if pedido.renglones has one element and that element has a non-empty vitte_consumo_id
        const shouldRenderVinoCard = pedido.renglones.length === 1 && pedido.renglones[0].vitte_consumo_id;

        if (shouldRenderVinoCard) {
            return (
                <PedidoDeVinoCard 
                    key={pedido.id} 
                    pedidoDeVino={pedido} 
                    pedidoNumberedNumber={pedidos.length - pedidos.indexOf(pedido)}
                />
            );
        } else {
            return (
                <PedidoTapaCard 
                    key={pedido.id} 
                    pedido={pedido} 
                    pedidoNumberedNumber={pedidos.length - pedidos.indexOf(pedido)}
                />
            );
        }
    };

    return (
        <div className="pedidos-list">
            {pedidos.map((pedido) => renderCard(pedido))}
        </div>
    );
};

export default PedidosList;
