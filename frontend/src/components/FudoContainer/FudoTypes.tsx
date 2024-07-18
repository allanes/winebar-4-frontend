import { MesaFudoCustom, CustomSaleDetailResponse } from '../../codegen_output';

export type FudoMesaKey = keyof MesaFudoCustom | keyof CustomSaleDetailResponse;

export interface ColumnaFiltrableProps {
  Header: string;
  accessor: FudoMesaKey | keyof CustomSaleDetailResponse;
  canFilter: boolean;
  customRenderer?: (item: MesaFudoCustom | CustomSaleDetailResponse) => React.ReactNode;
}

export interface SortConfig {
  key: FudoMesaKey;
  direction: 'ascending' | 'descending';
}