/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
     * Handle Sync Menu Vinos
     * @returns any Successful Response
     * @throws ApiError
     */
    public static handleSyncMenuVinosBackendApiV1VinosSyncMenuVinosGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/vinos/sync-menu-vinos',
        });
    }
    /**
     * Handle Sync Menu Vinos
     * @param rawRfid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static handleSyncMenuVinosBackendApiV1VinosSyncConsumosVinosPorTarjetaGet(
        rawRfid: string = '',
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/vinos/sync-consumos-vinos-por-tarjeta',
            query: {
                'raw_rfid': rawRfid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
