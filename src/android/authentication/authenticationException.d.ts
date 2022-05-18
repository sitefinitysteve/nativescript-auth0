import { Auth0Exception } from '../auth0Exception';
export declare class AuthenticationException extends Auth0Exception {
    private static readonly ERROR_KEY;
    private static readonly CODE_KEY;
    private static readonly DESCRIPTION_KEY;
    private static readonly ERROR_DESCRIPTION_KEY;
    private static readonly NAME_KEY;
    private static readonly DEFAULT_MESSAGE;
    private static readonly ERROR_OIDC_ACCESS_TOKEN;
    private static readonly ERROR_OIDC_RO;
    private code;
    private description;
    private statusCode;
    private values;
    /**
     Creates a Auth0 Auth API error when the request's response is not JSON

     - parameter string:     string representation of the response (or null)
     - parameter statusCode: response status code

     - returns: a newly created AuthenticationError
     */
    constructor(_string?: string | undefined, statusCode?: number);
    /**
     Creates a Auth0 Auth API error from a JSON response

     - parameter info: JSON response from Auth0
     - parameter statusCode:    Http Status Code of the Response

     - returns: a newly created AuthenticationError
     */
    constructor(info: {
        [key: string]: any;
    }, statusCode: number);
    private warnIfOIDCError;
    /**
     * Auth0 error code if the server returned one or an internal library code (e.g.: when the server could not be reached)
     *
     * @return the error code.
     */
    getCode(): string;
    /**
     * Http Response status code. Can have value of 0 if not set.
     *
     * @return the status code.
     */
    getStatusCode(): number;
    /**
     * Description of the error.
     * important: You should avoid displaying description to the user, it's meant for debugging only.
     *
     * @return the error description.
     */
    getDescription(): string;
    /**
     * Returns a value from the error map, if any.
     *
     * @param key key of the value to return
     * @return the value if found or null
     */
    getValue(key: string): any;
    isBrowserAppNotAvailable(): boolean;
    isInvalidAuthorizeURL(): boolean;
    isInvalidConfiguration(): boolean;
    isMultifactorRequired(): boolean;
    isMultifactorEnrollRequired(): boolean;
    isMultifactorTokenInvalid(): boolean;
    isMultifactorCodeInvalid(): boolean;
    isPasswordNotStrongEnough(): boolean;
    isPasswordAlreadyUsed(): boolean;
    isPasswordLeaked(): boolean;
    isRuleError(): boolean;
    isInvalidCredentials(): boolean;
    isAccessDenied(): boolean;
    isLoginRequired(): boolean;
}
