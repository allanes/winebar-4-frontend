/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pedido } from '../models/Pedido';
import type { PedidoUpdate } from '../models/PedidoUpdate';
import type { Renglon } from '../models/Renglon';
import type { RenglonCreate } from '../models/RenglonCreate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PedidosService {
    /**
     * Handle Read Pedido By Rfid
     * @param tarjetaId
     * @returns Pedido Successful Response
     * @throws ApiError
     */
    public static handleReadPedidoByRfidBackendApiV1PedidosByRfidTarjetaIdGet(
        tarjetaId: number,
    ): CancelablePromise<Pedido> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/pedidos/by-rfid/{tarjeta_id}',
            path: {
                'tarjeta_id': tarjetaId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Abrir Pedido
     * @param tarjetaCliente
     * @returns Pedido Successful Response
     * @throws ApiError
     */
    public static handleAbrirPedidoBackendApiV1PedidosAbrirPost(
        tarjetaCliente: number,
    ): CancelablePromise<Pedido> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/pedidos/abrir',
            query: {
                'tarjeta_cliente': tarjetaCliente,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Agregar Producto
     * @param tarjetaCliente
     * @param requestBody
     * @returns Renglon Successful Response
     * @throws ApiError
     */
    public static handleAgregarProductoBackendApiV1PedidosAgregarProductoPost(
        tarjetaCliente: number,
        requestBody: RenglonCreate,
    ): CancelablePromise<Renglon> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/pedidos/agregar-producto',
            query: {
                'tarjeta_cliente': tarjetaCliente,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Quitar Renglon
     * @param tarjetaCliente
     * @param productoId
     * @returns Renglon Successful Response
     * @throws ApiError
     */
    public static handleQuitarRenglonBackendApiV1PedidosQuitarProductoPost(
        tarjetaCliente: number,
        productoId: number,
    ): CancelablePromise<Renglon> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/pedidos/quitar-producto',
            query: {
                'tarjeta_cliente': tarjetaCliente,
                'producto_id': productoId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Cerrar Pedido
     * @param tarjetaCliente
     * @returns Pedido Successful Response
     * @throws ApiError
     */
    public static handleCerrarPedidoBackendApiV1PedidosCerrarPost(
        tarjetaCliente: number,
    ): CancelablePromise<Pedido> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/pedidos/cerrar',
            query: {
                'tarjeta_cliente': tarjetaCliente,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Update Pedido
     * @param id
     * @param requestBody
     * @returns Pedido Successful Response
     * @throws ApiError
     */
    public static handleUpdatePedidoBackendApiV1PedidosIdPut(
        id: number,
        requestBody: PedidoUpdate,
    ): CancelablePromise<Pedido> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/backend/api/v1/pedidos/{id}',
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
     * Handle Read Pedidos By Id
     * @param id
     * @returns Pedido Successful Response
     * @throws ApiError
     */
    public static handleReadPedidosByIdBackendApiV1PedidosIdGet(
        id: number,
    ): CancelablePromise<Pedido> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/pedidos/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Read Pedidos
     * @param skip
     * @param limit
     * @returns Pedido Successful Response
     * @throws ApiError
     */
    public static handleReadPedidosBackendApiV1PedidosGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<Pedido>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/pedidos/',
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
