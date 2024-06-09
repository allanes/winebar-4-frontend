// Turno.tsx
import React, { useState, useEffect } from 'react';
import { OrdenesList } from '../OrdenesContainer/OrdenesListCard';
import { OrdenesService, OrdenCompra, OrdenCompraDetallada, Turno } from '../../codegen_output';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';
import InfoCard from '../Views/CajeroView/StatusPanel/InfoCard';
import { Card, Badge, Row, Col, Accordion, Button } from 'react-bootstrap';

interface TurnoProps {
  turnoData: Turno | null;
//   handleGetTurnoInfo: () => void;
//   handleCerrarTurno: () => void;
}

const TurnoDetalle = ({ turnoData }: TurnoProps) => {
// const TurnoDetalle = ({ turnoData, handleGetTurnoInfo, handleCerrarTurno }: TurnoProps) => {
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [ordenesDelTurno, setOrdenesDelTurno] = useState<OrdenCompraDetallada[]>([]);

    useEffect(() => {
       handleRecuperarOrdenesDelTurno();
    }, [turnoData]);

    const handleRecuperarOrdenesDelTurno = async () => {
        if (turnoData) {
        try {
            const ordenesResponse = await OrdenesService.handleReadOrdenByTurnoIdBackendApiV1OrdenesByTurnoTurnoIdGet(turnoData.id);
            // const parsedOrdenes = ordenesResponse.map(parseOrdenCompraDetallada);
            const parsedOrdenes = ordenesResponse
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
        <Card className='card-in-modal-content'>
            <Card.Header >
                <Card.Title className='d-flex justify-content-between align-items-center'>
                    <Col md={8}>
                        <h3>Cierre de Caja</h3>
                    </Col>
                    <Col className='justify-content-end'>
                        {turnoData && turnoData.cerrado_por ?
                            <Badge bg='success'>Cerrada</Badge>
                        : 
                            <Badge bg='warning'>EN CURSO</Badge>
                        }
                    </Col>                    
                </Card.Title>
            </Card.Header>
            <Card.Body >
                <Row className='mb-2 align-items-center'>
                    <Col>
                        <h5><Badge pill className='ps-5 pe-5 info-pill'>
                            <Row className='mb-1'>
                                Turno 
                            </Row>
                            <Row>
                                <h4><strong>{turnoData?.id}</strong></h4>
                            </Row>
                        </Badge></h5>
                    </Col>
                    <Col>
                        <Badge pill bg='secondary' className='info-pill'>
                            <h6>Hr. de apertura</h6>
                            <h5><TimestampFormateadoBadge 
                                timestamp={turnoData?.timestamp_apertura || '0'} 
                                className='info-pill'
                            /></h5>
                        </Badge>
                    </Col>
                    <Col>
                        <Badge bg='secondary' pill className='ps-4 pe-4 info-pill'>
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
                    {!turnoData?.cerrado_por &&
                        <Col>
                            <InfoCard 
                                title="Clientes Activos" 
                                count={turnoData?.clientes_activos || '0'} 
                                onClick={handleClientesActivosClick}
                                clickable
                            />
                        </Col>}
                    <Col  md={6}>
                        <InfoCard title="Clientes Totales" count={turnoData?.cantidad_de_ordenes || 0} />
                    </Col>
                    <Col md={6}>
                        {turnoData?.cerrado_por && 
                            <InfoCard 
                                title={'Monto en Caja Cerrada'}
                                count={`$${turnoData.monto_en_caja}`}
                            />
                        }
                    </Col>
                </Row>        
                <Row className='d-flex'>
                    <Col md={6}>
                        <InfoCard 
                            title="Monto Cobrado" 
                            count={`$${turnoData?.suma_ordenes_cobradas || 0}`} 
                        />
                    </Col>
                    <Col md={6}>
                        {turnoData?.cerrado_por && 
                            <InfoCard 
                                title={'Diferencia'}
                                count={`$${(turnoData.diferencia || 0)}`}
                            />
                        }
                    </Col>
                </Row>
                {/* {turnoData?.comentarios &&  */}
                    <Row className='mb-2'>
                        <Col md={3}>
                            <Badge bg='light' text='dark'>
                                Comentarios
                            </Badge>
                        </Col>
                        <Col className='text-start'>{turnoData?.comentarios || 'No se guardaron comentarios'}</Col>
                    </Row>
                {/* } */}
                <Row>
                    <Accordion activeKey={activeKey} onSelect={handleClientesActivosClick}>
                        <Accordion.Item eventKey="0" className='card-in-modal-colored'>
                            <Accordion.Header>Lista de Ordenes</Accordion.Header>
                            <Accordion.Body className='ms-4'>
                                {turnoData && (
                                    <OrdenesList
                                        ordenesList={ordenesDelTurno || []}
                                        onDeleteOrden={() => {}}
                                        columnasReducidas={true}
                                        ordenCobradaTrigger={handleRecuperarOrdenesDelTurno}
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