import React, { useState } from 'react';
import { Row, Col, } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';
import { OrdenCompra, OrdenCompraDetallada } from '../../../../codegen_output';
import PedidosListComprimido from './DetalleOrden/ListadoPedidosComprimido';
import OrdenMetadataForTapero from './DetalleOrden/OrdenMetadaForTapero';

interface OrdenViewProps {
  ordenData: OrdenCompraDetallada;
  showPanelCobro?: boolean;
}

const OrdenViewForTapero: React.FC<OrdenViewProps> = ({ ordenData, showPanelCobro = false }) => {
  return (
    <Row className="orden-view">
        <Col >
            <Row className="sticky-top">
                <OrdenMetadataForTapero 
                    ordenData={ordenData} 
                />
            </Row>
        </Col>
        <Col >
            <Row>
                <PedidosListComprimido pedidos={ordenData.pedidos} />
            </Row>
        </Col>
    </Row>
  );
};

export default OrdenViewForTapero;