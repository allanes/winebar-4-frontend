import React, { useState, useMemo } from 'react';
import { MesaFudoCustom } from '../../codegen_output';
import { Table } from 'react-bootstrap';
import { ColumnaFiltrableProps, SortConfig, FudoMesaKey } from './FudoTypes';

interface SortableFilterableTableProps {
  columns: ColumnaFiltrableProps[], 
  data: MesaFudoCustom[], 
  onSelect?: (arg0: MesaFudoCustom) => void, 
  onSort?: (sortConfig: SortConfig ) => void, 
  onFilter?: (filters: Record<string, string | number>) => void;
}

const SortableFilterableTable = (
  { columns, data, onSelect, onSort, onFilter }: SortableFilterableTableProps
) => {
  // State for sorting and filtering
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filters, setFilters] = useState<Record<string, string | number>>({});

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (!aValue || !bValue) {
          return 0
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
        // If no filter is set for a key, or the item matches the filter, it's included
        const itemValue = item[key as FudoMesaKey];
        return !value || (typeof itemValue === 'string' && itemValue.toLowerCase().includes(String(value).toLowerCase()));
      });
    });
  }, [sortedData, filters]);

  const requestSort = (key: FudoMesaKey) => {
    let direction: 'ascending' | 'descending'= 'ascending';
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

  // Function to render sorting icons
  const renderSortIcons = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return '↕'; // or your default sorting icon
    }
    return sortConfig.direction === 'ascending' ? '↑' : '↓'; // Replace with icons if available
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
                  style={{ width: '100%', boxSizing: 'border-box' }} // Ensure input takes full width of cell
                  onChange={(e) => handleFilterChange(column.accessor, e.target.value)}
                />
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      {filteredData.map((item, index) => (
          <tr key={index} onClick={() => onSelect?.(item)}>
            {columns.map(column => (
              <td key={column.accessor}>
                {column.customRenderer 
                  ? column.customRenderer(item)
                  : String(item[column.accessor as keyof MesaFudoCustom])}
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
