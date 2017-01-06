import { Common } from './auth0.common';

import * as util from "utils/utils";
import * as frameModule from "ui/frame";
import * as application from "application";

declare var global: any;

var localResolve;

export class Auth0Lock{
    private _clientId: string;
    private _domain: string;
    public _lock: any;
    public _callback: AuthenticationCallbackImpl; 

    constructor(clientId: string, domain: string){
        this._clientId = clientId;
        this._domain = domain;
    }

    public show() : Promise<any>{
        return new Promise((resolve, reject) =>  {
            try
            {
                localResolve = resolve;

                this._callback = new AuthenticationCallbackImpl();
                var auth0 = new com.auth0.android.Auth0(this._clientId, this._domain);
                var builder = com.auth0.android.lock.Lock.newBuilder(auth0, this._callback); 
                
                var activity = frameModule.topmost().android.activity;

                this._lock = builder.build(activity);


                var context = util.ad.getApplicationContext();
                var lockIntent = this._lock.newIntent(activity);
                
                if (lockIntent.resolveActivity(context.getPackageManager()) != null) {
                    application.android.foregroundActivity.startActivity(lockIntent);	
                }
            }
            catch(args){
                reject(args);
            }
        });
    }
}


export class AuthenticationCallbackImpl extends com.auth0.android.lock.AuthenticationCallback {
    constructor(){
        super();
        return global.__native(this);
    }

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
        console.log("Exception occurred!!! " + error)
    }
}