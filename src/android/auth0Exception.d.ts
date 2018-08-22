export declare class Auth0Exception extends Error {
    constructor(message?: string);
    static readonly UNKNOWN_ERROR: string;
    static readonly NON_JSON_ERROR: string;
    static readonly EMPTY_BODY_ERROR: string;
    static readonly EMPTY_RESPONSE_BODY_DESCRIPTION: string;
}
