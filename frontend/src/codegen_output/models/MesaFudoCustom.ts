/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SaleData } from './SaleData';
export type MesaFudoCustom = {
    id: number;
    number: number;
    room_id: string;
    room_name?: (string | null);
    cant_ventas: number;
    activeSales: Record<string, Array<SaleData>>;
};

