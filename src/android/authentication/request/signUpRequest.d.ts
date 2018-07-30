import { AuthenticationException } from '../authenticationException';
import { Request } from '../../request/request';
import { AuthenticationRequest } from '../../request/authenticationRequest';
import { BaseCallback } from '../../callback/baseCallback';
import { Credentials } from '../../../common/credentials';
import { DatabaseConnectionRequest } from './databaseConnectionRequest';
import { DatabaseUser } from '../../../common/databaseUser';
export declare class SignUpRequest implements Request<Credentials, AuthenticationException>, AuthenticationRequest {
    private readonly signUpRequest;
    private readonly authenticationRequest;
    constructor(signUpRequest: DatabaseConnectionRequest<DatabaseUser, AuthenticationException>, authenticationRequest: AuthenticationRequest);
    addSignUpParameters(parameters: Map<String, Object>): SignUpRequest;
    addAuthenticationParameters(parameters: {
        [key: string]: any;
    }): SignUpRequest;
    setScope(scope: string): SignUpRequest;
    setAudience(audience: string): SignUpRequest;
    setAccessToken(accessToken: string): SignUpRequest;
    setGrantType(grantType: string): SignUpRequest;
    setRealm(realm: string): SignUpRequest;
    start(callback: BaseCallback<Credentials, AuthenticationException>): void;
}
