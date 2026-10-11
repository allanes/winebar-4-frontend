/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VitteStatus = {
    status: string;
    online: boolean;
    last_success_at?: (string | null);
    last_error_at?: (string | null);
    last_error?: (string | null);
    cached_for_seconds: number;
    circuit_open_until?: (string | null);
    catalog_last_sync_at?: (string | null);
};

