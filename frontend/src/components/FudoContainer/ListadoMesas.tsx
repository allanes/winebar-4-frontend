import React, { useState, useEffect } from 'react';
import { FudoService, MesaFudoCustom, CustomSaleDetailResponse } from '../../codegen_output';
import SortableFilterableTable from './SortableFilterableTable';
import Spinner from 'react-bootstrap/Spinner';
import {ArrowClockwise} from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import { ColumnaFiltrableProps } from './FudoTypes';
import './Colecciones.css'

type DataItem = MesaFudoCustom | CustomSaleDetailResponse;

interface ListadoMesasProps {
  onSelectMesa: (arg0: MesaFudoCustom) => void;
  refreshTrigger: boolean;
}

function ListadoMesas({ onSelectMesa, refreshTrigger }: ListadoMesasProps) {
  const [mesasList, setMesasList] = useState<MesaFudoCustom[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCollections();
  }, [refreshTrigger]);

  const fetchCollections = () => {
    setMesasList([])
    setIsLoading(true);
    FudoService.readTablesBackendApiV1FudoMesasGet()
    .then(response => {
        setMesasList(response.data)
        setIsLoading(false);
    })
    .catch(error => {
      console.error('Error fetching collections:', error);
      setError(error.message);
      setIsLoading(false);
    });
  };

  const handleSelectItem = (item: DataItem) => {
    if ('room_id' in item) {
      onSelectMesa(item as MesaFudoCustom);
    } else {
      console.warn('Selected item is not a MesaFudoCustom');
    }
  };

  const columns: ColumnaFiltrableProps[] = [
    { 
      Header: 'Numero', 
      accessor: 'number', 
      canFilter: false 
    },
    { 
      Header: 'Lugar', 
      accessor: 'room_name', 
      canFilter: false 
    },
    { 
      Header: 'Ventas', 
      accessor: 'cant_ventas', 
      canFilter: false 
    },
  ];

  return (
    <>
        <h3>
            Mesas Fudo
            {!isLoading && 
              <Button onClick={fetchCollections} variant='secondary' size='sm' className='tabla-s-f--boton-refresh'>
                  <ArrowClockwise size={20} />
              </Button>
            }
            {isLoading && 
                <Spinner animation="border" role="status"  className='tabla-s-f--boton-refresh'/>
            }
        </h3>
        <div className="scrollable-table--collections-list">
            <SortableFilterableTable 
                columns={columns} 
                data={mesasList}
                onSelect={handleSelectItem}       
            />
        </div>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
    </>
  );
}

export default ListadoMesas;