import React from 'react';
import { Card } from 'react-bootstrap';
import { Pedido } from '../../../../codegen_output';
import RenglonList from './RenglonesList';

interface PedidoCardProps {
  pedido: Pedido;
}

const PedidoCard: React.FC<PedidoCardProps> = ({ pedido }) => {
  return (
    <Card className="pedido-card">
      <Card.Header>
        <strong>Pedido ID:</strong> {pedido.id}
      </Card.Header>
      <Card.Body>
        <div className="pedido-metadata">
          <p><strong>Atendido por:</strong> {pedido.atendido_por}</p>
          <p><strong>Timestamp:</strong> {pedido.timestamp_pedido}</p>
          <p><strong>Cerrado:</strong> {pedido.cerrado ? 'Sí' : 'No'}</p>
          <p><strong>Orden ID:</strong> {pedido.orden_id}</p>
          <p><strong>Monto máximo:</strong> {pedido.monto_maximo_pedido}</p>
        </div>
        <RenglonList renglones={pedido.renglones} />
      </Card.Body>
    </Card>
  );
};

export default PedidoCard;