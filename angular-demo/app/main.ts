import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
/// <reference path="../node_modules/nativescript-auth0/typings/Auth0.ios.d.ts" />
/// <reference path="../node_modules/nativescript-auth0/typings/Lock.ios.d.ts" />

import * as application from "application";

if (application.ios) {
  const delegate = require("./custom-app-delegate");

  const CustomAppDelegate = delegate.CustomAppDelegate;
  application.ios.delegate = CustomAppDelegate;

  CustomAppDelegate.apply("applicationOpenURLOptions", (event) => {
    return Lock.resumeAuthOptions(event.args.url, event.args.options);
  });

  CustomAppDelegate.apply("applicationContinueUserActivityRestorationHandler", (event) => {
    return Lock.continueAuthUsing(event.userActivity)
  });
}

platformNativeScriptDynamic().bootstrapModule(AppModule);
