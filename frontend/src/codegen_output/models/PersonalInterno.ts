/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Tarjeta } from './Tarjeta';
export type PersonalInterno = {
    id: number;
    nombre: string;
    apellido: string;
    telefono?: (string | null);
    usuario: string;
    activa: boolean;
    tarjeta?: (Tarjeta | null);
};

