/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Turno = {
    abierto_por: number;
    id: number;
    timestamp_apertura: string;
    cantidad_de_ordenes: number;
    cantidad_tapas: number;
    cantidad_usuarios_vip: number;
    monto_en_caja: number;
    comentarios?: (string | null);
    cerrado_por?: (number | null);
    timestamp_cierre?: (string | null);
    clientes_activos?: (number | null);
    abierto_por_nombre?: (string | null);
    cerrado_por_nombre?: (string | null);
    suma_ordenes_cobradas?: (number | null);
    diferencia?: (number | null);
};

