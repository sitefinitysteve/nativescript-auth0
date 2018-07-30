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
    constructor(_string?: string | undefined, statusCode?: number);
    constructor(info: {
        [key: string]: any;
    }, statusCode: number);
    private warnIfOIDCError();
    getCode(): string;
    getStatusCode(): number;
    getDescription(): string;
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
