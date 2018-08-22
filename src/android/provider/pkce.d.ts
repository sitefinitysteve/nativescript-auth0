import { AuthCallback } from './authCallback';
import { AlgorithmHelper } from './algorithmHelper';
import { AuthenticationAPIClient } from '../authentication/authenticationAPIClient';
export declare class PKCE {
    private static readonly TAG;
    private readonly apiClient;
    private readonly codeVerifier;
    private readonly redirectUri;
    private readonly codeChallenge;
    constructor(apiClient: AuthenticationAPIClient, redirectUri: string, algorithmHelper?: AlgorithmHelper);
    getCodeChallenge(): string;
    getToken(authorizationCode: string, callback: AuthCallback): void;
    static isAvailable(algorithmHelper?: AlgorithmHelper): boolean;
}
