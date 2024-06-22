import React, { useState, useEffect } from 'react';
import { OrdenesService, OrdenCompraDetallada } from '../../codegen_output';
import { Card, Badge, Col, Row, Accordion } from 'react-bootstrap';
import { Turno } from '../../codegen_output';
import OpenTurnDetail from './TurnoDetailOpened';
import ClosedTurnDetail from './TurnoDetailClosed';
import DetalleTurnoMetadataCard from './DetalleTurnoMetadataCard';
import { OrdenesList } from '../OrdenesContainer/OrdenesListCard';

interface TurnoProps {
    turnoData: Turno | null;
    onReloadStatus: () => void;
}

const TurnoDetalle = ({ turnoData, onReloadStatus }: TurnoProps) => {
    const [openItems, setOpenItems] = useState<string[]>(['0']); // Initialize with all sections open by default
    const [ordenesDelTurno, setOrdenesDelTurno] = useState<OrdenCompraDetallada[]>([]);

    useEffect(() => {
        handleRecuperarOrdenesDelTurno();
    }, [turnoData]);

    const handleRecuperarOrdenesDelTurno = async () => {
        if (turnoData) {
            try {
                const ordenesResponse = await OrdenesService.handleReadOrdenByTurnoIdBackendApiV1OrdenesByTurnoTurnoIdGet(turnoData.id);
                setOrdenesDelTurno(ordenesResponse);
            } catch (error) {
                setOrdenesDelTurno([]);
            }
        }
    };

    if (!turnoData) {
        return <div>No hay datos del turno disponibles.</div>;
    }

    const handleToggle = (key: string) => {
        setOpenItems(prevOpenItems =>
            prevOpenItems.includes(key)
                ? prevOpenItems.filter(item => item !== key)
                : [...prevOpenItems, key]
        );
    };

    const isClosed = turnoData.cerrado_por;

    return (
        <Card className='card-in-modal-content'>
            {/* <Card.Header>
                <Card.Title className='d-flex justify-content-between align-items-center'>
                    <Col md={8}>
                        <h3>Detalles del Turno {turnoData.id}</h3>
                    </Col>
                    <Col className='justify-content-end'>
                        {isClosed ? <Badge bg='success'>CERRADO</Badge> : <Badge bg='warning'>EN CURSO</Badge>}
                    </Col>
                </Card.Title>
            </Card.Header> */}
            <Card.Body>
                <Col>
                    <Row className=''>
                        <Col>
                            {turnoData && <DetalleTurnoMetadataCard turnoData={turnoData} />}
                        </Col>
                    </Row>
                    <Row className=''>
                        <Accordion activeKey={openItems}>
                            <Accordion.Item eventKey="0" className='cierre-caja-pago-card'>
                                <Accordion.Header onClick={() => handleToggle('0')}>
                                    <Row className='w-100'>
                                        <Col>
                                            <strong>Cierre de Caja</strong>
                                        </Col>
                                        <Col className='text-end'>
                                            {isClosed && (
                                                <strong>${turnoData.suma_ordenes_cobradas?.toLocaleString('es-ES') || 0}</strong>
                                            )}
                                        </Col>
                                    </Row>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {isClosed ? (
                                        <ClosedTurnDetail turnoData={turnoData} />
                                    ) : (
                                        <OpenTurnDetail
                                            turnoData={turnoData}
                                            onReloadStatus={onReloadStatus}
                                            onClickOpenOrdenes={handleToggle.bind(null, '1')}
                                        />
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1" className='mt-2 card-in-modal-colored'>
                                <Accordion.Header onClick={() => handleToggle('1')}>
                                    <Row className='w-100'>
                                        <Col>
                                            <strong>Lista de Ordenes</strong>
                                        </Col>
                                        <Col className='text-end'>
                                            <strong>{turnoData.cantidad_de_ordenes} Ordenes</strong>
                                        </Col>
                                    </Row>
                                </Accordion.Header>
                                <Accordion.Body className='ms-4'>
                                    <OrdenesList
                                        ordenesList={ordenesDelTurno || []}
                                        onDeleteOrden={() => {}}
                                        columnasReducidas={true}
                                        ordenCobradaTrigger={onReloadStatus}
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Row>
                </Col>
            </Card.Body>
        </Card>
    );
};

export default TurnoDetalle;
