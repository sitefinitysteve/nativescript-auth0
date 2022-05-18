import { AuthCallback } from './authCallback';
import { AlgorithmHelper } from './algorithmHelper';
import { AuthenticationAPIClient } from '../authentication/authenticationAPIClient';
/**
 * Performs code exchange according to Proof Key for Code Exchange (PKCE) spec.
 */
export declare class PKCE {
    private static readonly TAG;
    private readonly apiClient;
    private readonly codeVerifier;
    private readonly redirectUri;
    private readonly codeChallenge;
    /**
     * Creates a new instance of this class with the given AuthenticationAPIClient.
     * The instance should be disposed after a call to getToken().
     *
     * @param apiClient   to get the OAuth Token.
     * @param redirectUri going to be used in the OAuth code request.
     * @throws IllegalStateException when either 'US-ASCII` encoding or 'SHA-256' algorithm is not available.
     * @see #isAvailable()
     */
    constructor(apiClient: AuthenticationAPIClient, redirectUri: string, algorithmHelper?: AlgorithmHelper);
    /**
     * Returns the Code Challenge generated using a Code Verifier.
     *
     * @return the Code Challenge for this session.
     */
    getCodeChallenge(): string;
    /**
     * Performs a request to the Auth0 API to get the OAuth Token and end the PKCE flow.
     * The instance of this class must be disposed after this method is called.
     *
     * @param authorizationCode received in the call to /authorize with a "grant_type=code"
     * @param callback          to notify the result of this call to.
     */
    getToken(authorizationCode: string, callback: AuthCallback): void;
    /**
     * Checks if this device is capable of using the PKCE flow when performing calls to the
     * /authorize endpoint.
     *
     * @return if this device can use PKCE flow or not.
     */
    static isAvailable(algorithmHelper?: AlgorithmHelper): boolean;
}
