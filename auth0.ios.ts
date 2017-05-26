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

            let lock: Lock = Lock.classic();

            //Add scope
            if(this.options.scope){
                var scopeItems = this.options.scope.join(" ");
                console.log("Adding scope of " + scopeItems);

                //Pending update from telerik\progress
                //lockClassicScreen.authenticationParameters.scopes = this.options.scope;
            }

            lock.onAuthWithCallback((credientials: A0Credentials) => {
                console.log("Authentication Success");

                let creds: common.Credentials = {
                    accessToken: credientials.accessToken,
                    idToken: credientials.idToken,
                    refreshToken: credientials.refreshToken,
                };

                appSettings.setString(common.Auth0Lock._tokenKey, JSON.stringify(creds));
                this.refresh(); //hydrate the local object, sounds fancy

                resolve({
                    credentials: credientials
                });
            });

            lock.presentFrom(page);
            console.log("PRESENT");
        });
    }
}
