/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Vino } from '../models/Vino';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VinosService {
    /**
     * Handle Get Foto
     * @param nombre
     * @returns any Successful Response
     * @throws ApiError
     */
    public static handleGetFotoBackendApiV1VinosFotoNombreGet(
        nombre: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/vinos/foto/{nombre}',
            path: {
                'nombre': nombre,
            },
            responseType: 'blob',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Read Vino By Product Id
     * @param productId
     * @returns Vino Successful Response
     * @throws ApiError
     */
    public static handleReadVinoByProductIdBackendApiV1VinosProductIdGet(
        productId: number,
    ): CancelablePromise<Vino> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/vinos/{product_id}',
            path: {
                'product_id': productId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
