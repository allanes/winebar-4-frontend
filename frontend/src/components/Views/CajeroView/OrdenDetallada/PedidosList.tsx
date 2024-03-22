import React from 'react';
import { Pedido } from '../../../../codegen_output';
import PedidoCard from './PedidoCard';

interface PedidosListProps {
  pedidos: Pedido[];
}

const PedidosList: React.FC<PedidosListProps> = ({ pedidos }) => {
  return (
    <div className="pedidos-list">
      {pedidos.map((pedido) => (
        <PedidoCard key={pedido.id} pedido={pedido} />
      ))}
    </div>
  );
};

export default PedidosList;