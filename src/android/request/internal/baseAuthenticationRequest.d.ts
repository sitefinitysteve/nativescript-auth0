import Uri = android.net.Uri;
import { SimpleRequest } from './simpleRequest';
import { Credentials } from '../../../common/credentials';
import { AuthenticationException } from '../../authentication/authenticationException';
import { AuthenticationRequest } from '../authenticationRequest';
import { JSONObjectPayload } from '../../../common/jsonObjectPayload';
export declare class BaseAuthenticationRequest extends SimpleRequest<Credentials, AuthenticationException> implements AuthenticationRequest {
    private static readonly TAG;
    constructor(url: Uri, httpMethod: string, clazz: JSONObjectPayload<Credentials>);
    setGrantType(grantType: String): AuthenticationRequest;
    setRealm(realm: String): AuthenticationRequest;
    setScope(scope: String): AuthenticationRequest;
    setAudience(audience: String): AuthenticationRequest;
    setAccessToken(accessToken: String): AuthenticationRequest;
    addAuthenticationParameters(parameters: {
        [key: string]: any;
    }): AuthenticationRequest;
}
