/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Pedido = {
    properties: {
        atendido_por: {
            type: 'number',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        timestamp_pedido: {
            type: 'any-of',
            contains: [{
                type: 'string',
                format: 'date-time',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        cerrado: {
            type: 'boolean',
            isRequired: true,
        },
        orden_id: {
            type: 'number',
            isRequired: true,
        },
        renglones: {
            type: 'array',
            contains: {
                type: 'Renglon',
            },
            isRequired: true,
        },
    },
} as const;
