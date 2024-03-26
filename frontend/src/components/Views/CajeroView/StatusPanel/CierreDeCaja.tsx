// CierreDeCaja.tsx
import React, {useState, useEffect} from 'react';
import { Modal, Button, Row, Col, Badge, Accordion } from 'react-bootstrap';
import InfoCard from './InfoCard';
import { Turno, OrdenesService, OrdenCompra, OrdenCompraCerrada } from '../../../../codegen_output';
import TimestampFormateadoBadge from '../../../Common/TimestampFormateadoBadge';
import { OrdenesList } from '../../../OrdenesContainer/OrdenesList';

interface CierreDeCajaProps {
    show: boolean;
    onHide: () => void;
    turnoData: Turno | null;
    handleGetTurnoInfo: () => void;
    handleCerrarTurno: () => void;
}

const CierreDeCaja = ({ show, onHide, turnoData, handleGetTurnoInfo, handleCerrarTurno }: CierreDeCajaProps) => {
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [ordenesDelTurno, setOrdenesDelTurno] = useState<OrdenCompra[]>([]);

    useEffect(() => {
        handleRecuperarOrdenesDelTurno();
    }, []);

    const parseOrdenCompraCerrada = (ordenCerrada: OrdenCompraCerrada): OrdenCompra => {
        return {
          precarga_usada: ordenCerrada.precarga_usada,
          monto_maximo_orden: ordenCerrada.monto_maximo_orden,
          turno_id: ordenCerrada.turno_id,
          cliente_id: ordenCerrada.cliente_id,
          abierta_por: ordenCerrada.abierta_por,
          id: ordenCerrada.id,
          monto_cargado: ordenCerrada.monto_cargado,
          monto_cobrado: ordenCerrada.monto_cobrado,
          timestamp_apertura_orden: ordenCerrada.timestamp_apertura_orden,
          timestamp_cierre_orden: ordenCerrada.timestamp_cierre_orden,
          cerrada_por: ordenCerrada.cerrada_por,
          cerrada_por_nombre: ordenCerrada.cerrada_por_nombre,
        };
      };

    const handleRecuperarOrdenesDelTurno = async () => {
        if (turnoData) {
            try {
                const ordenesResponse = await OrdenesService.handleReadOrdenByTurnoIdBackendApiV1OrdenesByTurnoTurnoIdGet(turnoData.id);
                const parsedOrdenes = ordenesResponse.map(parseOrdenCompraCerrada);
                setOrdenesDelTurno(parsedOrdenes);
            } catch (error: unknown) {
                setOrdenesDelTurno([]);
                // handleApiError(error); // You can remove this line
            }
        }
    };

    const handleConfirm = () => {
        handleCerrarTurno();
        onHide();
    };

    const handleClientesActivosClick = () => {
        setActiveKey(activeKey === '0' ? null : '0');
    };

    return (
        <Modal show={show} onHide={onHide} centered size='lg'>
        <Modal.Header closeButton>
            <Modal.Title>Cierre de Caja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row className='mb-2 align-items-center'>
                <Col>
                    <h5><Badge bg='secondary' className='ps-4 pe-4'>
                        <Row className='mb-1'>
                            Turno id 
                        </Row>
                        <Row>
                            <h4><strong>{turnoData?.id}</strong></h4>
                        </Row>
                    </Badge></h5>
                </Col>
                <Col>
                    <Badge bg='secondary'>
                        <h6>Hr. de apertura</h6>
                        <h4><TimestampFormateadoBadge timestamp={turnoData?.timestamp_apertura || '0'} /></h4>
                    </Badge>
                </Col>
                <Col>
                    <Badge bg='secondary' className='ps-4 pe-4'>
                        <Row className='text-center'>
                            <h6>Atendido por</h6>
                        </Row>
                        <Row>
                            <h5><strong>{turnoData?.abierto_por}</strong></h5>
                        </Row>
                    </Badge>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InfoCard 
                        title="Clientes Activos" 
                        count={turnoData?.clientes_activos || '0'} 
                        onClick={handleClientesActivosClick}
                        clickable
                    />
                </Col>
                <Col>
                    <InfoCard title="Clientes Totales" count={turnoData?.cantidad_de_ordenes || 0} />
                </Col>
            </Row>        
            <Row>
                <Col>
                    <InfoCard title="Ingresos Totales" count={turnoData?.ingresos_totales || 0} />
                </Col>
            </Row>
            <Row>
                <Accordion activeKey={activeKey} onSelect={handleClientesActivosClick}>
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Lista de Ordenes</Accordion.Header>
                    <Accordion.Body className='ms-4'>
                        {turnoData && (
                            <OrdenesList
                                ordenesList={ordenesDelTurno || []}
                                onDeleteOrden={() => {}}
                                columnasReducidas={true}
                            />
                        )}
                    </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
            Cancelar
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
            Confirmar Cierre
            </Button>
        </Modal.Footer>
        </Modal>
    );
};

export default CierreDeCaja;