export interface Options{
  domain: string,
  clientId: string,
  scope?: Array<string>
}

export interface Credentials {
    accessToken: string;
    idToken: string;
    refreshToken: string;
}

export class Auth0Lock{
    public static readonly _tokenKey: string

    constructor(options: Options)
    public show(): Promise<any>;

    public refresh(): void;
    public hasValidToken(): boolean;
    public isTokenExpired(): boolean;
    public clearTokens(): void;

    public getUserInfo(): Promise<any>;
    public getTokenInfo(): Promise<any>;

    public credientials: Credentials;
}
