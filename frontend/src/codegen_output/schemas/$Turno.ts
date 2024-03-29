/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Turno = {
    properties: {
        abierto_por: {
            type: 'number',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        timestamp_apertura: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        cantidad_de_ordenes: {
            type: 'number',
            isRequired: true,
        },
        cantidad_tapas: {
            type: 'number',
            isRequired: true,
        },
        cantidad_usuarios_vip: {
            type: 'number',
            isRequired: true,
        },
        monto_en_caja: {
            type: 'number',
            isRequired: true,
        },
        comentarios: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        cerrado_por: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        timestamp_cierre: {
            type: 'any-of',
            contains: [{
                type: 'string',
                format: 'date-time',
            }, {
                type: 'null',
            }],
        },
        clientes_activos: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        suma_ordenes_cobradas: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        abierto_por_nombre: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        cerrado_por_nombre: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
    },
} as const;
