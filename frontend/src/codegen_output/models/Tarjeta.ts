/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Rol } from './Rol';
export type Tarjeta = {
    id: number;
    raw_rfid: string;
    activa: boolean;
    fecha_alta?: (string | null);
    fecha_ultimo_uso?: (string | null);
    entregada: boolean;
    presente_en_salon: boolean;
    monto_precargado: number;
    rol_id: number;
    rol: Rol;
};

