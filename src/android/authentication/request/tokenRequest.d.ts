import { AuthenticationException } from '../authenticationException';
import { Request } from '../../request/request';
import { ParameterizableRequest } from '../../request/parameterizableRequest';
import { BaseCallback } from '../../callback/baseCallback';
import { Credentials } from '../../../common/credentials';
export declare class TokenRequest implements Request<Credentials, AuthenticationException> {
    private static readonly OAUTH_CODE_VERIFIER_KEY;
    private readonly request;
    constructor(request: ParameterizableRequest<Credentials, AuthenticationException>);
    setCodeVerifier(codeVerifier: string): TokenRequest;
    start(callback: BaseCallback<Credentials, AuthenticationException>): void;
}
