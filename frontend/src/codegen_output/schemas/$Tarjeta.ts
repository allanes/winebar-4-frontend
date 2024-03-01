/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Tarjeta = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        raw_rfid: {
            type: 'string',
            isRequired: true,
        },
        activa: {
            type: 'boolean',
            isRequired: true,
        },
        fecha_alta: {
            type: 'any-of',
            contains: [{
                type: 'string',
                format: 'date-time',
            }, {
                type: 'null',
            }],
        },
        fecha_ultimo_uso: {
            type: 'any-of',
            contains: [{
                type: 'string',
                format: 'date-time',
            }, {
                type: 'null',
            }],
        },
        entregada: {
            type: 'boolean',
            isRequired: true,
        },
        presente_en_salon: {
            type: 'boolean',
            isRequired: true,
        },
        monto_precargado: {
            type: 'number',
            isRequired: true,
        },
        rol_id: {
            type: 'number',
            isRequired: true,
        },
        rol: {
            type: 'Rol',
            isRequired: true,
        },
    },
} as const;
