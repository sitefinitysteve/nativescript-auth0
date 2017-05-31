import common = require("./auth0.common");
import * as util from "utils/utils";
import * as frameModule from "ui/frame";
import * as application from "application";
import * as appSettings from 'application-settings';

var localResolve;
var localReject;

export class Auth0Lock extends common.Auth0Lock{
    public _lock: any;
    public _callback: any; 

    constructor(options: common.Options){
        super(options);

        this._this = this;
    }

    public show() : Promise<any>{
        return new Promise((resolve, reject) =>  {
            try
            {
                localResolve = resolve;
                localReject = reject;

                this._callback = new AuthCallback();
                var auth0 = new com.auth0.android.Auth0(this.options.clientId, this.options.domain);
                var builder = com.auth0.android.lock.Lock.newBuilder(auth0, this._callback); 
                
                var activity = frameModule.topmost().android.activity;
                
                //Add scope
                if(this.options.scope){
                    var scopeItems = this.options.scope.join(" ");
                    console.log("Adding scope of " + scopeItems);

                    var paramBuilder = com.auth0.android.authentication.ParameterBuilder.newBuilder();
                    var authenticationParameters = paramBuilder.setScope(scopeItems).asDictionary();
                    builder.withAuthenticationParameters(authenticationParameters)
                }

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

var $this: Auth0Lock = this;
var AuthCallback = com.auth0.android.lock.AuthenticationCallback.extend({
  onAuthentication: function(credentials){
        console.log("Authentication Success");
        var accessToken = credentials.getAccessToken();
        var idToken = credentials.getIdToken();
        var refreshToken = credentials.getRefreshToken();

        let creds: common.Credentials = {
            accessToken: accessToken,
            idToken: idToken,
            refreshToken: refreshToken,
        };

        appSettings.setString(common.Auth0Lock._tokenKey, JSON.stringify(creds));
        $this.refresh(); //hydrate the local object, sounds fancy

        localResolve({
            credentials: creds,
            android: credentials
        });
  },
  onCanceled: function(){
    console.log("Cancelled, user pressed back!!!");
    localReject(new Error("Cancelled"));
  },
  onError: function(error){
    console.log("Exception occurred!!! " + error.getMessage());
    localReject(new Error(error.getMessage()));
  },
  onDestroy: function(){
    console.log("DESTROY");
  }
});
exports.AuthCallback = AuthCallback;
