import * as application from 'tns-core-modules/application';

if (application.ios) {
    const delegate = require('./custom-app-delegate');
    const Auth0 = require('nativescript-auth0');

    const CustomAppDelegate = delegate.CustomAppDelegate;
    application.ios.delegate = CustomAppDelegate;

    CustomAppDelegate.apply('applicationOpenURLOptions', (event) => {
        return Auth0.resumeAuth(event.args.url, event.args.options);
    });
}

application.run({ moduleName: 'main-page' });
