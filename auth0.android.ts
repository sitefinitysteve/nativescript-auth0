import common = require("./auth0.common");
import * as util from "utils/utils";
import * as frameModule from "ui/frame";
import * as application from "application";

var localResolve;
var localReject;

export class Auth0Lock extends common.Auth0Lock{
    public _lock: any;
    public _callback: any; 

    constructor(clientId: string, domain: string){
        super(clientId, domain);
    }

    public show() : Promise<any>{
        return new Promise((resolve, reject) =>  {
            try
            {
                localResolve = resolve;
                localReject = reject;

                this._callback = new AuthCallback();
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

var AuthCallback = com.auth0.android.lock.AuthenticationCallback.extend({
  onAuthentication: function(credentials){
    console.log("Authentication Success");
    //Set the global data
    debugger;
    global.auth0.saveTokens(credentials.accessToken, credentials.refreshToken, credentials.idToken);
    localResolve(credentials);
  },
  onCanceled: function(){
    console.log("Cancelled, user pressed back!!!");
    localReject(new Error("Cancelled"));
  },
  onError: function(error){
    console.log("Exception occurred!!! " + error.getMessage());
    localReject(new Error(error.getMessage()));
  }
});
exports.AuthCallback = AuthCallback;
