export interface Options {
    domain: string;
    clientId: string;
    scope?: Array<string>;
}
export interface Credentials {
    accessToken: string;
    idToken: string;
    refreshToken: string;
}
export declare class Auth0Lock {
    static readonly _tokenKey: string;
    static readonly _nullCredsMessage: string;
    protected options: Options;
    credientials: Credentials;
    constructor(options: Options);
    refresh(): void;
    getUserInfo(): Promise<any>;
    getTokenInfo(): Promise<any>;
    hasValidToken(): Boolean;
    isTokenExpired(): boolean;
    clearTokens(): void;
}
