import { Observable } from 'tns-core-modules/data/observable/observable';
import * as app from 'tns-core-modules/application/application';
import * as dialogs from 'tns-core-modules/ui/dialogs/dialogs';

export enum ResponseType {
    CODE = 1,
    TOKEN = 2,
    ID_TOKEN = 4
}

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
    constructor(message) {
        super(message);
    }
}

export abstract class Auth0Common {

    constructor(
        protected clientId: string,
        protected domain: string
    ) {}

    public abstract webAuthentication(options: WebAuthOptions): Promise<Credentials>;
}
