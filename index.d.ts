
export class Auth0Lock{
    constructor(clientId: string, domain: string)
    public show(): Promise<any>;
    public isTokenExpired(): boolean;

    public credientials: Credentials;
}

export interface Credentials{
    accessToken: string;
    idToken: string;
    refreshToken: string;
}