import Uri = android.net.Uri;
import { Auth0Exception } from '../../auth0Exception';
import { AuthenticationRequest } from '../authenticationRequest';
import { ErrorBuilder } from '../errorBuilder';
import { ParameterizableRequest } from '../parameterizableRequest';
import { JSONObjectPayload } from '../../../common/jsonObjectPayload';
export declare class RequestFactory {
    static readonly DEFAULT_LOCALE_IF_MISSING: string;
    private static readonly AUTHORIZATION_HEADER;
    private static readonly USER_AGENT_HEADER;
    private static readonly ACCEPT_LANGUAGE_HEADER;
    private static readonly CLIENT_INFO_HEADER;
    private readonly headers;
    constructor(bearerToken?: string);
    setClientInfo(clientInfo: string): void;
    setUserAgent(userAgent: string): void;
    authenticationPOST(url: Uri): AuthenticationRequest;
    POST<T, U extends Auth0Exception>(url: Uri, adapter: JSONObjectPayload<T>, errorBuilder: ErrorBuilder<U>): ParameterizableRequest<T, U>;
    POST<U extends Auth0Exception>(url: Uri, errorBuilder: ErrorBuilder<U>): ParameterizableRequest<void, U>;
    PATCH<T, U extends Auth0Exception>(url: Uri, adapter: JSONObjectPayload<T>, errorBuilder: ErrorBuilder<U>): ParameterizableRequest<T, U>;
    DELETE<T, U extends Auth0Exception>(url: Uri, adapter: JSONObjectPayload<T>, errorBuilder: ErrorBuilder<U>): ParameterizableRequest<T, U>;
    GET<T, U extends Auth0Exception>(url: Uri, adapter: JSONObjectPayload<T>, errorBuilder: ErrorBuilder<U>): ParameterizableRequest<T, U>;
    private addMetrics;
    createSimpleRequest<T, U extends Auth0Exception>(url: Uri, method: string, adapter: JSONObjectPayload<T>, errorBuilder: ErrorBuilder<U>): ParameterizableRequest<T, U>;
    createAuthenticationRequest(url: Uri, method: string): AuthenticationRequest;
    createVoidRequest<U extends Auth0Exception>(url: Uri, method: string, errorBuilder: ErrorBuilder<U>): ParameterizableRequest<void, U>;
    getHeaders(): {
        [key: string]: string;
    };
    static getDefaultLocale(): string;
}
