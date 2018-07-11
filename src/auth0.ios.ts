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
        console.log('start');
        const webAuth = A0WebAuth.alloc().initWithClientIdUrl(
            this.clientId,
            NSURL.alloc().initWithString(this.domain)
        );
        const keys = [], values = [];

        console.log('params');
        if (options.audience != null) {
            keys.push('audience');
            values.push(options.audience);
        }
        if (options.connection != null) {
            keys.push('connection');
            values.push(options.connection);
        }
        /** Not supported by iOS at this time */
        /*if (options.nonce != null) {
            keys.push('nonce');
            values.push(options.nonce);
        }*/
        /** Not supported by iOS as this time */
        /*if (options.responseType != null) {
            keys.push('responseType');
            values.push(options.responseType);
        }*/
        /** Not supported by iOS as this time */
        /*if (options.scheme != null) {
            keys.push('scheme');
            values.push(options.scheme);
        }*/
        if (options.scope != null) {
            keys.push('scope');
            values.push(options.scope);
        }
        if (options.state != null) {
            keys.push('state');
            values.push(options.state);
        }
        if (options.parameters != null) {
            for (const key in options.parameters) {
                keys.push(key);
                values.push(options.parameters[key]);
            }
        }

        const parameters: NSDictionary<string, string> = new (NSDictionary as any)(values, keys);
        webAuth.addParameters(parameters);

        console.log('ready');
        return new Promise((resolve, reject) => {
            try {
                webAuth.start((error: NSError | null, credentials: any | null) => {
                    console.log('finish');
                    if (error != null) {
                        reject(new WebAuthException(error.description));
                    } else {
                        // iOS library has the wrong name, and also doesn't explicitly provide real expiresIn
                        const expiresAt = credentials.expiresIn;
                        resolve({
                            accessToken: credentials.accessToken,
                            idToken: credentials.idToken,
                            refreshToken: credentials.refreshToken,
                            type: credentials.tokenType,
                            expiresIn: (expiresAt != null) ? Number(expiresAt.timeIntervalSinceNow) : null,
                            scope: credentials.scope,
                            expiresAt: (expiresAt != null) ? new Date(expiresAt) : null
                        });
                    }
                });
            } catch (e) {
                console.log('fail');
                reject(e);
            }
        });
    }
}