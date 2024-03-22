import React from 'react';
import { Row, Accordion } from 'react-bootstrap';
import { OrdenCompraCerrada } from '../../../../codegen_output';
import PedidosList from './PedidosList';
import OrdenMetadata from './OrdenMetadata';

interface OrdenViewProps {
  ordenData: OrdenCompraCerrada;
}

const OrdenView: React.FC<OrdenViewProps> = ({ ordenData }) => {
  return (
    <div className="orden-view">
      <Row>
        <OrdenMetadata ordenData={ordenData} onCobrar={() => {}}/>
      </Row>
      <Row>
        <Accordion defaultActiveKey="" className="pedidos-accordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Pedidos</Accordion.Header>
            <Accordion.Body>
              <PedidosList pedidos={ordenData.pedidos} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </div>
  );
};

export default OrdenView;