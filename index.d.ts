export declare class Auth0Lock{
    constructor(clientId: string, domain: string)
    public initalize(): void;
    public show(): Promise<any>;
    public isTokenExpired(): boolean;
}


export interface Credentials{
    getAccessToken(): string;
    getIdToken(): string;
    getRefreshToken(): string;
    getType(): string;
}