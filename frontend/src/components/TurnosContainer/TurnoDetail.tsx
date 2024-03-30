// Turno.tsx
import React, { useState, useEffect } from 'react';
import { OrdenesList } from '../OrdenesContainer/OrdenesList';
import { OrdenesService, OrdenCompra, OrdenCompraDetallada, Turno } from '../../codegen_output';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';
import InfoCard from '../Views/CajeroView/StatusPanel/InfoCard';
import { Card, Badge, Row, Col, Accordion, Button } from 'react-bootstrap';

interface TurnoProps {
  turnoData: Turno | null;
//   handleGetTurnoInfo: () => void;
//   handleCerrarTurno: () => void;
}

const parseOrdenCompraDetallada = (ordenCerrada: OrdenCompraDetallada): OrdenCompra => {
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

const TurnoDetalle = ({ turnoData }: TurnoProps) => {
// const TurnoDetalle = ({ turnoData, handleGetTurnoInfo, handleCerrarTurno }: TurnoProps) => {
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [ordenesDelTurno, setOrdenesDelTurno] = useState<OrdenCompra[]>([]);

    useEffect(() => {
        handleRecuperarOrdenesDelTurno();
    }, [turnoData]);

    const handleRecuperarOrdenesDelTurno = async () => {
        if (turnoData) {
        try {
            const ordenesResponse = await OrdenesService.handleReadOrdenByTurnoIdBackendApiV1OrdenesByTurnoTurnoIdGet(turnoData.id);
            const parsedOrdenes = ordenesResponse.map(parseOrdenCompraDetallada);
            setOrdenesDelTurno(parsedOrdenes);
        } catch (error: unknown) {
            setOrdenesDelTurno([]);
            // handleApiError(error); // You can remove this line
        }
        }
    };

    const handleClientesActivosClick = () => {
        setActiveKey(activeKey === '0' ? null : '0');
    };

    return (
        <Card >
            <Card.Header >
                <Card.Title className='d-flex justify-content-between align-items-center'>
                    <Col md={8}>
                        Cierre de Caja
                    </Col>
                    <Col className='justify-content-end'>
                        {turnoData && turnoData.cerrado_por ?
                            <Badge bg='success'>Cerrada</Badge>
                        : 
                            <Badge bg='warning'>Abierta</Badge>
                        }
                    </Col>                    
                </Card.Title>
            </Card.Header>
            <Card.Body>
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
                                <h6>Abierto por</h6>
                            </Row>
                            <Row>
                                <h5><strong>{turnoData?.abierto_por_nombre}</strong></h5>
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
                <Row className='d-flex'>
                    <Col md={4}>
                        {turnoData?.cerrado_por && 
                            <InfoCard 
                                title={'Monto en Caja Cerrada'}
                                count={`$${turnoData.monto_en_caja}`}
                            />
                        }
                    </Col>
                    <Col md={4}>
                        <InfoCard 
                            title="Monto Cobrado" 
                            count={`$${turnoData?.suma_ordenes_cobradas || 0}`} 
                        />
                    </Col>
                    <Col md={4}>
                        {turnoData?.cerrado_por && 
                            <InfoCard 
                                title={'Diferencia'}
                                count={`$${(turnoData.diferencia || 0)}`}
                            />
                        }
                    </Col>
                </Row>
                {turnoData?.comentarios && 
                    <Row className='mb-2'>
                        <Col md={3}>
                            <Badge bg='light' text='dark'>
                                Comentarios
                            </Badge>
                        </Col>
                        <Col className='text-start'>{turnoData.comentarios}</Col>
                    </Row>
                }
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
            </Card.Body>
        </Card>
    );
};

export default TurnoDetalle;