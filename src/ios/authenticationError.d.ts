import { Auth0Error } from './auth0Error';
export declare class AuthenticationError extends Auth0Error {
    constructor(_string?: string | undefined, statusCode?: number);
    constructor(info: {
        [key: string]: any;
    }, statusCode: number);
    readonly isMultifactorRequired: boolean;
    readonly isMultifactorEnrollRequired: boolean;
    readonly isMultifactorCodeInvalid: boolean;
    readonly isMultifactorTokenInvalid: boolean;
    readonly isPasswordNotStrongEnough: boolean;
    readonly isPasswordAlreadyUsed: boolean;
    readonly isRuleError: boolean;
    readonly isInvalidCredentials: boolean;
    readonly isAccessDenied: boolean;
    readonly isTooManyAttempts: boolean;
    value<T>(key: string): T | undefined;
}
