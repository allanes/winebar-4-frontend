/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TapaConProductoCreate = {
    type: 'dictionary',
    contains: {
        properties: {
            titulo: {
                type: 'string',
                isRequired: true
            },
            descripcion: {
                type: 'string',
                isRequired: false
            },
            precio: {
                type: 'number',
                isRequired: true
            },
            stock: {
                type: 'number',
                isRequired: false
            },
            foto: {
                type: 'string',
                isRequired: false
            }
        },
    },
} as const;
