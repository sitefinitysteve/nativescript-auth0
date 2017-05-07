/// <reference path="./Lock.ios.d.ts" />


import common = require("./auth0.common");

import * as appSettings from "application-settings";
import * as frameModule from "ui/frame";
import * as util from "utils/utils";
import * as application from "application";

declare var Lock;

export class Auth0Lock extends common.Auth0Lock{
    constructor(options: common.Options){
        super(options);
    }

    public show() : Promise<any>{
        return new Promise((resolve, reject) =>  {
            var page = frameModule.topmost().ios.controller;

            let lockClassicScreen: Lock = Lock.classic();

            //Add scope
            if(this.options.scope){
                var scopeItems = this.options.scope.join(" ");
                console.log("Adding scope of " + scopeItems);

                lockClassicScreen.authenticationParameters.scopes = this.options.scope;
            }

            lockClassicScreen.onAuthenticationBlock = function(profile: A0UserProfile, token: A0Token){
                    
                console.log("Authentication Success");

                let creds: common.Credentials = {
                    accessToken: token.accessToken,
                    idToken: token.idToken,
                    refreshToken: token.refreshToken,
                };

                appSettings.setString(common.Auth0Lock._tokenKey, JSON.stringify(creds));

                resolve({
                    credentials: creds,
                    ios: {
                        profile: profile,
                        token: token
                    }
                });
            };

            lockClassicScreen.presnet(page);
            console.log("PRESENT");
        });
    }
}
