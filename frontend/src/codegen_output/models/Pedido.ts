/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Renglon } from './Renglon';
export type Pedido = {
    atendido_por: number;
    id: number;
    timestamp_pedido: (string | null);
    cerrado: boolean;
    orden_id: number;
    monto_maximo_pedido: number;
    monto_cargado: (number | null);
    atendido_por_nombre?: (string | null);
    renglones: Array<Renglon>;
};

