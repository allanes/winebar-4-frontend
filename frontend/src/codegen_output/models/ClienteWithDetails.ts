/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DetallesAdicionales } from './DetallesAdicionales';
import type { Tarjeta } from './Tarjeta';
export type ClienteWithDetails = {
    nombre: string;
    id: number;
    activa: boolean;
    detalle?: (DetallesAdicionales | null);
    tarjeta?: (Tarjeta | null);
};

