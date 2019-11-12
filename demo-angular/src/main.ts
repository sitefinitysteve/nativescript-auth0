// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";
import { ios }  from '@nativescript/core/application';

if (ios) {
    const Auth0 = require("nativescript-auth0");
    const delegate = require("./app/auth0/custom-app-delegate");

    const CustomAppDelegate = delegate.CustomAppDelegate;
    ios.delegate = CustomAppDelegate;

    CustomAppDelegate.apply('applicationOpenURLOptions', (event) => {
        return Auth0.resumeAuth(event.args.url, event.args.options);
    });
}

platformNativeScriptDynamic().bootstrapModule(AppModule);
