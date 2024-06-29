import { MesaFudoCustom } from '../../codegen_output';

export type FudoMesaKey = keyof MesaFudoCustom;

export interface ColumnaFiltrableProps {
  Header: string;
  accessor: FudoMesaKey;
  canFilter: boolean;
  customRenderer?: (item: MesaFudoCustom) => React.ReactNode;
}

export interface SortConfig {
  key: FudoMesaKey;
  direction: 'ascending' | 'descending';
}