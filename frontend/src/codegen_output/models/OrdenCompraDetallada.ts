/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pedido } from './Pedido';
import type { TransaccionVino } from './TransaccionVino';
export type OrdenCompraDetallada = {
    precarga_usada: number;
    monto_maximo_orden: number;
    turno_id: number;
    cliente_id: number;
    abierta_por: number;
    id: number;
    monto_cargado: number;
    monto_cobrado: number;
    monto_cobrado_efectivo: number;
    monto_cobrado_tarjeta: number;
    monto_cobrado_transferencia: number;
    timestamp_apertura_orden: string;
    timestamp_cierre_orden?: (string | null);
    cerrada_por?: (number | null);
    comentarios?: (string | null);
    cerrada_por_nombre?: (string | null);
    pedidos: Array<Pedido>;
    nombre_cliente: string;
    rol: string;
    consumos_vino: Array<TransaccionVino>;
};

