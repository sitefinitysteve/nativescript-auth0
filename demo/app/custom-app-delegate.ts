export class CustomAppDelegate extends UIResponder implements UIApplicationDelegate {
    public static ObjCProtocols = [UIApplicationDelegate];

    public applicationDidEnterBackground(application: UIApplication) {
        console.log("applicationDidEnterBackground");
    }

    public applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary): boolean {
        console.log("applicationDidFinishLaunchingWithOptions");
        return true;
    }

    public applicationOpenUrl(application: UIApplication, url: URL, options: UIApplicationOpenURLOptionsKey): boolean {
        console.log("OPEN");
    }
}