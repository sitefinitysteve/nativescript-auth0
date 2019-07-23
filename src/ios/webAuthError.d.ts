export declare class WebAuthError extends Error {
    static noBundleIdentifierFound: WebAuthError;
    static cannotDismissWebAuthController: WebAuthError;
    static userCancelled: WebAuthError;
    static pkceNotAllowed(message: string): WebAuthError;
    static noNonceProvided: WebAuthError;
    static missingResponseParam: WebAuthError;
    static invalidIdTokenNonce: WebAuthError;
    static missingAccessToken: WebAuthError;
    static readonly genericFoundationCode = 1;
    static readonly cancelledFoundationCode = 0;
    static readonly infoKey = "com.auth0.webauth.error.info";
    static readonly errorDomain: String;
    constructor(message: string);
    readonly errorCode: number;
}
