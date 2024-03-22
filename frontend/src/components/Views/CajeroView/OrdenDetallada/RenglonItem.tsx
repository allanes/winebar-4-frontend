import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Renglon } from '../../../../codegen_output';

interface RenglonItemProps {
  renglon: Renglon;
}

const RenglonItem: React.FC<RenglonItemProps> = ({ renglon }) => {
  return (
    <ListGroup.Item className="renglon-item">
      <div className="renglon-details">
        <p><strong>Producto:</strong> {renglon.producto.titulo}</p>
        <p><strong>Cantidad:</strong> {renglon.cantidad}</p>
        <p><strong>Monto:</strong> {renglon.monto}</p>
        <p><strong>Promoción aplicada:</strong> {renglon.promocion_aplicada ? 'Sí' : 'No'}</p>
      </div>
    </ListGroup.Item>
  );
};

export default RenglonItem;