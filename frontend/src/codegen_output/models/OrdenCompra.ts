/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type OrdenCompra = {
    precarga_usada: number;
    monto_maximo_orden: number;
    turno_id: number;
    cliente_id: number;
    abierta_por: number;
    id: number;
    monto_cargado: number;
    monto_cobrado: number;
    timestamp_apertura_orden: string;
    timestamp_cierre_orden?: (string | null);
    cerrada_por?: (number | null);
};

