/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrdenCompra } from '../models/OrdenCompra';
import type { OrdenCompraDetallada } from '../models/OrdenCompraDetallada';
import type { OrdenCompraInfoPago } from '../models/OrdenCompraInfoPago';
import type { OrdenCompraUpdate } from '../models/OrdenCompraUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdenesService {
    /**
     * Handle Read Orden By Client Rfid
     * @param tarjetaId
     * @returns OrdenCompraDetallada Successful Response
     * @throws ApiError
     */
    public static handleReadOrdenByClientRfidBackendApiV1OrdenesByRfidTarjetaIdGet(
        tarjetaId: number,
    ): CancelablePromise<OrdenCompraDetallada> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/ordenes/by-rfid/{tarjeta_id}',
            path: {
                'tarjeta_id': tarjetaId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Read Orden By Turno Id
     * @param turnoId
     * @returns OrdenCompraDetallada Successful Response
     * @throws ApiError
     */
    public static handleReadOrdenByTurnoIdBackendApiV1OrdenesByTurnoTurnoIdGet(
        turnoId: number,
    ): CancelablePromise<Array<OrdenCompraDetallada>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/ordenes/by-turno/{turno_id}',
            path: {
                'turno_id': turnoId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Abrir Orden
     * @param tarjetaCliente
     * @returns OrdenCompra Successful Response
     * @throws ApiError
     */
    public static handleAbrirOrdenBackendApiV1OrdenesAbrirPost(
        tarjetaCliente: number,
    ): CancelablePromise<OrdenCompra> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/ordenes/abrir',
            query: {
                'tarjeta_cliente': tarjetaCliente,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Cerrar Orden
     * @param id
     * @param requestBody
     * @returns OrdenCompra Successful Response
     * @throws ApiError
     */
    public static handleCerrarOrdenBackendApiV1OrdenesCerrarPost(
        id: number,
        requestBody: OrdenCompraInfoPago,
    ): CancelablePromise<OrdenCompra> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/ordenes/cerrar',
            query: {
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
     * Export Order To Html
     * @param id
     * @returns string Successful Response
     * @throws ApiError
     */
    public static exportOrderToHtmlBackendApiV1OrdenesExportOrderHtmlGet(
        id: number,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/ordenes/export/order/html',
            query: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Export Order To Pdf
     * @param id
     * @returns any Successful Response
     * @throws ApiError
     */
    public static exportOrderToPdfBackendApiV1OrdenesExportOrderPdfGet(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/ordenes/export/order/pdf',
            query: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Update Orden
     * @param id
     * @param requestBody
     * @returns OrdenCompra Successful Response
     * @throws ApiError
     */
    public static handleUpdateOrdenBackendApiV1OrdenesIdPut(
        id: number,
        requestBody: OrdenCompraUpdate,
    ): CancelablePromise<OrdenCompra> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/backend/api/v1/ordenes/{id}',
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
     * Handle Read Orden By Id
     * @param id
     * @returns OrdenCompraDetallada Successful Response
     * @throws ApiError
     */
    public static handleReadOrdenByIdBackendApiV1OrdenesIdGet(
        id: number,
    ): CancelablePromise<OrdenCompraDetallada> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/ordenes/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Read Ordens
     * @param paraTurnoAbierto
     * @param skip
     * @param limit
     * @param orderBy
     * @param orderAsc
     * @returns OrdenCompraDetallada Successful Response
     * @throws ApiError
     */
    public static handleReadOrdensBackendApiV1OrdenesGet(
        paraTurnoAbierto?: (boolean | null),
        skip?: number,
        limit: number = 100,
        orderBy: string = '',
        orderAsc: boolean = true,
    ): CancelablePromise<Array<OrdenCompraDetallada>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/ordenes/',
            query: {
                'para_turno_abierto': paraTurnoAbierto,
                'skip': skip,
                'limit': limit,
                'order_by': orderBy,
                'order_asc': orderAsc,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
