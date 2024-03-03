/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Body_handle_create_cliente_with_tarjeta_backend_api_v1_clientes__post = {
    properties: {
        cliente_in: {
            type: 'ClienteCreate',
            isRequired: true,
        },
        detalle_adicional_in: {
            type: 'all-of',
            contains: [{
                type: 'DetallesAdicionalesForUI',
            }],
        },
    },
} as const;
