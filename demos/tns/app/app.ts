import * as application from "application";

declare var Auth0;

if(application.ios){
    var delegate = require("./custom-app-delegate");
    
    var CustomAppDelegate = delegate.CustomAppDelegate;
    application.ios.delegate = CustomAppDelegate;

    CustomAppDelegate.apply("applicationOpenURLOptions", (event) => {
        return Auth0.resumeAuth(event.args.url, event.args.options);
    });

}

application.start(
    { 
        moduleName: "login" 
    }
);
