/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrdenCompra } from '../models/OrdenCompra';
import type { OrdenCompraUpdate } from '../models/OrdenCompraUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdenesService {
    /**
     * Handle Read Orden By Client Rfid
     * @param tarjetaId
     * @returns OrdenCompra Successful Response
     * @throws ApiError
     */
    public static handleReadOrdenByClientRfidBackendApiV1OrdenesByRfidTarjetaIdGet(
        tarjetaId: number,
    ): CancelablePromise<OrdenCompra> {
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
     * @param tarjetaCliente
     * @returns OrdenCompra Successful Response
     * @throws ApiError
     */
    public static handleCerrarOrdenBackendApiV1OrdenesCerrarPost(
        tarjetaCliente: number,
    ): CancelablePromise<OrdenCompra> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/ordenes/cerrar',
            query: {
                'tarjeta_cliente': tarjetaCliente,
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
     * @returns OrdenCompra Successful Response
     * @throws ApiError
     */
    public static handleReadOrdenByIdBackendApiV1OrdenesIdGet(
        id: number,
    ): CancelablePromise<OrdenCompra> {
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
     * @param skip
     * @param limit
     * @returns OrdenCompra Successful Response
     * @throws ApiError
     */
    public static handleReadOrdensBackendApiV1OrdenesGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<OrdenCompra>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/ordenes/',
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
