/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PersonalInterno = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        nombre: {
            type: 'string',
            isRequired: true,
        },
        apellido: {
            type: 'string',
            isRequired: true,
        },
        telefono: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        usuario: {
            type: 'string',
            isRequired: true,
        },
        activa: {
            type: 'boolean',
            isRequired: true,
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
