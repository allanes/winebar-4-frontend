/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $OrdenCompraDetallada = {
    properties: {
        precarga_usada: {
            type: 'number',
            isRequired: true,
        },
        monto_maximo_orden: {
            type: 'number',
            isRequired: true,
        },
        turno_id: {
            type: 'number',
            isRequired: true,
        },
        cliente_id: {
            type: 'number',
            isRequired: true,
        },
        abierta_por: {
            type: 'number',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        monto_cargado: {
            type: 'number',
            isRequired: true,
        },
        monto_cobrado: {
            type: 'number',
            isRequired: true,
        },
        timestamp_apertura_orden: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        timestamp_cierre_orden: {
            type: 'any-of',
            contains: [{
                type: 'string',
                format: 'date-time',
            }, {
                type: 'null',
            }],
        },
        cerrada_por: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        cerrada_por_nombre: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        pedidos: {
            type: 'array',
            contains: {
                type: 'Pedido',
            },
            isRequired: true,
        },
        nombre_cliente: {
            type: 'string',
            isRequired: true,
        },
        rol: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
