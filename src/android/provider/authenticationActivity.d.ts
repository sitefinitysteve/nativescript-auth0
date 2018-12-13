import Context = android.content.Context;
import Activity = android.app.Activity;
import Intent = android.content.Intent;
import Uri = android.net.Uri;
import Bundle = android.os.Bundle;
import { CustomTabsOptions } from './customTabsOptions';
import { CustomTabsController } from './customTabsController';
export declare const EXTRA_CONNECTION_NAME: string;
export declare const EXTRA_AUTHORIZE_URI: string;
export declare const EXTRA_INTENT_LAUNCHED: string;
export declare const EXTRA_CT_OPTIONS: string;
export declare const EXTRA_USE_BROWSER: string;
export declare const EXTRA_USE_FULL_SCREEN: string;
export declare const EXTRA_PAGE_PARAMS: string;
export declare const EXTRA_BACK_URI: string;
export declare function authenticateUsingBrowser(context: Context, authorizeUri: Uri, options?: CustomTabsOptions): void;
export declare function authenticateUsingWebView(activity: Activity, authorizeUri: Uri, requestCode: number, connection: string, useFullScreen: boolean, hostedPageParams: {
    [key: string]: string;
}, backUri: string): void;
export declare class AuthenticationActivity extends android.app.Activity {
    private intentLaunched;
    private customTabsController;
    constructor();
    onNewIntent(intent: Intent): void;
    onActivityResult(requestCode: number, resultCode: number, data: Intent): void;
    onSaveInstanceState(outState: Bundle): void;
    onCreate(savedInstanceState?: Bundle): void;
    onResume(): void;
    onDestroy(): void;
    private launchAuthenticationIntent;
    createCustomTabsController(context: Context): CustomTabsController;
    deliverSuccessfulAuthenticationResult(requestCode: number, resultCode: number, result: Intent): void;
}
