import React from 'react';
import { Pedido } from '../../../../../codegen_output';
import { Card, ListGroup } from 'react-bootstrap';
import { CheckCircleFill, ExclamationCircle } from 'react-bootstrap-icons';
import TimestampFormateadoBadge from '../../../../Common/TimestampFormateadoBadge';

interface PedidosListProps {
  pedidos: Pedido[];
}

const PedidosListComprimido: React.FC<PedidosListProps> = ({ pedidos }) => {
  const totalCantidad = (pedido: Pedido) => {
    return pedido.renglones.reduce((total, renglon) => total + renglon.cantidad, 0);
  }

  return (
    <Card>
      <Card.Header>
        <h5>Pedidos</h5>
      </Card.Header>
      <Card.Body>
        {pedidos.map((pedido, index) => (
          <ListGroup key={index} className="mb-2">
            <ListGroup.Item variant='info'>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Pedido {pedidos.length - index}</strong>
                  {pedido.timestamp_pedido &&
                    <TimestampFormateadoBadge timestamp={pedido.timestamp_pedido} />
                  }
                </div>
                <div>
                  {pedido.cerrado ? (
                    <CheckCircleFill className="text-success" />
                  ) : (
                    <>Abierto <ExclamationCircle className="text-warning" /></>
                  )}
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small>Atendido por:</small>
                  <div>{pedido.atendido_por_nombre}</div>
                </div>
                <div>
                  <small>Items:</small>
                  <div>{totalCantidad(pedido)}</div>
                </div>
                <div>
                  <small>Monto:</small>
                  <div>$ {pedido.monto_cargado}</div>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </Card.Body>
    </Card>
  );
};

export default PedidosListComprimido;