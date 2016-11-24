export class AuthenticationCallbackImpl extends com.auth0.android.callback.AuthenticationCallback {
    protected onAuthentication(credentials: any): void {
        debugger;
        console.log("onAuthentication!!!")
    }

    protected onCanceled(): void {
        debugger;
        console.log("Cancelled, user pressed back!!!")
    }

    protected onError(error: any): void {
        debugger;
        console.log("Exception occurred!!!")
    }
}