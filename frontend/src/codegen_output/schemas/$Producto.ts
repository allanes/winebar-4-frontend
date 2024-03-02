/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Producto = {
    type: 'dictionary',
    contains: {
        properties: {
            id: {
                type: 'number',
                isRequired: true
            },
            activa: {
                type: 'boolean',
                isRequired: true
            },
            ultimo_cambio_precio: {
                type: 'string',
                isRequired: true
            },
            id_menu: {
                type: 'number',
                isRequired: true
            },
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
        },
    },
} as const;
