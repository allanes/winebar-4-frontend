/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Turno } from '../models/Turno';
import type { TurnoUpdate } from '../models/TurnoUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TurnosService {
    /**
     * Handle Abrir Turno
     * @returns Turno Successful Response
     * @throws ApiError
     */
    public static handleAbrirTurnoBackendApiV1TurnosAbrirPost(): CancelablePromise<Turno> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/turnos/abrir',
        });
    }
    /**
     * Handle Cerrar Turno
     * @returns Turno Successful Response
     * @throws ApiError
     */
    public static handleCerrarTurnoBackendApiV1TurnosCerrarPost(): CancelablePromise<Turno> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/turnos/cerrar',
        });
    }
    /**
     * Handle Get Turno Abierto
     * @returns Turno Successful Response
     * @throws ApiError
     */
    public static handleGetTurnoAbiertoBackendApiV1TurnosTurnoEnCursoGet(): CancelablePromise<Turno> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/turnos/turno-en-curso',
        });
    }
    /**
     * Handle Update Turno
     * @param id
     * @param requestBody
     * @returns Turno Successful Response
     * @throws ApiError
     */
    public static handleUpdateTurnoBackendApiV1TurnosIdPut(
        id: number,
        requestBody: TurnoUpdate,
    ): CancelablePromise<Turno> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/backend/api/v1/turnos/{id}',
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
     * Handle Read Turno By Id
     * @param id
     * @returns Turno Successful Response
     * @throws ApiError
     */
    public static handleReadTurnoByIdBackendApiV1TurnosIdGet(
        id: number,
    ): CancelablePromise<Turno> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/turnos/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Handle Read Turnos
     * @param skip
     * @param limit
     * @returns Turno Successful Response
     * @throws ApiError
     */
    public static handleReadTurnosBackendApiV1TurnosGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<Turno>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/turnos/',
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
