/// <reference path="./typings/Auth0.ios.d.ts" />
/// <reference path="./typings/Lock.ios.d.ts" />



import common = require("./auth0.common");

import * as appSettings from "application-settings";
import * as frameModule from "ui/frame";
import * as util from "utils/utils";
import * as application from "application";

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

                //lockClassicScreen.authenticationParameters.scopes = this.options.scope;
            }

            lockClassicScreen.onAuthWithCallback((credientials: A0Credentials) => {
                debugger;
                console.log("Authentication Success");

                let creds: common.Credentials = {
                    accessToken: credientials.accessToken,
                    idToken: credientials.idToken,
                    refreshToken: credientials.refreshToken,
                };

                appSettings.setString(common.Auth0Lock._tokenKey, JSON.stringify(creds));

                resolve({
                    credentials: credientials
                });
            });

            lockClassicScreen.presentFrom(page);
            console.log("PRESENT");
        });
    }
}
