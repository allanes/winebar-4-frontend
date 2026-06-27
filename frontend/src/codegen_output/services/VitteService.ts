/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VitteStatus } from '../models/VitteStatus';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VitteService {
    /**
     * Handle Read Vitte Status
     * @returns VitteStatus Successful Response
     * @throws ApiError
     */
    public static handleReadVitteStatusBackendApiV1VitteStatusGet(): CancelablePromise<VitteStatus> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/vitte/status',
        });
    }
}
