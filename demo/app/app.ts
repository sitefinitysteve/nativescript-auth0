import * as application from "application";
import * as auth0 from "nativescript-auth0";

if (application.ios) {
    //iOS
    class MyDelegate extends UIResponder implements UIApplicationDelegate {
        public static ObjCProtocols = [UIApplicationDelegate];

        applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary): boolean {
            auth0.initalize();

            return true;
        }

    }

    application.ios.delegate = MyDelegate;

}else{
    //ANDROID
    application.on(application.launchEvent, function (args) {
        auth0.initalize();
    });

}

application.start(
    { 
        moduleName: "login" 
    }
);
