import Uri = android.net.Uri;
import { SimpleRequest } from './simpleRequest';
import { Credentials } from '../../../common/credentials';
import { AuthenticationException } from '../../authentication/authenticationException';
import { AuthenticationRequest } from '../authenticationRequest';
import { JSONObjectPayload } from '../../../common/jsonObjectPayload';
export declare class BaseAuthenticationRequest extends SimpleRequest<Credentials, AuthenticationException> implements AuthenticationRequest {
    private static readonly TAG;
    constructor(url: Uri, httpMethod: string, clazz: JSONObjectPayload<Credentials>);
    /**
     * Sets the 'grant_type' parameter
     *
     * @param grantType grant type
     * @return itself
     */
    setGrantType(grantType: String): AuthenticationRequest;
    /**
     * Sets the 'realm' parameter. A realm identifies the host against which the authentication will made: be, and usually helps to know which username and password to use.
     *
     * @param realm name of the realm
     * @return itself
     */
    setRealm(realm: String): AuthenticationRequest;
    /**
     * Sets the 'scope' parameter.
     *
     * @param scope a scope value
     * @return itself
     */
    setScope(scope: String): AuthenticationRequest;
    /**
     * Sets the 'audience' parameter.
     *
     * @param audience an audience value
     * @return itself
     */
    setAudience(audience: String): AuthenticationRequest;
    /**
     * Sets the 'access_token' parameter
     *
     * @param accessToken a access token
     * @return itself
     */
    setAccessToken(accessToken: String): AuthenticationRequest;
    addAuthenticationParameters(parameters: {
        [key: string]: any;
    }): AuthenticationRequest;
}
