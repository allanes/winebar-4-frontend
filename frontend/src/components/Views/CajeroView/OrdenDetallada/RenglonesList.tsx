import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Renglon } from '../../../../codegen_output';
import RenglonItem from './RenglonItem';

interface RenglonListProps {
  renglones: Renglon[];
}

const RenglonList: React.FC<RenglonListProps> = ({ renglones }) => {
  return (
    <div className="renglon-list">
       {renglones.map((renglon) => (
         <RenglonItem key={renglon.id} renglon={renglon} />
       ))}
    </div>
  );
};

export default RenglonList;