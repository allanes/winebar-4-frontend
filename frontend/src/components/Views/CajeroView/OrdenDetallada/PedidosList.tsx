import React, {useState} from 'react';
import { Pedido } from '../../../../codegen_output';
import PedidoCard from './PedidoCard';

interface PedidosListProps {
  pedidos: Pedido[];
}

const PedidosList: React.FC<PedidosListProps> = ({ pedidos }) => {
    return (
        <div className="pedidos-list">
        {pedidos.map((pedido, index) => (
            <PedidoCard 
                key={pedido.id} 
                pedido={pedido} 
                pedidoNumberedNumber={pedidos.length-index}
            />
        ))}
        </div>
);
};

export default PedidosList;