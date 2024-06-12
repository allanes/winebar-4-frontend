import React, {useState} from 'react';
import { Row, Accordion, Col, Card, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { OrdenCompraDetallada, OrdenCompraInfoPago, OrdenesService } from '../../codegen_output';
import PedidosList from '../PedidosContainer/PedidosList';
import OrdenMetadata from './OrdenDetallada/OrdenMetadata';
import { handleApiError } from '../ClientsContainer/ClientsContainer';
import Swal from 'sweetalert2';
import { Placement } from 'react-bootstrap/esm/types';
import { CartFill, CartX } from 'react-bootstrap-icons';
import copaImage from '../../assets/icons/copa.png';
import foodImage from '../../assets/icons/food.png';

interface OrdenViewProps {
  ordenData: OrdenCompraDetallada;
  showPanelCobro?: boolean;
  ordenCobradaTrigger?: () => void;
}

interface TooltipProps {
  show: boolean;
  placement?: Placement | undefined;
  delay?: { show: number; hide: number; } | undefined;
}

const OrdenView: React.FC<OrdenViewProps> = ({ ordenData, showPanelCobro = false, ordenCobradaTrigger }) => {
  const [data, setData] = useState(ordenData);
  const totalPedidos = data.pedidos.length;
  const openedPedidos = data.pedidos.filter(pedido => !pedido.cerrado).length;
  const vinoAmount = data.pedidos.filter(pedido => pedido.renglones.some(renglon => renglon.vitte_consumo_id))
                     .reduce((sum, pedido) => sum + pedido.renglones.reduce((sumRenglon, renglon) => sumRenglon + renglon.monto, 0), 0);
  const tapaAmount = data.pedidos.filter(pedido => !pedido.renglones.some(renglon => renglon.vitte_consumo_id))
                     .reduce((sum, pedido) => sum + pedido.renglones.reduce((sumRenglon, renglon) => sumRenglon + renglon.monto, 0), 0);

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

  const renderTooltip3 = (props: TooltipProps) => (
    <Tooltip id="button-tooltip" {...props}>
      Consumos de Vinos
    </Tooltip>
  );

  const renderTooltip4 = (props: TooltipProps) => (
    <Tooltip id="button-tooltip" {...props}>
      Consumos de Tapas
    </Tooltip>
  );

  const handleInfoPagoSubmit = (ordenId: number, infoPago: OrdenCompraInfoPago) => {
    if (showPanelCobro) {
      console.log('Cobrando desde ordenView')
    }
    else {
      console.log('No pudo cobrar desde ordenView')
    }
    
    OrdenesService.handleCerrarOrdenBackendApiV1OrdenesCerrarPost(
      ordenId, infoPago
    ).then((ordenResponse) => {
      // setOrdenCobrada(ordenResponse)
      Swal.fire('Orden Cobrada', `Monto $ ${ordenResponse.monto_cobrado}`, 'success')
      if (ordenCobradaTrigger) {ordenCobradaTrigger()};
    })
    .catch(handleApiError)    
  };

  const refreshData = async () => {
    try {
      const updatedData = await OrdenesService.handleReadOrdenByIdBackendApiV1OrdenesIdGet(data.id); // Method to fetch updated data
      setData(updatedData);
      // if (ordenCobradaTrigger) {
      //   ordenCobradaTrigger();
      // }
    } catch (error) {
      console.error("Failed to refresh data", error);
    }
  };

  return (
    <div className="orden-view">
      <Row className="sticky-top">
        <OrdenMetadata 
          ordenData={data} 
          onCobrar={handleInfoPagoSubmit}
          refreshData={refreshData}
        />
      </Row>
      <Row>
        <Accordion defaultActiveKey="" className="pedidos-accordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <Col md={6}>
                <h5>Pedidos</h5>
              </Col>
              <Col md={6} className="d-flex justify-content-around">
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 50, hide: 200 }}
                  overlay={renderTooltip3}
                >
                  <Badge bg='light' className='text-dark'>
                    <img src={copaImage} alt="Vinos" style={{ width: 24, height: 24 }} /> $ {vinoAmount.toLocaleString('es-ES')}
                  </Badge>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 50, hide: 200 }}
                  overlay={renderTooltip4}
                >
                  <Badge bg='light' className='text-dark'>
                    <img src={foodImage} alt="Tapas" style={{ width: 24, height: 24 }} /> $ {tapaAmount.toLocaleString('es-ES')}
                  </Badge>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 50, hide: 200 }}
                  overlay={renderTooltip}
                >
                  <Badge bg='light' className='text-dark'>
                    <CartFill size={24} color='green' /> {totalPedidos}
                  </Badge>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 50, hide: 200 }}
                  overlay={renderTooltip2}
                >
                  <Badge bg='light' className='text-dark'>
                    <CartX size={24} color='red' /> {openedPedidos}
                  </Badge>
                </OverlayTrigger>
              </Col>
            </Accordion.Header>
            <Accordion.Body>
              <PedidosList 
                pedidos={data.pedidos} 
                refreshData={refreshData}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </div>
  );
};

export default OrdenView;
