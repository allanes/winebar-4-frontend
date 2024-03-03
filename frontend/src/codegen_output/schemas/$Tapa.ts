/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Tapa = {
    properties: {
        foto: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        producto: {
            type: 'any-of',
            contains: [{
                type: 'Producto',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
    },
} as const;
