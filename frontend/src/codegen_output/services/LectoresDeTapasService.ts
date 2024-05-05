/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LectorTapa } from '../models/LectorTapa';
import type { LectorTapaReceive } from '../models/LectorTapaReceive';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LectoresDeTapasService {
    /**
     * Handle Agregar Lector Tapa
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static handleAgregarLectorTapaBackendApiV1LectoresTapasInformarLectorTapaPost(
        requestBody: LectorTapaReceive,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/lectores-tapas/informar-lector-tapa',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Asociar Lector Con Tapa
     * @param idLector
     * @param idProducto
     * @returns LectorTapa Successful Response
     * @throws ApiError
     */
    public static handleAsociarLectorConTapaBackendApiV1LectoresTapasCambiarAsociacionTapaPost(
        idLector: number,
        idProducto: (number | null),
    ): CancelablePromise<LectorTapa> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/lectores-tapas/cambiar-asociacion-tapa',
            query: {
                'id_lector': idLector,
                'id_producto': idProducto,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Read Lectors Tapas Por Terminal
     * @returns LectorTapa Successful Response
     * @throws ApiError
     */
    public static handleReadLectorsTapasPorTerminalBackendApiV1LectoresTapasPorTerminalGet(): CancelablePromise<Array<LectorTapa>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/lectores-tapas/por-terminal',
        });
    }
    /**
     * Handle Read Lectors Tapas
     * @param skip
     * @param limit
     * @returns LectorTapa Successful Response
     * @throws ApiError
     */
    public static handleReadLectorsTapasBackendApiV1LectoresTapasGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<LectorTapa>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/lectores-tapas/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
