import React, {useState} from 'react';
import { Pedido } from '../../codegen_output';
import PedidoDeVino from './PedidoDeVinoCard';

interface PedidosDeVinosListProps {
  pedidosDeVinos: Pedido[];
}

const PedidosDeVinosList: React.FC<PedidosDeVinosListProps> = ({ pedidosDeVinos }) => {
    return (
        <div className="pedidos-list">
        {pedidosDeVinos.map((pedido, index) => (
            <PedidoDeVino 
                key={pedido.id} 
                pedidoDeVino={pedido} 
                pedidoNumberedNumber={pedidosDeVinos.length-index}
            />
        ))}
        </div>
);
};

export default PedidosDeVinosList;