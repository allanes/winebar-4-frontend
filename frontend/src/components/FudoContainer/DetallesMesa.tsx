import React, { useState, useEffect } from 'react';
import { FudoService, CustomSaleDetailResponse, OrdenCompraInfoPago } from '../../codegen_output';
import SortableFilterableTable from './SortableFilterableTable';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ArrowClockwise } from 'react-bootstrap-icons';
import { ColumnaFiltrableProps } from './FudoTypes';
import './Colecciones.css';

interface DetallesMesaProps {
    mesaFudoId: number;
    mesaFudoNumero: number;
    onRefreshListado: () => void;
    onSubmit: (infoPago: OrdenCompraInfoPago) => void;
}

function DetallesMesa({ mesaFudoId, mesaFudoNumero, onRefreshListado, onSubmit }: DetallesMesaProps) {
    const [ventasCustom, setVentasCustom] = useState<CustomSaleDetailResponse[]>([]);
    const [selectedVenta, setSelectedVenta] = useState<CustomSaleDetailResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [comentarios, setComentarios] = useState('');

    useEffect(() => {
        fetchItems();
    }, [mesaFudoId, selectedVenta]);

    const fetchItems = () => {
        setVentasCustom([]);
        setIsLoading(true);
        FudoService.readSalesByMesaBackendApiV1FudoVentasPorMesaMesaIdGet(mesaFudoId)
        .then(response => {
            setVentasCustom(response);
            setIsLoading(false);
        })
        .catch(error => {
            console.error(`Error fetching items for collection ${mesaFudoId}:`, error);
            setError(error.message);
            setIsLoading(false);
        });
    };

    const handleSelectVenta = (item: CustomSaleDetailResponse ) => {
        setSelectedVenta(item);
    };

    const handleSubmit = () => {
        console.log('Submit clicked. selectedVenta:', selectedVenta);
        if (selectedVenta) {
            const infoPago: OrdenCompraInfoPago = {
                carga_fudo_venta_id: Number(selectedVenta.id),
                comentarios: comentarios
            };
            console.log('Submitting infoPago:', infoPago);
            onSubmit(infoPago);
        } else {
            setError('Por favor, seleccione una venta antes de exportar.');
        }
    };
    
    const columns: ColumnaFiltrableProps[] = [
        { Header: 'ID', accessor: 'id', canFilter: false },
        { Header: 'Personas', accessor: 'people', canFilter: false },
        { Header: 'Total', accessor: 'total', canFilter: false },
    ];

    return (
        <>
            <h3>
                Ventas de mesa {mesaFudoNumero}
                {!isLoading && 
                    <Button onClick={fetchItems} variant='secondary' size='sm' className='tabla-s-f--boton-refresh'>
                        <ArrowClockwise size={20} />
                    </Button>
                }
                {isLoading && <Spinner animation="border" role="status" className='tabla-s-f--boton-refresh'/>}
            </h3>
            {!isLoading && (
                <div className="scrollable-table--collections-details">
                    <SortableFilterableTable 
                        columns={columns} 
                        data={ventasCustom}
                        onSelect={(item) => handleSelectVenta(item as CustomSaleDetailResponse)}
                        selectedItem={selectedVenta}
                    />
                </div>
            )}
            
            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <Form.Group className="mb-3">
                <Form.Label>Comentarios adicionales</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={comentarios}
                    onChange={(e) => setComentarios(e.target.value)}
                />
            </Form.Group>

            <div className="action-buttons-container">
                <Button onClick={handleSubmit} className="boton-cop">Exportar a FUDO</Button>
            </div>
        </>
    );
}

export default DetallesMesa;