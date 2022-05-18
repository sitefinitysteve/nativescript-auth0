import { Auth0Error } from './auth0Error';
/**
 *  Represents an error during a request to Auth0 Authentication API
 */
export declare class AuthenticationError extends Auth0Error {
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
    get isMultifactorRequired(): boolean;
    get isMultifactorEnrollRequired(): boolean;
    get isMultifactorCodeInvalid(): boolean;
    get isMultifactorTokenInvalid(): boolean;
    get isPasswordNotStrongEnough(): boolean;
    get isPasswordAlreadyUsed(): boolean;
    get isRuleError(): boolean;
    get isInvalidCredentials(): boolean;
    get isAccessDenied(): boolean;
    get isTooManyAttempts(): boolean;
    /**
     Returns a value from error `info` dictionary

     - parameter key: key of the value to return

     - returns: the value of key or null if cannot be found or is of the wrong type.
     */
    value<T>(key: string): T | undefined;
}
