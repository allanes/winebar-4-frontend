import React, { useState, useEffect } from 'react';
import { FudoService, CustomSaleDetailResponse, MesaFudoCustom } from '../../codegen_output';
import SortableFilterableTable from './SortableFilterableTable';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button'
import { ArrowClockwise } from 'react-bootstrap-icons';
// import AgregarItemModal from './AgregarItems';
import { ColumnaFiltrableProps } from './FudoTypes';
import './Colecciones.css'

interface DetallesMesaProps {
    mesaFudoId: number;
    onRefreshListado: () => void;
}

type DataItem = CustomSaleDetailResponse | MesaFudoCustom;

function DetallesMesa({ mesaFudoId, onRefreshListado }: DetallesMesaProps) {
    const [ventasCustom, setVentasCustom] = useState<CustomSaleDetailResponse[]>([]);
    const [selectedVenta, setSelectedVenta] = useState<CustomSaleDetailResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showAgregarModal, setShowAgregarModal] = useState(false);

    useEffect(() => {
        fetchItems();
    }, [mesaFudoId]);

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

    const handleSelectVenta = (item: DataItem) => {
        if ('type' in item && item.type === 'customSaleDetail') {
            setSelectedVenta(item as CustomSaleDetailResponse);
        } else {
            console.warn('Selected item is not a CustomSaleDetailResponse');
            setSelectedVenta(null);
        }
    };
    
    const columns: ColumnaFiltrableProps[] = [
        { 
            Header: 'ID', 
            accessor: 'id', 
            canFilter: true 
        },
        { 
            Header: 'Personas', 
            accessor: 'people', 
            canFilter: true 
        },
        { 
            Header: 'Total', 
            accessor: 'total', 
            canFilter: true 
        },
    ];

    // Function to refresh items after adding a new item
    const onItemAdded = () => {
        fetchItems();
        onRefreshListado();
    };

    return (
        <>
            <h3>
                Ventas de mesa {mesaFudoId}
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
                        onSelect={handleSelectVenta}       
                    />
                </div>
            )}
            
            <div className="action-buttons-container">
                <Button variant="primary" onClick={() => setShowAgregarModal(true)} className="btn-agregar">Agregar</Button>
            </div>

            {/* Agregar Item Modal */}
            {/* <AgregarItemModal 
                show={showAgregarModal} 
                onHide={() => setShowAgregarModal(false)}
                collectionId={mesaFudoId}
                onItemAdded={onItemAdded}
            /> */}

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            {selectedVenta && (
                <div className="selected-venta-details">
                    <h4>Venta Seleccionada:</h4>
                    <p>ID: {selectedVenta.id}</p>
                    <p>Personas: {selectedVenta.people}</p>
                    <p>Total: {selectedVenta.total}</p>
                </div>
            )}
        </>
    );
}

export default DetallesMesa;