/**
 List of possible web-based authentication errors

 - NoBundleIdentifierFound:        Cannot get the App's Bundle Identifier to use for redirect_uri.
 - CannotDismissWebAuthController: When trying to dismiss WebAuth controller, no presenter controller could be found.
 - UserCancelled:                  User cancelled the web-based authentication, e.g. tapped the "Done" button in SFSafariViewController
 - PKCENotAllowed:                 PKCE for the supplied Auth0 ClientId was not allowed. You need to set the `Token Endpoint Authentication Method` to `None` in your Auth0 Dashboard
 - noNonceProvided:                A nonce value must be provided to use the response option of id_token
 - invalidIdTokenNonce:            Failed to match token nonce with request nonce
 - missingAccessToken:             access_token missing in response
 */
declare class WebAuthError extends Error {
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
    get errorCode(): number;
}
export { WebAuthError };
