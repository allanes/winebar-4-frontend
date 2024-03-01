/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Turno = {
    properties: {
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
        ingresos_totales: {
            type: 'number',
            isRequired: true,
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
    },
} as const;
