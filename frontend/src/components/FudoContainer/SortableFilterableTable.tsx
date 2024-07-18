import React, { useState, useMemo } from 'react';
import { MesaFudoCustom, CustomSaleDetailResponse } from '../../codegen_output';
import { Table } from 'react-bootstrap';
import { ColumnaFiltrableProps, SortConfig, FudoMesaKey } from './FudoTypes';

export type DataItem = MesaFudoCustom | CustomSaleDetailResponse;

interface SortableFilterableTableProps {
  columns: ColumnaFiltrableProps[], 
  data: DataItem[], 
  onSelect?: (arg0: DataItem) => void, 
  onSort?: (sortConfig: SortConfig ) => void, 
  onFilter?: (filters: Record<string, string | number>) => void;
  selectedItem?: DataItem | null;
}

const SortableFilterableTable = (
  { columns, data, onSelect, onSort, onFilter, selectedItem }: SortableFilterableTableProps
) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filters, setFilters] = useState<Record<string, string | number>>({});

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof DataItem];
        const bValue = b[sortConfig.key as keyof DataItem];
        if (aValue === undefined || bValue === undefined) {
          return 0;
        }
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        const itemValue = item[key as keyof DataItem];
        return !value || (typeof itemValue === 'string' && itemValue.toLowerCase().includes(String(value).toLowerCase()));
      });
    });
  }, [sortedData, filters]);

  const requestSort = (key: FudoMesaKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    if (onSort) onSort({ key, direction });
  };

  const handleFilterChange = (key: FudoMesaKey, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter?.(newFilters);
  };

  const renderSortIcons = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return '↕';
    }
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.accessor} onClick={() => requestSort(column.accessor)}>
              {column.Header}
              <span>{renderSortIcons(column.accessor)}</span>
            </th>
          ))}
        </tr>
        <tr>
          {columns.map(column => (
            <th key={`${column.accessor}-filter`}>
              {column.canFilter && (
                <input
                  style={{ width: '100%', boxSizing: 'border-box' }}
                  onChange={(e) => handleFilterChange(column.accessor, e.target.value)}
                />
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      {filteredData.map((item, index) => (
          <tr 
            key={index} 
            onClick={() => onSelect?.(item)}
            className={selectedItem && selectedItem.id === item.id ? 'selected-row' : ''}
            style={{ cursor: 'pointer' }}
          >
            {columns.map(column => (
              <td key={column.accessor}>
                {column.customRenderer 
                  ? column.customRenderer(item)
                  : String(item[column.accessor as keyof DataItem] ?? '')}
              </td>
            ))}
          </tr>
        ))
      }
      </tbody>
    </Table>
  );
};

export default SortableFilterableTable;