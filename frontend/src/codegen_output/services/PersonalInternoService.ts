/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PersonalInterno } from '../models/PersonalInterno';
import type { PersonalInternoCreate } from '../models/PersonalInternoCreate';
import type { PersonalInternoUpdate } from '../models/PersonalInternoUpdate';
import type { PersonalInternoYTarjeta } from '../models/PersonalInternoYTarjeta';
import type { Tarjeta } from '../models/Tarjeta';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PersonalInternoService {
    /**
     * Handle Entregar Tarjeta
     * @param requestBody
     * @returns PersonalInterno Successful Response
     * @throws ApiError
     */
    public static handleEntregarTarjetaBackendApiV1PersonalEntregarTarjetaPost(
        requestBody: PersonalInternoYTarjeta,
    ): CancelablePromise<PersonalInterno> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/personal/entregar-tarjeta',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Devolver Tarjeta
     * @param tarjetaId
     * @returns Tarjeta Successful Response
     * @throws ApiError
     */
    public static handleDevolverTarjetaBackendApiV1PersonalDevolverTarjetaPost(
        tarjetaId: number,
    ): CancelablePromise<Tarjeta> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/personal/devolver-tarjeta',
            query: {
                'tarjeta_id': tarjetaId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Read Personal Interno By Id
     * @param id
     * @returns PersonalInterno Successful Response
     * @throws ApiError
     */
    public static handleReadPersonalInternoByIdBackendApiV1PersonalIdGet(
        id: number,
    ): CancelablePromise<PersonalInterno> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/personal/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Update Personal Interno
     * @param id
     * @param requestBody
     * @returns PersonalInterno Successful Response
     * @throws ApiError
     */
    public static handleUpdatePersonalInternoBackendApiV1PersonalIdPut(
        id: number,
        requestBody: PersonalInternoUpdate,
    ): CancelablePromise<PersonalInterno> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/backend/api/v1/personal/{id}',
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
     * Handle Delete Personal Interno
     * @param id
     * @returns PersonalInterno Successful Response
     * @throws ApiError
     */
    public static handleDeletePersonalInternoBackendApiV1PersonalIdDelete(
        id: number,
    ): CancelablePromise<PersonalInterno> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/backend/api/v1/personal/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Read Personal Internos
     * @param skip
     * @param limit
     * @returns PersonalInterno Successful Response
     * @throws ApiError
     */
    public static handleReadPersonalInternosBackendApiV1PersonalGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<PersonalInterno>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/personal/',
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
     * Handle Create Personal Interno
     * @param requestBody
     * @returns PersonalInterno Successful Response
     * @throws ApiError
     */
    public static handleCreatePersonalInternoBackendApiV1PersonalPost(
        requestBody: PersonalInternoCreate,
    ): CancelablePromise<PersonalInterno> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/personal/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
