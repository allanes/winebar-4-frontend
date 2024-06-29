/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Sale = {
    properties: {
        type: {
            type: 'string',
            isRequired: true,
        },
        id: {
            type: 'string',
            isRequired: true,
        },
        attributes: {
            type: 'SaleAttributes',
            isRequired: true,
        },
        relationships: {
            type: 'SaleRelationships',
            isRequired: true,
        },
    },
} as const;
