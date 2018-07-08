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

declare const com: any;

const AuthCallback = com.auth0.android.provider.AuthCallback;
const WebAuthProvider = com.auth0.android.provider.WebAuthProvider;
const AuthenticationAPIClient = com.auth0.android.authentication.AuthenticationAPIClient;
const AuthenticationException = com.auth0.android.authentication.AuthenticationException;
const SharedPreferencesStorage = com.auth0.android.authentication.storage.SharedPreferencesStorage;
const CredentialsManager = com.auth0.android.authentication.storage.CredentialsManager;
const A0Credentials = com.auth0.android.result.Credentials;

type AuthenticationException = any;
type A0Credentials = any;

export class Auth0 extends Auth0Common {

    private account: any;
    private authenticationApi: any;
    private sharedPreferencesStorage: any;
    private credentialsManager: any;

    constructor(clientId: string, domain: string) {
        super(clientId, domain);

        this.account = new com.auth0.android.Auth0(clientId, domain);
        this.account.setOIDCConformant(true);

        this.authenticationApi = new AuthenticationAPIClient(this.account);
        this.sharedPreferencesStorage = new SharedPreferencesStorage(application.android.context);
        this.credentialsManager = new CredentialsManager(this.authenticationApi, this.sharedPreferencesStorage);
    }

    public webAuthentication(options: WebAuthOptions): Promise<Credentials> {
        const webAuth = WebAuthProvider.init(this.account);

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
            webAuth.withResponseType(options.responseType);
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
            webAuth.parameters(toHashMap(options.parameters));
        }

        return new Promise((resolve, reject) => {
            try {
                webAuth.start(application.android.context, new AuthCallback({
                    onFailure: function (dialogOrException: android.app.Dialog | AuthenticationException) {
                        if (dialogOrException instanceof android.app.Dialog) {
                            reject(new WebAuthException(dialogOrException.toString()));
                        } else {
                            reject(new WebAuthException(dialogOrException.description));
                        }
                    },
                    onSuccess: function (credentials: A0Credentials) {
                        resolve({
                            accessToken: credentials.getAccessToken(),
                            idToken: credentials.getIdToken(),
                            refreshToken: credentials.getRefreshToken(),
                            type: credentials.getType(),
                            expiresIn: credentials.getExpiresIn(),
                            scope: credentials.getScope(),
                            expiresAt: credentials.getExpiresAt()
                        });
                    }
                }));
            } catch (e) {
                reject(e);
            }
        });
    }
}

/*** HELPERS ***/
function toHashMap(obj: any) {
    let node = new java.util.HashMap();
    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (obj[property] != null) {
                switch (typeof obj[property]) {
                    case 'object':
                        node.put(property, toHashMap(obj[property]));
                        break;
                    case 'boolean':
                        node.put(property, java.lang.Boolean.valueOf(String(obj[property])));
                        break;
                    case 'number':
                        if (Number(obj[property]) === obj[property] && obj[property] % 1 === 0)
                            node.put(property, java.lang.Long.valueOf(String(obj[property])));
                        else
                            node.put(property, java.lang.Double.valueOf(String(obj[property])));
                        break;
                    case 'string':
                        node.put(property, String(obj[property]));
                        break;
                }
            }
        }
    }
    return node;
}

function toJsObject(javaObj: any) {
    let node = {};
    let iterator = javaObj.entrySet().iterator();
    while (iterator.hasNext()) {
        let item = iterator.next();
        switch (item.getClass().getName()) {
            case 'java.util.HashMap':
                node[item.getKey()] = toJsObject(item.getValue());
                break;
            case 'java.lang.String':
                node[item.getKey()] = String(item.getValue());
                break;
            case 'java.lang.Boolean':
                node[item.getKey()] = Boolean(String(item.getValue()));
                break;
            case 'java.lang.Long':
            case 'java.lang.Double':
                node[item.getKey()] = Number(String(item.getValue()));
                break;
        }
        node[item.getKey()] = item.getValue();
    }
    return node;
}

