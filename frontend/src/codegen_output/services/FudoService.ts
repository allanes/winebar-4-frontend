/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomSaleDetailResponse } from '../models/CustomSaleDetailResponse';
import type { CustomTableResponse } from '../models/CustomTableResponse';
import type { SaleResponse } from '../models/SaleResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FudoService {
    /**
     * Read Tables
     * @param onlyActive Return only tables with active sales
     * @returns CustomTableResponse Successful Response
     * @throws ApiError
     */
    public static readTablesBackendApiV1FudoMesasGet(
        onlyActive: boolean = true,
    ): CancelablePromise<CustomTableResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/fudo/mesas',
            query: {
                'only_active': onlyActive,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Sales By Mesa
     * @param mesaId
     * @returns CustomSaleDetailResponse Successful Response
     * @throws ApiError
     */
    public static readSalesByMesaBackendApiV1FudoVentasPorMesaMesaIdGet(
        mesaId: number,
    ): CancelablePromise<Array<CustomSaleDetailResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/fudo/ventas/por-mesa/{mesa_id}',
            path: {
                'mesa_id': mesaId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Sale
     * @param saleId
     * @returns SaleResponse Successful Response
     * @throws ApiError
     */
    public static readSaleBackendApiV1FudoVentasSaleIdGet(
        saleId: string,
    ): CancelablePromise<SaleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/fudo/ventas/{sale_id}',
            path: {
                'sale_id': saleId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
