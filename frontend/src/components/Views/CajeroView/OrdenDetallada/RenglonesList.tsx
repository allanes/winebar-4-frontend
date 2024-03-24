import React from 'react';
import { Card, ListGroup, Col, Row } from 'react-bootstrap';
import { Renglon } from '../../../../codegen_output';
import RenglonItem from './RenglonItem';

interface RenglonListProps {
  renglones: Renglon[];
}

const RenglonList: React.FC<RenglonListProps> = ({ renglones }) => {
  return (
    <div className="renglon-list">
      <Col>
      {renglones.map((renglon) => (
        <Row md={7}>
          <RenglonItem key={renglon.id} renglon={renglon} />
        </Row>
      ))}
      </Col>
    </div>
  );
};

export default RenglonList;