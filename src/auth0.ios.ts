import * as application from 'tns-core-modules/application/application';

import {
    Auth0Common,
    Credentials,
    ResponseType,
    WebAuthException,
    WebAuthOptions
} from './auth0-common';
import { SafariWebAuth } from './ios/safariWebAuth';
import { ResponseType as iOSResponseType } from './ios/responseType';
import { a0_url } from './ios/utils';

export {
    Credentials,
    ResponseType,
    WebAuthException,
    WebAuthOptions
};

export { resumeAuth } from './ios/webAuth';

export class Auth0 extends Auth0Common {
    constructor(clientId: string, domain: string) {
        super(clientId, domain);
    }

    public webAuthentication(options: WebAuthOptions): Promise<Credentials> {
        console.log('start');
        const auth = SafariWebAuth.init(this.clientId, a0_url(this.domain));

        console.log('params');
        if (options.audience != null) {
            auth.setAudience(options.audience);
        }
        if (options.connection != null) {
            auth.setConnection(options.connection);
        }
        if (options.nonce != null) {
            auth.setNonce(options.nonce);
        }
        if (options.responseType != null) {
            switch (options.responseType) {
                case ResponseType.CODE:
                    auth.setResponseType([iOSResponseType.code]);
                    break;
                case ResponseType.TOKEN:
                    auth.setResponseType([iOSResponseType.token]);
                    break;
                case ResponseType.ID_TOKEN:
                    auth.setResponseType([iOSResponseType.idToken]);
                    break;
            }
        }
        /**
         * Not supported by iOS at this time
         */
        /*if (options.scheme != null) {
            auth.setScheme(options.scheme);
        }*/
        if (options.scope != null) {
            auth.setScope(options.scope);
        }
        if (options.state != null) {
            auth.setState(options.state);
        }
        if (options.parameters != null) {
            auth.setParameters(options.parameters);
        }

        console.log('ready');
        return new Promise((resolve, reject) => {
            try {
                auth.start((result) => {
                    console.log('finish');
                    if (result.failure != null) {
                        reject(new WebAuthException(result.failure.message));
                    } else {
                        const credentials = result.success;
                        resolve({
                            accessToken: credentials.accessToken,
                            idToken: credentials.idToken,
                            refreshToken: credentials.refreshToken,
                            type: credentials.tokenType,
                            expiresIn: credentials.expiresIn,
                            scope: credentials.scope,
                            expiresAt: credentials.expiresAt
                        });
                    }
                });
            } catch (e) {
                console.log('fail', e);
                reject(e);
            }
        });
    }
}