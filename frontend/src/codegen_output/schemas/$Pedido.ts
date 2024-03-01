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
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        cerrado: {
            type: 'boolean',
            isRequired: true,
        },
        promocion_aplicada: {
            type: 'boolean',
            isRequired: true,
        },
        orden_id: {
            type: 'number',
            isRequired: true,
        },
        renglon: {
            type: 'array',
            contains: {
                type: 'Renglon',
            },
            isRequired: true,
        },
    },
} as const;
