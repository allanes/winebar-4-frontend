/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SaleAttributes = {
    properties: {
        closedAt: {
            type: 'any-of',
            contains: [{
                type: 'string',
                format: 'date-time',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        comment: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        createdAt: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        people: {
            type: 'number',
            isRequired: true,
        },
        customerName: {
            type: 'any-of',
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        total: {
            type: 'number',
            isRequired: true,
        },
        saleType: {
            type: 'string',
            isRequired: true,
        },
        saleState: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
