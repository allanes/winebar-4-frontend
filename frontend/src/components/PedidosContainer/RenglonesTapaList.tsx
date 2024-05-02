import React from 'react';
import { Card, ListGroup, Col, Row } from 'react-bootstrap';
import { Renglon } from '../../codegen_output';
import RenglonTapaItem from './RenglonTapaItem';

interface RenglonTapaListProps {
  renglones: Renglon[];
}

const RenglonesTapaList: React.FC<RenglonTapaListProps> = ({ renglones }) => {
  return (
    <div className="renglon-list">
      <Col>
      {renglones.map((renglon) => (
        <Row md={7}>
          <RenglonTapaItem key={renglon.id} renglon={renglon} />
        </Row>
      ))}
      </Col>
    </div>
  );
};

export default RenglonesTapaList;