/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Tarjeta } from '../models/Tarjeta';
import type { TarjetaCreate } from '../models/TarjetaCreate';
import type { TarjetaUpdate } from '../models/TarjetaUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TarjetasService {
    /**
     * Read Tarjeta By Id
     * @param id
     * @returns Tarjeta Successful Response
     * @throws ApiError
     */
    public static readTarjetaByIdBackendApiV1TarjetasIdGet(
        id: number,
    ): CancelablePromise<Tarjeta> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/tarjetas/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Tarjeta
     * @param id
     * @param requestBody
     * @returns Tarjeta Successful Response
     * @throws ApiError
     */
    public static updateTarjetaBackendApiV1TarjetasIdPut(
        id: number,
        requestBody: TarjetaUpdate,
    ): CancelablePromise<Tarjeta> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/backend/api/v1/tarjetas/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Tarjeta
     * @param id
     * @returns Tarjeta Successful Response
     * @throws ApiError
     */
    public static deleteTarjetaBackendApiV1TarjetasIdDelete(
        id: number,
    ): CancelablePromise<Tarjeta> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/backend/api/v1/tarjetas/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Tarjetas
     * @param skip
     * @param limit
     * @returns Tarjeta Successful Response
     * @throws ApiError
     */
    public static readTarjetasBackendApiV1TarjetasGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<Tarjeta>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/tarjetas/',
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
     * Create Tarjeta
     * @param requestBody
     * @returns Tarjeta Successful Response
     * @throws ApiError
     */
    public static createTarjetaBackendApiV1TarjetasPost(
        requestBody: TarjetaCreate,
    ): CancelablePromise<Tarjeta> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/tarjetas/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
