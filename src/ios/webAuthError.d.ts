export declare class WebAuthError extends Error {
    static noBundleIdentifierFound: WebAuthError;
    static cannotDismissWebAuthController: WebAuthError;
    static userCancelled: WebAuthError;
    static pkceNotAllowed(message: string): WebAuthError;
    static noNonceProvided: WebAuthError;
    static missingResponseParam: WebAuthError;
    static invalidIdTokenNonce: WebAuthError;
    static missingAccessToken: WebAuthError;
    static readonly genericFoundationCode: number;
    static readonly cancelledFoundationCode: number;
    static readonly infoKey: string;
    static readonly errorDomain: String;
    constructor(message: string);
    readonly errorCode: number;
}
