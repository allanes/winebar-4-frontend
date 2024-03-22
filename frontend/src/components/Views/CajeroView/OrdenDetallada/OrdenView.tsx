import React from 'react';
import { Row } from 'react-bootstrap';
import { OrdenCompraCerrada } from '../../../../codegen_output';
import PedidosList from './PedidosList';
import OrdenMetadata from './OrdenMetadata';

interface OrdenViewProps {
  ordenData: OrdenCompraCerrada;
}

const OrdenView: React.FC<OrdenViewProps> = ({ ordenData }) => {
  return (
    <div>
      <Row>
        <OrdenMetadata ordenData={ordenData} />
      </Row>
      <Row>
        <PedidosList pedidos={ordenData.pedidos} />
      </Row>
    </div>
  );
};

export default OrdenView;