import { AuthenticationException } from '../authenticationException';
import { Request } from '../../request/request';
import { AuthenticationRequest } from '../../request/authenticationRequest';
import { BaseCallback } from '../../callback/baseCallback';
import { Credentials } from '../../../common/credentials';
import { DatabaseConnectionRequest } from './databaseConnectionRequest';
import { DatabaseUser } from '../../../common/databaseUser';
/**
 * Represent a request that creates a user in a Auth0 Database connection and then logs in.
 */
export declare class SignUpRequest implements Request<Credentials, AuthenticationException>, AuthenticationRequest {
    private readonly signUpRequest;
    private readonly authenticationRequest;
    constructor(signUpRequest: DatabaseConnectionRequest<DatabaseUser, AuthenticationException>, authenticationRequest: AuthenticationRequest);
    /**
     * Add additional parameters sent when creating a user.
     *
     * @param parameters sent with the request and must be non-null
     * @see ParameterBuilder
     * @return itself
     */
    addSignUpParameters(parameters: Map<String, Object>): SignUpRequest;
    /**
     * Add additional parameters sent when logging the user in
     *
     * @param parameters sent with the request and must be non-null
     * @return itself
     * @see ParameterBuilder
     */
    addAuthenticationParameters(parameters: {
        [key: string]: any;
    }): SignUpRequest;
    setScope(scope: string): SignUpRequest;
    setAudience(audience: string): SignUpRequest;
    setAccessToken(accessToken: string): SignUpRequest;
    setGrantType(grantType: string): SignUpRequest;
    setRealm(realm: string): SignUpRequest;
    /**
     * Starts to execute create user request and then logs the user in.
     *
     * @param callback called on either success or failure.
     */
    start(callback: BaseCallback<Credentials, AuthenticationException>): void;
}
