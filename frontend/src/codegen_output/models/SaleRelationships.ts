/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipData } from './RelationshipData';
export type SaleRelationships = {
    customer: Record<string, (RelationshipData | null)>;
    discounts: Record<string, Array<any>>;
    items: Record<string, Array<RelationshipData>>;
    payments: Record<string, Array<any>>;
    tips: Record<string, Array<any>>;
    shippingCosts: Record<string, Array<any>>;
    table: Record<string, RelationshipData>;
    waiter: Record<string, (RelationshipData | null)>;
    saleIdentifier: Record<string, (RelationshipData | null)>;
};

