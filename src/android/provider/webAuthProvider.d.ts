import Activity = android.app.Activity;
import Intent = android.content.Intent;
import PackageManager = android.content.pm.PackageManager;
import { OAuthManager } from './oauthManager';
import { ResponseType } from './responseType';
import { Auth0 } from '../auth0';
import { PKCE } from './pkce';
import { CustomTabsOptions } from './customTabsOptions';
import { AuthCallback } from './authCallback';
/**
 * OAuth2 Web Authentication Provider.
 * It can use an external browser by sending the {@link android.content.Intent#ACTION_VIEW} intent or also the {@link WebAuthActivity}.
 * This behaviour is changed using {@link WebAuthProvider.Builder#useBrowser(boolean)}, and defaults to use browser.
 */
export declare class WebAuthProvider {
    private static readonly TAG;
    private static readonly KEY_AUDIENCE;
    private static readonly KEY_SCOPE;
    private static readonly KEY_CONNECTION_SCOPE;
    private static readonly SCOPE_TYPE_OPENID;
    private static readonly RESPONSE_TYPE_TOKEN;
    private static managerInstance;
    private readonly account;
    private readonly values;
    private pkce;
    private scheme;
    private ctOptions;
    /**
     * Initialize the WebAuthProvider instance with an account. Additional settings can be configured,
     * like setting the connection name or authentication parameters.
     *
     * @param account to use for authentication
     * @return a new WebAuthProvider instance to customize.
     */
    constructor(account: Auth0);
    /**
     * Use a custom state in the requests
     *
     * @param state to use in the requests
     * @return the current builder instance
     */
    withState(state: string): WebAuthProvider;
    /**
     * Specify a custom nonce value to avoid replay attacks. It will be sent in the auth request that will be returned back as a claim in the id_token
     *
     * @param nonce to use in the requests
     * @return the current builder instance
     */
    withNonce(nonce: string): WebAuthProvider;
    /**
     * Use a custom audience in the requests
     *
     * @param audience to use in the requests
     * @return the current builder instance
     */
    withAudience(audience: string): WebAuthProvider;
    /**
     * Specify a custom Scheme to use on the Callback Uri. Default scheme is 'https'.
     *
     * @param scheme to use in the Callback Uri.
     * @return the current builder instance
     */
    withScheme(scheme: string): WebAuthProvider;
    /**
     * Give a scope for this request.
     *
     * @param scope to request.
     * @return the current builder instance
     */
    withScope(scope: string): WebAuthProvider;
    /**
     * Give a connection scope for this request.
     *
     * @param connectionScope to request.
     * @return the current builder instance
     */
    withConnectionScope(...connectionScope: string[]): WebAuthProvider;
    /**
     * Choose the grant type for this request.
     *
     * @param type the ResponseType to request to the Authentication API. Multiple ResponseType's can be defined using a pipe. "CODE | TOKEN"
     * @return the current builder instance
     */
    withResponseType(type: ResponseType): WebAuthProvider;
    /**
     * Use extra parameters on the request.
     *
     * @param parameters to add
     * @return the current builder instance
     */
    withParameters(parameters: {
        [key: string]: string;
    }): WebAuthProvider;
    /**
     * Use the given connection. By default no connection is specified, so the login page will be displayed.
     *
     * @param connectionName to use
     * @return the current builder instance
     */
    withConnection(connectionName: string): WebAuthProvider;
    /**
     * When using a Custom Tabs compatible Browser, apply this customization options.
     *
     * @param options the Custom Tabs customization options
     * @return the current builder instance
     */
    withCustomTabsOptions(options: CustomTabsOptions): WebAuthProvider;
    withPKCE(pkce: PKCE): WebAuthProvider;
    static hasBrowserAppInstalled(packageManager: PackageManager): boolean;
    /**
     * Request user Authentication. The result will be received in the callback.
     *
     * @param activity context to run the authentication
     * @param callback to receive the parsed results
     */
    start(activity: Activity, callback: AuthCallback): void;
    /**
     * Finishes the authentication flow by passing the data received in the activity's onNewIntent() callback.
     * The final authentication result will be delivered to the callback specified when calling start().
     * <p>
     * This is no longer required to be called, the authentication is handled internally as long as you've correctly setup the intent-filter.
     *
     * @param intent the data received on the onNewIntent() call
     * @return true if a result was expected and has a valid format, or false if not.
     */
    static resume(intent: Intent): boolean;
    static getInstance(): OAuthManager;
    clearSession(federated: boolean, callback: (success: boolean) => void): void;
}
