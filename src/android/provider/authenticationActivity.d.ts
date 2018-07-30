import Activity = android.app.Activity;
import Context = android.content.Context;
import Intent = android.content.Intent;
import Uri = android.net.Uri;
import Bundle = android.os.Bundle;
import { CustomTabsOptions } from './customTabsOptions';
import { CustomTabsController } from './customTabsController';
export declare class AuthenticationActivity extends Activity {
    static readonly EXTRA_CONNECTION_NAME: string;
    static readonly EXTRA_AUTHORIZE_URI: string;
    static readonly EXTRA_INTENT_LAUNCHED: string;
    static readonly EXTRA_CT_OPTIONS: string;
    private intentLaunched;
    private customTabsController;
    constructor();
    static authenticateUsingBrowser(context: Context, authorizeUri: Uri, options?: CustomTabsOptions): void;
    onNewIntent(intent: Intent): void;
    onActivityResult(requestCode: number, resultCode: number, data: Intent): void;
    onSaveInstanceState(outState: Bundle): void;
    onCreate(savedInstanceState?: Bundle): void;
    onResume(): void;
    onDestroy(): void;
    private launchAuthenticationIntent();
    createCustomTabsController(context: Context): CustomTabsController;
    deliverSuccessfulAuthenticationResult(result: Intent): void;
}
