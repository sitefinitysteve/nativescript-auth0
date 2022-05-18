import { AuthenticationException } from '../authenticationException';
import { Request } from '../../request/request';
import { ParameterizableRequest } from '../../request/parameterizableRequest';
import { BaseCallback } from '../../callback/baseCallback';
import { Credentials } from '../../../common/credentials';
/**
 * Auth Request to obtain tokens using OAuth2 {@literal /oauth/token} method
 */
export declare class TokenRequest implements Request<Credentials, AuthenticationException> {
    private static readonly OAUTH_CODE_VERIFIER_KEY;
    private readonly request;
    constructor(request: ParameterizableRequest<Credentials, AuthenticationException>);
    /**
     * Adds the code verifier to the request (Public Clients)
     *
     * @param codeVerifier the code verifier used to generate the challenge sent to /authorize.
     * @return itself
     */
    setCodeVerifier(codeVerifier: string): TokenRequest;
    start(callback: BaseCallback<Credentials, AuthenticationException>): void;
}
