import Activity = android.app.Activity;
import Intent = android.content.Intent;
import PackageManager = android.content.pm.PackageManager;
import { OAuthManager } from './oauthManager';
import { ResponseType } from './responseType';
import { Auth0 } from '../auth0';
import { PKCE } from './pkce';
import { CustomTabsOptions } from './customTabsOptions';
import { AuthCallback } from './authCallback';
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
    private useBrowser;
    private pkce;
    private scheme;
    private ctOptions;
    private hostedPageParams;
    constructor(account: Auth0);
    withState(state: string): WebAuthProvider;
    withBrowser(withBrowser: boolean): WebAuthProvider;
    withNonce(nonce: string): WebAuthProvider;
    withAudience(audience: string): WebAuthProvider;
    withScheme(scheme: string): WebAuthProvider;
    withScope(scope: string): WebAuthProvider;
    withConnectionScope(...connectionScope: string[]): WebAuthProvider;
    withResponseType(type: ResponseType): WebAuthProvider;
    withParameters(parameters: {
        [key: string]: string;
    }): WebAuthProvider;
    withHostedPageParams(parameters: {
        [key: string]: string;
    }): WebAuthProvider;
    withConnection(connectionName: string): WebAuthProvider;
    withCustomTabsOptions(options: CustomTabsOptions): WebAuthProvider;
    withPKCE(pkce: PKCE): WebAuthProvider;
    static hasBrowserAppInstalled(packageManager: PackageManager): boolean;
    start(activity: Activity, callback: AuthCallback, requestCode: number): void;
    static resume(requestCode: number, resultCode: number, intent: Intent): boolean;
    static resumes(intent: Intent): boolean;
    static getInstance(): OAuthManager;
}
