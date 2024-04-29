/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RenglonCreate = {
    properties: {
        cantidad: {
            type: 'number',
            isRequired: true,
        },
        producto_id: {
            type: 'number',
            isRequired: true,
        },
        vitte_consumo_id: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
    },
} as const;
