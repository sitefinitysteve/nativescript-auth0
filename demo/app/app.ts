import * as application from "application";
import { Auth0Lock } from "nativescript-auth0";



if (application.ios) {
    //iOS
    class MyDelegate extends UIResponder implements UIApplicationDelegate {
        public static ObjCProtocols = [UIApplicationDelegate];

        applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary): boolean {
            var lock = new Auth0Lock('q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp','nativescript.auth0.com');
            global.auth0 = lock;
            return true;
        }

    }

    application.ios.delegate = MyDelegate;

}else{
    //ANDROID
    application.on(application.launchEvent, function (args) {
        var lock = new Auth0Lock('q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp','nativescript.auth0.com');
        global.auth0 = lock;
    });

}

application.start(
    { 
        moduleName: "login" 
    }
);
