/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Rol } from '../models/Rol';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RolesService {
    /**
     * Read Rol By Id
     * @param id
     * @returns Rol Successful Response
     * @throws ApiError
     */
    public static readRolByIdBackendApiV1RolesIdGet(
        id: number,
    ): CancelablePromise<Rol> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/roles/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Roles
     * @param skip
     * @param limit
     * @returns Rol Successful Response
     * @throws ApiError
     */
    public static readRolesBackendApiV1RolesGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<Rol>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/roles/',
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
