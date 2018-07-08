import * as application from 'tns-core-modules/application';

import {
    Auth0Common,
    Credentials,
    ResponseType,
    WebAuthException,
    WebAuthOptions
} from './auth0-common';

export {
    Credentials,
    ResponseType,
    WebAuthException,
    WebAuthOptions
};

export class Auth0 extends Auth0Common {
    constructor(clientId: string, domain: string) {
        super(clientId, domain);
    }

    public webAuthentication(options: WebAuthOptions): Promise<Credentials> {
        return null;
    }
}