import { Application } from "@nativescript/core";
import { resumeAuth } from "nativescript-auth0";

export function setupAuth0() {
  if (global.isIOS) {
    @NativeClass()
    class CustomAppDelegate
      extends UIResponder
      implements UIApplicationDelegate {
      public static ObjCProtocols = [UIApplicationDelegate];

      public applicationDidEnterBackground(application: UIApplication) {
        console.log("applicationDidEnterBackground");
      }

      public applicationDidFinishLaunchingWithOptions(
        application: UIApplication,
        launchOptions: any
      ): boolean {
        console.log("applicationDidFinishLaunchingWithOptions");
        return true;
      }

      applicationOpenURLOptions?(
        application: UIApplication,
        url: NSURL,
        options: NSDictionary<string, any>
      ) {
        console.log("applicationOpenURLOptions");
        return resumeAuth(url, options);
      }

      applicationContinueUserActivityRestorationHandler?(
        application: UIApplication,
        userActivity: NSUserActivity,
        restorationHandler: (p1: NSArray<any>) => void
      ) {
        console.log("applicationContinueUserActivityRestorationHandler");
        return true;
      }
    }

    Application.ios.delegate = CustomAppDelegate;
  }
}
