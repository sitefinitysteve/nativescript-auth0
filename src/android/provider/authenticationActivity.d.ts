import Context = android.content.Context;
import Intent = android.content.Intent;
import Uri = android.net.Uri;
import Bundle = android.os.Bundle;
import { CustomTabsOptions } from './customTabsOptions';
import { CustomTabsController } from './customTabsController';
export declare const EXTRA_CONNECTION_NAME: string;
export declare const EXTRA_AUTHORIZE_URI: string;
export declare const EXTRA_INTENT_LAUNCHED: string;
export declare const EXTRA_CT_OPTIONS: string;
export declare function authenticateUsingBrowser(context: Context, authorizeUri: Uri, options?: CustomTabsOptions): void;
declare class AuthenticationActivity extends android.app.Activity {
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
    deliverAuthenticationResult(result: Intent): void;
}
export { AuthenticationActivity };
