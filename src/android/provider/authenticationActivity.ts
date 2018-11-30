
import Context = android.content.Context;
import Activity = android.app.Activity;
import Intent = android.content.Intent;
import Uri = android.net.Uri;
import Bundle = android.os.Bundle;
import Log = android.util.Log;

import { CustomTabsOptions } from './customTabsOptions';
import { WebAuthProvider } from './webAuthProvider';
import { CustomTabsController } from './customTabsController';
import { WebAuthActivity, FULLSCREEN_EXTRA, CONNECTION_NAME_EXTRA } from './webAuthActivity';

const TAG: string = 'AuthenticationActivity';

export const EXTRA_CONNECTION_NAME: string = "org.nativescript.auth0.EXTRA_CONNECTION_NAME";
export const EXTRA_AUTHORIZE_URI: string = "org.nativescript.auth0.EXTRA_AUTHORIZE_URI";
export const EXTRA_INTENT_LAUNCHED: string = "org.nativescript.auth0.EXTRA_INTENT_LAUNCHED";
export const EXTRA_CT_OPTIONS: string = "org.nativescript.auth0.EXTRA_CT_OPTIONS";
export const EXTRA_USE_BROWSER: string = "org.nativescript.auth0.EXTRA_USE_BROWSER";
export const EXTRA_USE_FULL_SCREEN: string = "org.nativescript.auth0.EXTRA_USE_FULL_SCREEN";
export const EXTRA_PAGE_PARAMS: string = "org.nativescript.auth0.page_params";

export function authenticateUsingBrowser(context: Context, authorizeUri: Uri, options: CustomTabsOptions = undefined): void {
    Log.d(TAG, 'Building intent');
    const clazz = AuthenticationActivity.class;
    Log.d(TAG, 'Got class');
    const intent = new Intent(context, clazz);
    Log.d(TAG, 'Init intent');
    intent.putExtra(EXTRA_AUTHORIZE_URI, authorizeUri);
    Log.d(TAG, 'Put extra 1');
    intent.putExtra(EXTRA_CT_OPTIONS, options);
    Log.d(TAG, 'Put extra 2');
    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
    Log.d(TAG, 'Starting authentication..');
    context.startActivity(intent);
}

export function authenticateUsingWebView(activity: Activity, authorizeUri: Uri, requestCode: number, connection: string, useFullScreen: boolean = true, hostedPageParams: { [key: string]: string }): void {
    Log.d(TAG, 'Building activity');
    const clazz = AuthenticationActivity.class;
    Log.d(TAG, 'Got class');
    const intent = new Intent(activity, clazz);
    Log.d(TAG, 'Init intent');
    intent.putExtra(EXTRA_AUTHORIZE_URI, authorizeUri);
    Log.d(TAG, 'Put extra 1');
    intent.putExtra(EXTRA_USE_BROWSER, false);
    Log.d(TAG, 'Put extra 2');
    intent.putExtra(EXTRA_USE_FULL_SCREEN, useFullScreen);
    Log.d(TAG, 'Put extra 3');
    intent.putExtra(EXTRA_CONNECTION_NAME, connection);

    intent.putExtra(EXTRA_PAGE_PARAMS, JSON.stringify(hostedPageParams));

    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
    Log.d(TAG, 'Starting authentication...');
    activity.startActivity(intent);
}
@JavaProxy('org.nativescript.auth0.AuthenticationActivity')
export class AuthenticationActivity extends android.app.Activity {
    private intentLaunched: boolean;
    private customTabsController: CustomTabsController;

    constructor() {
        super();
        return global.__native(this);
    }

    public onNewIntent(intent: Intent): void {
        if (WebAuthProvider.resumes(intent)) {
            return;
        }
        super.onNewIntent(intent);
        this.setIntent(intent);
    }

    public onActivityResult(requestCode: number, resultCode: number, data: Intent): void {
        if (resultCode === android.app.Activity.RESULT_OK) {
            this.deliverSuccessfulAuthenticationResult(requestCode, resultCode, data);
        }
        this.finish();
    }

    public onSaveInstanceState(outState: Bundle): void {
        super.onSaveInstanceState(outState);
        outState.putBoolean(EXTRA_INTENT_LAUNCHED, this.intentLaunched);
    }

    public onCreate(savedInstanceState?: Bundle): void {
        super.onCreate(savedInstanceState);
        if (savedInstanceState != null) {
            this.intentLaunched = savedInstanceState.getBoolean(EXTRA_INTENT_LAUNCHED, false);
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
            this.deliverSuccessfulAuthenticationResult(0, 0, this.getIntent());
        }
        this.setResult(android.app.Activity.RESULT_CANCELED);
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
        const authorizeUri = extras.getParcelable(EXTRA_AUTHORIZE_URI) as Uri;

        let intent: Intent = new Intent(this, WebAuthActivity.class);
        intent.setData(authorizeUri);
        intent.putExtra(CONNECTION_NAME_EXTRA, 'Login');
        intent.putExtra(FULLSCREEN_EXTRA, false);
        intent.putExtra(EXTRA_PAGE_PARAMS, extras.getString(EXTRA_PAGE_PARAMS));

        //The request code value can be ignored
        this.startActivityForResult(intent, 33);

        // this.customTabsController = this.createCustomTabsController(this);
        // this.customTabsController.setCustomizationOptions(extras.getParcelable(EXTRA_CT_OPTIONS) as CustomTabsOptions);
        // this.customTabsController.bindService();
        // this.customTabsController.launchUri(authorizeUri);
    }

    public createCustomTabsController(context: Context): CustomTabsController {
        return new CustomTabsController(context);
    }

    public deliverSuccessfulAuthenticationResult(requestCode: number, resultCode: number, result: Intent): void {
        WebAuthProvider.resume(requestCode, resultCode, result);
    }
}
