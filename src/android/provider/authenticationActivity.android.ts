
import Activity = android.app.Activity;
import Context = android.content.Context;
import Intent = android.content.Intent;
import Uri = android.net.Uri;
import Bundle = android.os.Bundle;

import { CustomTabsOptions } from './customTabsOptions';
import { WebAuthProvider } from './webAuthProvider';
import { CustomTabsController } from './customTabsController';

@JavaProxy('org.nativescript.auth0.AuthenticationActivity')
export class AuthenticationActivity extends Activity {

    static readonly EXTRA_CONNECTION_NAME: string = "org.nativescript.auth0.EXTRA_CONNECTION_NAME";
    static readonly EXTRA_AUTHORIZE_URI: string = "org.nativescript.auth0.EXTRA_AUTHORIZE_URI";
    static readonly EXTRA_INTENT_LAUNCHED: string = "org.nativescript.auth0.EXTRA_INTENT_LAUNCHED";
    static readonly EXTRA_CT_OPTIONS: string = "org.nativescript.auth0.EXTRA_CT_OPTIONS";

    private intentLaunched: boolean;
    private customTabsController: CustomTabsController;

    constructor() {
        super();
        return global.__native(this);
    }

    static authenticateUsingBrowser(context: Context, authorizeUri: Uri, options: CustomTabsOptions = undefined): void {
        const intent = new Intent(context, AuthenticationActivity.class);
        intent.putExtra(AuthenticationActivity.EXTRA_AUTHORIZE_URI, authorizeUri);
        intent.putExtra(AuthenticationActivity.EXTRA_CT_OPTIONS, options);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        context.startActivity(intent);
    }

    public onNewIntent(intent: Intent): void {
        super.onNewIntent(intent);
        this.setIntent(intent);
    }

    public onActivityResult(requestCode: number, resultCode: number, data: Intent): void {
        if (resultCode === AuthenticationActivity.RESULT_OK) {
            this.deliverSuccessfulAuthenticationResult(data);
        }
        this.finish();
    }

    public onSaveInstanceState(outState: Bundle): void {
        super.onSaveInstanceState(outState);
        outState.putBoolean(AuthenticationActivity.EXTRA_INTENT_LAUNCHED, this.intentLaunched);
    }

    public onCreate(savedInstanceState?: Bundle): void {
        super.onCreate(savedInstanceState);
        if (savedInstanceState != null) {
            this.intentLaunched = savedInstanceState.getBoolean(AuthenticationActivity.EXTRA_INTENT_LAUNCHED, false);
        }
    }

    public onResume(): void {
        super.onResume();
        if (!this.intentLaunched && this.getIntent().getExtras() == null) {
            // Activity was launched in an unexpected way
            this.finish();
            return;
        } else if (!this.intentLaunched) {
            this.intentLaunched = true;
            this.launchAuthenticationIntent();
            return;
        }

        if (this.getIntent().getData() != null) {
            this.deliverSuccessfulAuthenticationResult(this.getIntent());
        }
        this.setResult(AuthenticationActivity.RESULT_CANCELED);
        this.finish();
    }

    public onDestroy(): void {
        super.onDestroy();
        if (this.customTabsController != null) {
            this.customTabsController.unbindService();
            this.customTabsController = null;
        }
    }

    private launchAuthenticationIntent(): void {
        const extras = this.getIntent().getExtras();
        const authorizeUri = extras.getParcelable(AuthenticationActivity.EXTRA_AUTHORIZE_URI) as Uri;

        this.customTabsController = this.createCustomTabsController(this);
        this.customTabsController.setCustomizationOptions(extras.getParcelable(AuthenticationActivity.EXTRA_CT_OPTIONS) as CustomTabsOptions);
        this.customTabsController.bindService();
        this.customTabsController.launchUri(authorizeUri);
    }

    public createCustomTabsController(context: Context): CustomTabsController {
        return new CustomTabsController(context);
    }

    public deliverSuccessfulAuthenticationResult(result: Intent): void {
        WebAuthProvider.resume(result);
    }
}
