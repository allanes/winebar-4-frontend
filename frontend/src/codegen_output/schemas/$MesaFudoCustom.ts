/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $MesaFudoCustom = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        number: {
            type: 'number',
            isRequired: true,
        },
        room_id: {
            type: 'string',
            isRequired: true,
        },
        room_name: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        activeSales: {
            type: 'dictionary',
            contains: {
                type: 'array',
                contains: {
                    type: 'SaleData',
                },
            },
            isRequired: true,
        },
    },
} as const;
