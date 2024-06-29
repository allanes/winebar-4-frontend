/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SaleRelationships = {
    properties: {
        customer: {
            type: 'dictionary',
            contains: {
                type: 'any-of',
                contains: [{
                    type: 'RelationshipData',
                }, {
                    type: 'null',
                }],
            },
            isRequired: true,
        },
        discounts: {
            type: 'dictionary',
            contains: {
                type: 'array',
                contains: {
                    properties: {
                    },
                },
            },
            isRequired: true,
        },
        items: {
            type: 'dictionary',
            contains: {
                type: 'array',
                contains: {
                    type: 'RelationshipData',
                },
            },
            isRequired: true,
        },
        payments: {
            type: 'dictionary',
            contains: {
                type: 'array',
                contains: {
                    properties: {
                    },
                },
            },
            isRequired: true,
        },
        tips: {
            type: 'dictionary',
            contains: {
                type: 'array',
                contains: {
                    properties: {
                    },
                },
            },
            isRequired: true,
        },
        shippingCosts: {
            type: 'dictionary',
            contains: {
                type: 'array',
                contains: {
                    properties: {
                    },
                },
            },
            isRequired: true,
        },
        table: {
            type: 'dictionary',
            contains: {
                type: 'RelationshipData',
            },
            isRequired: true,
        },
        waiter: {
            type: 'dictionary',
            contains: {
                type: 'any-of',
                contains: [{
                    type: 'RelationshipData',
                }, {
                    type: 'null',
                }],
            },
            isRequired: true,
        },
        saleIdentifier: {
            type: 'dictionary',
            contains: {
                type: 'any-of',
                contains: [{
                    type: 'RelationshipData',
                }, {
                    type: 'null',
                }],
            },
            isRequired: true,
        },
    },
} as const;
