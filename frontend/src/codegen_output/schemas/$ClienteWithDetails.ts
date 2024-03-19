/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ClienteWithDetails = {
    properties: {
        nombre: {
            type: 'string',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        activa: {
            type: 'boolean',
            isRequired: true,
        },
        detalle: {
            type: 'any-of',
            contains: [{
                type: 'DetallesAdicionales',
            }, {
                type: 'null',
            }],
        },
        tarjeta: {
            type: 'any-of',
            contains: [{
                type: 'Tarjeta',
            }, {
                type: 'null',
            }],
        },
    },
} as const;
