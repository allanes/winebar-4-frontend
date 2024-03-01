/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ClienteOperaConTarjeta = {
    properties: {
        id_cliente: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        tarjeta_id: {
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
        tarjeta: {
            type: 'any-of',
            contains: [{
                type: 'Tarjeta',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        cliente: {
            type: 'any-of',
            contains: [{
                type: 'Cliente',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
    },
} as const;
