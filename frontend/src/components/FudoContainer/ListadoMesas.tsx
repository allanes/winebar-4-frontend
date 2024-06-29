import React, { useState, useEffect } from 'react';
import { FudoService, MesaFudoCustom } from '../../codegen_output';
import SortableFilterableTable from './SortableFilterableTable';
import Spinner from 'react-bootstrap/Spinner';
import {ArrowClockwise} from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import { ColumnaFiltrableProps } from './FudoTypes';
import './Colecciones.css'

interface ListadoMesasProps {
  onSelectMesa: (arg0: MesaFudoCustom) => void;
  refreshTrigger: boolean;
}

function ListadoMesas({ onSelectMesa, refreshTrigger }: ListadoMesasProps) {
  const [mesasList, setMesasList] = useState<MesaFudoCustom[]>([]);
  const [error, setError] = useState(null);
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

  const columns: ColumnaFiltrableProps[] = [
    // Define columns here
    // { Header: 'ID', accessor: 'id', canFilter: true },
    { 
      Header: 'Numero', 
      accessor: 'number', 
      canFilter: true 
    },
    { 
      Header: 'Lugar', 
      accessor: 'room_id', 
      canFilter: true 
    },
    { 
      Header: 'Ventas', 
      accessor: 'cant_ventas', 
      canFilter: true 
    },
  ];

  return (
    <>
        <h3>
            Listado
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
                onSelect={onSelectMesa}       
            />
        </div>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
    </>
  );
}

export default ListadoMesas;
