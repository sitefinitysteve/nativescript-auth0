
export interface WebAuthOptions {
    audience?: string;
    connection?: string;
    nonce?: string;
    responseType?: ResponseType;
    scheme?: string;
    scope?: string;
    state?: string;
    parameters?: { [param: string]: string; };
}

export interface Credentials {
    readonly accessToken?: string;
    readonly idToken?: string;
    readonly refreshToken?: string;
    readonly type?: string;
    readonly expiresIn?: number;
    readonly scope?: string;
    readonly expiresAt?: Date;
}

export class WebAuthException extends Error {
    constructor(message);
}

export class Auth0 {
    constructor(clientId: string, domain: string);

    public webAuthentication(options: WebAuthOptions): Promise<Credentials>
}