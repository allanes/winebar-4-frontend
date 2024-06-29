/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CustomSaleDetailResponse = {
    properties: {
        id: {
            type: 'string',
            isRequired: true,
        },
        type: {
            type: 'string',
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
        saleState: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
