/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_handle_upload_foto_backend_api_v1_tapas_foto__id__post } from '../models/Body_handle_upload_foto_backend_api_v1_tapas_foto__id__post';
import type { Tapa } from '../models/Tapa';
import type { TapaConProductoCreate } from '../models/TapaConProductoCreate';
import type { TapaUpdate } from '../models/TapaUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TapasService {
    /**
     * Handle Upload Foto
     * @param id
     * @param formData
     * @returns Tapa Successful Response
     * @throws ApiError
     */
    public static handleUploadFotoBackendApiV1TapasFotoIdPost(
        id: number,
        formData: Body_handle_upload_foto_backend_api_v1_tapas_foto__id__post,
    ): CancelablePromise<Tapa> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/tapas/foto/{id}',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Get Foto
     * @param id
     * @returns any Successful Response
     * @throws ApiError
     */
    public static handleGetFotoBackendApiV1TapasFotoIdGet(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/tapas/foto/{id}',
            path: {
                'id': id,
            },
            responseType: 'blob',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Read Tapa By Id
     * @param id
     * @returns Tapa Successful Response
     * @throws ApiError
     */
    public static handleReadTapaByIdBackendApiV1TapasIdGet(
        id: number,
    ): CancelablePromise<Tapa> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/tapas/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Update Tapa
     * @param id
     * @param requestBody
     * @returns Tapa Successful Response
     * @throws ApiError
     */
    public static handleUpdateTapaBackendApiV1TapasIdPut(
        id: number,
        requestBody: TapaUpdate,
    ): CancelablePromise<Tapa> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/backend/api/v1/tapas/{id}',
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
     * Handle Delete Tapa
     * @param id
     * @returns Tapa Successful Response
     * @throws ApiError
     */
    public static handleDeleteTapaBackendApiV1TapasIdDelete(
        id: number,
    ): CancelablePromise<Tapa> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/backend/api/v1/tapas/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Read Tapas
     * @param skip
     * @param limit
     * @returns Tapa Successful Response
     * @throws ApiError
     */
    public static handleReadTapasBackendApiV1TapasGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<Tapa>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/tapas/',
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
     * Handle Create Tapa With Tarjeta
     * @param requestBody
     * @returns Tapa Successful Response
     * @throws ApiError
     */
    public static handleCreateTapaWithTarjetaBackendApiV1TapasPost(
        requestBody: TapaConProductoCreate,
    ): CancelablePromise<Tapa> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/tapas/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
