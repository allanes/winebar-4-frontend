/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Configuracion } from '../models/Configuracion';
import type { ConfiguracionCreate } from '../models/ConfiguracionCreate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ConfiguracionService {
    /**
     * Handle Read Configuracion By Id
     * @param id
     * @returns Configuracion Successful Response
     * @throws ApiError
     */
    public static handleReadConfiguracionByIdBackendApiV1ConfiguracionesIdGet(
        id: number,
    ): CancelablePromise<Configuracion> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/configuraciones/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Get Last Configuracion
     * @returns Configuracion Successful Response
     * @throws ApiError
     */
    public static handleGetLastConfiguracionBackendApiV1ConfiguracionesLastGet(): CancelablePromise<Configuracion> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/configuraciones/last',
        });
    }
    /**
     * Handle Read Configuracions
     * @param skip
     * @param limit
     * @returns Configuracion Successful Response
     * @throws ApiError
     */
    public static handleReadConfiguracionsBackendApiV1ConfiguracionesGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<Configuracion>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/configuraciones/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Create Configuracion
     * @param requestBody
     * @returns Configuracion Successful Response
     * @throws ApiError
     */
    public static handleCreateConfiguracionBackendApiV1ConfiguracionesPost(
        requestBody: ConfiguracionCreate,
    ): CancelablePromise<Configuracion> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/configuraciones/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
