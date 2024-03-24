import React, { useState } from 'react';
import { Row, Accordion, Col, Card, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';
import { CartFill, CartX } from 'react-bootstrap-icons';
import { OrdenCompra, OrdenCompraCerrada, OrdenesService } from '../../../../codegen_output';
import PedidosList from './PedidosList';
import OrdenMetadata from './OrdenMetadata';
import { handleApiError } from '../../../ClientsContainer/ClientsContainer';
import Swal from 'sweetalert2';

interface OrdenViewProps {
  ordenData: OrdenCompraCerrada;
}

interface TooltipProps {
  show: boolean;
  placement?: Placement | undefined;
  delay?: { show: number; hide: number; } | undefined;
}

const OrdenView: React.FC<OrdenViewProps> = ({ ordenData }) => {
  const totalPedidos = ordenData.pedidos.length;
  const openedPedidos = ordenData.pedidos.filter(pedido => pedido.cerrado===false).length;
  const [ordenCobrada, setOrdenCobrada] = useState<OrdenCompra | null>(null)

  const renderTooltip = (props: TooltipProps) => (
    <Tooltip id="button-tooltip" {...props}>
      Total de pedidos para esta orden
    </Tooltip>
  );

  const renderTooltip2 = (props: TooltipProps) => (
    <Tooltip id="button-tooltip" {...props}>
      Cantidad de Pedidos abiertos. Estos pedidos seran eliminados después de cobrar
    </Tooltip>
  );

  const handleCobrar = async () => {
    OrdenesService.handleCerrarOrdenBackendApiV1OrdenesCerrarPost(
      ordenData.id
    ).then((ordenResponse) => {
      setOrdenCobrada(ordenResponse)
      Swal.fire('Orden Cobrada', `Monto $ ${ordenResponse.monto_cobrado}`, 'success')
      
    })
    .catch(handleApiError)
  }

  return (
    <div className="orden-view">
      <Row className="sticky-top">
        <OrdenMetadata 
            ordenData={ordenData} 
            onCobrar={handleCobrar}/>
      </Row>
      <Row>
        <Accordion defaultActiveKey="" className="pedidos-accordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header className='d-flex justify-content-between'>
              <Col md={5}>
                <h5>Pedidos</h5>
              </Col>
              <Col md={3}>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 50, hide: 200 }}
                  overlay={renderTooltip}
                >
                    <Badge bg='light' className='text-dark'><CartFill size={24} color='green' /> {totalPedidos}</Badge>
                </OverlayTrigger>
              </Col>
              <Col md={3} className='text-end pe-5'>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 50, hide: 200 }}
                  overlay={renderTooltip2}
                >
                    <Badge bg='light' className='text-dark'><CartX size={24} color='red' /> {openedPedidos}</Badge>
                </OverlayTrigger>
              </Col>
            </Accordion.Header>
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