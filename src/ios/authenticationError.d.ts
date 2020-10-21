import { Auth0Error } from './auth0Error';
export declare class AuthenticationError extends Auth0Error {
    constructor(_string?: string | undefined, statusCode?: number);
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
    value<T>(key: string): T | undefined;
}
