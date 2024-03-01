/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Renglon } from './Renglon';
export type Pedido = {
    atendido_por: number;
    id: number;
    timestamp_pedido: string;
    cerrado: boolean;
    promocion_aplicada: boolean;
    orden_id: number;
    renglon: Array<Renglon>;
};

