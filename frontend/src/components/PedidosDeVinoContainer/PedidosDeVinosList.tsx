import React, {useState} from 'react';
import { TransaccionVino } from '../../codegen_output';
import PedidoDeVino from './PedidoDeVinoCard';

interface PedidosDeVinosListProps {
  pedidosDeVinos: TransaccionVino[];
}

const PedidosDeVinosList: React.FC<PedidosDeVinosListProps> = ({ pedidosDeVinos }) => {
    return (
        <div className="pedidos-list">
        {pedidosDeVinos.map((pedido, index) => (
            <PedidoDeVino 
                key={pedido.consumoId} 
                pedidoDeVino={pedido} 
                pedidoNumberedNumber={pedidosDeVinos.length-index}
            />
        ))}
        </div>
);
};

export default PedidosDeVinosList;