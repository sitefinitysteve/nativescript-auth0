export declare const unknownError = "a0.sdk.internal_error.unknown";
export declare const nonJSONError = "a0.sdk.internal_error.plain";
export declare const emptyBodyError = "a0.sdk.internal_error.empty";
declare class Auth0Error extends Error {
    readonly info: {
        [key: string]: any;
    };
    constructor(infoOrString?: {
        [key: string]: any;
    } | string | undefined, statusCode?: number);
    get code(): string;
}
export { Auth0Error };
