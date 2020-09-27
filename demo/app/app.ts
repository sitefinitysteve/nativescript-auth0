import { Application } from '@nativescript/core';

if (Application.ios) {
    const delegate = require('./custom-app-delegate');
    const Auth0 = require('nativescript-auth0');
    const CustomAppDelegate = delegate.CustomAppDelegate;
    Application.ios.delegate = CustomAppDelegate;

    CustomAppDelegate.apply('applicationOpenURLOptions', (event) => {
        return Auth0.resumeAuth(event.args.url, event.args.options);
    });
}

Application.run({ moduleName: 'main-page' });
