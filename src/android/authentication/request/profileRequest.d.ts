import { AuthenticationException } from '../authenticationException';
import { Request } from '../../request/request';
import { Authentication } from '../../result/authentication';
import { AuthenticationRequest } from '../../request/authenticationRequest';
import { ParameterizableRequest } from '../../request/parameterizableRequest';
import { UserInfo } from '../../../common/userInfo';
import { BaseCallback } from '../../callback/baseCallback';
/**
 * Request to fetch a profile after a successful authentication with Auth0 Authentication API
 */
export declare class ProfileRequest implements Request<Authentication, AuthenticationException> {
    private static readonly HEADER_AUTHORIZATION;
    private readonly credentialsRequest;
    private readonly userInfoRequest;
    constructor(credentialsRequest: AuthenticationRequest, userInfoRequest: ParameterizableRequest<UserInfo, AuthenticationException>);
    /**
     * Adds additional parameters for the login request
     *
     * @param parameters as a non-null dictionary
     * @return itself
     */
    addParameters(parameters: {
        [key: string]: any;
    }): ProfileRequest;
    /**
     * Set the scope used to authenticate the user
     *
     * @param scope value
     * @return itself
     */
    setScope(scope: string): ProfileRequest;
    /**
     * Starts the log in request and then fetches the user's profile
     *
     * @param callback called on either success or failure
     */
    start(callback: BaseCallback<Authentication, AuthenticationException>): void;
}
