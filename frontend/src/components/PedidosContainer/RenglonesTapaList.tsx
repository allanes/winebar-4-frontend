import React from 'react';
import { Card, ListGroup, Col, Row } from 'react-bootstrap';
import { Renglon } from '../../codegen_output';
import RenglonTapaItem from './RenglonTapaItem';

interface RenglonTapaListProps {
  renglones: Renglon[];
  refreshData: () => void;
}

const RenglonesTapaList: React.FC<RenglonTapaListProps> = ({ renglones, refreshData }) => {
  return (
    <div className="renglon-list">
      <Col>
      {renglones.map((renglon) => (
        <Row md={7}>
          <RenglonTapaItem 
            key={renglon.id} 
            renglon={renglon} 
            refreshData={refreshData}
          />
        </Row>
      ))}
      </Col>
    </div>
  );
};

export default RenglonesTapaList;