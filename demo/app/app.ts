/// <reference path="../node_modules/nativescript-auth0/typings/Auth0.ios.d.ts" />
/// <reference path="../node_modules/nativescript-auth0/typings/Lock.ios.d.ts" />

import * as application from "application";
import { CustomAppDelegate } from "./custom-app-delegate";

if(application.ios){
    application.ios.delegate = CustomAppDelegate;

    CustomAppDelegate.apply("applicationOpenURLOptions", (event) => {
        return Lock.resumeAuthOptions(event.args.url, event.args.options);
    });

    CustomAppDelegate.apply("applicationContinueUserActivityRestorationHandler", (event) => {
        return Lock.continueAuthUsing(event.userActivity)
    });
}

application.start(
    { 
        moduleName: "login" 
    }
);
