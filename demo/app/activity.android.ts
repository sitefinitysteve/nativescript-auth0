import * as frame from "ui/frame";
var application = require("application");

@JavaProxy("org.myApp.MainActivity")
class Activity extends android.app.Activity {
    private _callbacks: frame.AndroidActivityCallbacks;
    public _lock: com.auth0.android.lock.Lock;
    public _callback: AuthenticationCallbackImpl;

    protected onCreate(savedInstanceState: android.os.Bundle): void {
        
        if (!this._callbacks) {
            (<any>frame).setActivityCallbacks(this); //hack around the private issue https://github.com/NativeScript/NativeScript/issues/2526
        }
        this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
        
        
        this._callback = new AuthenticationCallbackImpl();
        var auth0 = new com.auth0.android.Auth0('q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp','nativescript.auth0.com');
        /*
        console.log("** auth0 **");
        console.dump(auth0);

        console.log("** this._callback **");
        console.dump(this._callback);
        console.dump(this._callback.getClass());
        */
        var builder = com.auth0.android.lock.Lock.newBuilder(auth0, this._callback); //Crashing happens here
        this._lock = builder.build(this);

        global.auth0 = this;
    }

    protected onSaveInstanceState(outState: android.os.Bundle): void {
        this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
    }

    protected onStart(): void {
        this._callbacks.onStart(this, super.onStart);
    }

    protected onStop(): void {
        this._callbacks.onStop(this, super.onStop);
    }

    protected onDestroy(): void {
        this._callbacks.onDestroy(this, super.onDestroy);

        if(this._lock !== null){
            this._lock.onDestroy(this);
            this._lock = null;
        }
    }

    public onBackPressed(): void {
        this._callbacks.onBackPressed(this, super.onBackPressed);
    }

    public onRequestPermissionsResult(requestCode: number, permissions: Array<String>, grantResults: Array<number>): void {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
    }

    protected onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
    }

}

export class AuthenticationCallbackImpl extends com.auth0.android.lock.AuthenticationCallback {
    constructor(){
        super();
        return global.__native(this);
    }

    protected onAuthentication(credentials: any): void {
        console.log("onAuthentication!!!")
    }

    protected onCanceled(): void {
        console.log("Cancelled, user pressed back!!!")
    }

    protected onError(error: any): void {
        console.log("Exception occurred!!!")
    }
}
