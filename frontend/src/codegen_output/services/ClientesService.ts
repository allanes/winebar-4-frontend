/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_handle_create_cliente_with_tarjeta_backend_api_v1_clientes__post } from '../models/Body_handle_create_cliente_with_tarjeta_backend_api_v1_clientes__post';
import type { Cliente } from '../models/Cliente';
import type { ClienteOperaConTarjeta } from '../models/ClienteOperaConTarjeta';
import type { ClienteUpdate } from '../models/ClienteUpdate';
import type { ClienteWithDetails } from '../models/ClienteWithDetails';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClientesService {
    /**
     * Handle Read Cliente By Tarjeta Id
     * @param tarjetaId
     * @returns ClienteOperaConTarjeta Successful Response
     * @throws ApiError
     */
    public static handleReadClienteByTarjetaIdBackendApiV1ClientesConTarjetaTarjetaIdGet(
        tarjetaId: number,
    ): CancelablePromise<ClienteOperaConTarjeta> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/clientes/con-tarjeta/{tarjeta_id}',
            path: {
                'tarjeta_id': tarjetaId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Read Cliente By Id
     * @param id
     * @returns Cliente Successful Response
     * @throws ApiError
     */
    public static handleReadClienteByIdBackendApiV1ClientesIdGet(
        id: number,
    ): CancelablePromise<Cliente> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/clientes/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Update Cliente
     * @param id
     * @param requestBody
     * @returns Cliente Successful Response
     * @throws ApiError
     */
    public static handleUpdateClienteBackendApiV1ClientesIdPut(
        id: number,
        requestBody: ClienteUpdate,
    ): CancelablePromise<Cliente> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/backend/api/v1/clientes/{id}',
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
     * Handle Delete Cliente
     * @param id
     * @returns Cliente Successful Response
     * @throws ApiError
     */
    public static handleDeleteClienteBackendApiV1ClientesIdDelete(
        id: number,
    ): CancelablePromise<Cliente> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/backend/api/v1/clientes/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Read Clientes
     * @param skip
     * @param limit
     * @returns ClienteWithDetails Successful Response
     * @throws ApiError
     */
    public static handleReadClientesBackendApiV1ClientesGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<ClienteWithDetails>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/clientes/',
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
     * Handle Create Cliente With Tarjeta
     * @param tarjetaId
     * @param requestBody
     * @returns Cliente Successful Response
     * @throws ApiError
     */
    public static handleCreateClienteWithTarjetaBackendApiV1ClientesPost(
        tarjetaId: number,
        requestBody: Body_handle_create_cliente_with_tarjeta_backend_api_v1_clientes__post,
    ): CancelablePromise<Cliente> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/clientes/',
            query: {
                'tarjeta_id': tarjetaId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
