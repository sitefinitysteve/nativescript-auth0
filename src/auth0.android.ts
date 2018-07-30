import * as application from 'tns-core-modules/application/application';

import {
    Auth0Common,
    Credentials,
    ResponseType,
    WebAuthException,
    WebAuthOptions
} from './auth0-common';
import { AuthenticationAPIClient } from './android/authentication/authenticationAPIClient';
import { WebAuthProvider } from './android/provider/webAuthProvider';
import { AuthenticationException } from './android/authentication/authenticationException';
import { Auth0 as Auth0Android } from './android/auth0';
import { Credentials as AndroidCredentials } from './common/credentials';

export {
    Credentials,
    ResponseType,
    WebAuthException,
    WebAuthOptions
};

export class Auth0 extends Auth0Common {

    private account: Auth0Android;
    private authenticationApi: AuthenticationAPIClient;
    // private sharedPreferencesStorage: SharedPreferencesStorage;
    // private credentialsManager: CredentialsManager;

    constructor(clientId: string, domain: string) {
        super(clientId, domain);

        this.account = new Auth0Android(clientId, domain);

        this.authenticationApi = new AuthenticationAPIClient(this.account);
        // this.sharedPreferencesStorage = new SharedPreferencesStorage(application.android.context);
        // this.credentialsManager = new CredentialsManager(this.authenticationApi, this.sharedPreferencesStorage);
    }

    public webAuthentication(options: WebAuthOptions): Promise<Credentials> {
        const webAuth = new WebAuthProvider(this.account);

        if (options.audience != null) {
            webAuth.withAudience(options.audience);
        }
        if (options.connection != null) {
            webAuth.withConnection(options.connection);
        }
        if (options.nonce != null) {
            webAuth.withNonce(options.nonce);
        }
        if (options.responseType != null) {
            webAuth.withResponseType(options.responseType as number);
        }
        if (options.scheme != null) {
            webAuth.withScheme(options.scheme);
        }
        if (options.scope != null) {
            webAuth.withScope(options.scope);
        }
        if (options.state != null) {
            webAuth.withState(options.state);
        }
        if (options.parameters != null) {
            webAuth.withParameters(options.parameters);
        }

        return new Promise((resolve, reject) => {
            try {
                webAuth.start(application.android.foregroundActivity, {
                    onFailure: (dialogOrException: android.app.Dialog | AuthenticationException) => {
                        console.log('failed');
                        if (dialogOrException instanceof android.app.Dialog) {
                            reject(new WebAuthException(dialogOrException.toString()));
                        } else {
                            reject(new WebAuthException(dialogOrException.getDescription()));
                        }
                    },
                    onSuccess: function (credentials: AndroidCredentials) {
                        const expiresIn = credentials.expiresIn;
                        const expiresAt = credentials.expiresAt;
                        resolve({
                            accessToken: credentials.accessToken,
                            idToken: credentials.idToken,
                            refreshToken: credentials.refreshToken,
                            type: credentials.tokenType,
                            expiresIn: (expiresIn != null) ? Number(expiresIn) : null,
                            scope: credentials.scope,
                            expiresAt: (expiresAt != null) ? new Date(expiresAt) : null
                        });
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}
