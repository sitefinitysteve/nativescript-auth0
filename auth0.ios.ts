import common = require("./auth0.common");

import * as appSettings from "application-settings";
import * as frameModule from "ui/frame";
import * as util from "utils/utils";
import * as application from "application";

declare var A0Lock;

export class Auth0Lock extends common.Auth0Lock{
    constructor(options: common.Options){
        super(options);
    }

    public show() : Promise<any>{
        return new Promise((resolve, reject) =>  {
            var page = frameModule.topmost().ios.controller;

            var lock = new A0Lock();
            var controller = lock.newLockViewController();
				controller.onAuthenticationBlock = function(profile, token){
					page.dismissViewControllerAnimatedCompletion(true, null);

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
            }			
            page.presentViewControllerAnimatedCompletion(controller, true, null);
        });
    }
}
