import * as application from 'tns-core-modules/application';

declare const A0WebAuth: any;

if (application.ios) {
    const delegate = require("./custom-app-delegate");

    const CustomAppDelegate = delegate.CustomAppDelegate;
    application.ios.delegate = CustomAppDelegate;

    CustomAppDelegate.apply("applicationOpenURLOptions", (event) => {
        return A0WebAuth.resumeAuthWithURL(event.args.url, event.args.options);
    });
}

application.start({ moduleName: "main-page" });
