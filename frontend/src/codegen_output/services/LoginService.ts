/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_backend_api_v1_login_access_token_post } from '../models/Body_login_backend_api_v1_login_access_token_post';
import type { PersonalInterno } from '../models/PersonalInterno';
import type { Token } from '../models/Token';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LoginService {
    /**
     * Login
     * @param formData
     * @param conTarjeta
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static loginBackendApiV1LoginAccessTokenPost(
        formData: Body_login_backend_api_v1_login_access_token_post,
        conTarjeta: boolean = true,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/login/access-token',
            query: {
                'con_tarjeta': conTarjeta,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Users Me
     * @returns PersonalInterno Successful Response
     * @throws ApiError
     */
    public static readUsersMeBackendApiV1LoginUsersMeGet(): CancelablePromise<PersonalInterno> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/backend/api/v1/login/users/me',
        });
    }
    /**
     * Test Token
     * Test access token
     * @returns PersonalInterno Successful Response
     * @throws ApiError
     */
    public static testTokenBackendApiV1LoginTestTokenPost(): CancelablePromise<PersonalInterno> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/backend/api/v1/login/test-token',
        });
    }
}
