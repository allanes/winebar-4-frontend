/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Configuracion = {
    properties: {
        monto_maximo_orden_def: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        monto_maximo_pedido_def: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        fecha_ultima_actualizacion: {
            type: 'any-of',
            contains: [{
                type: 'string',
                format: 'date-time',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
    },
} as const;
