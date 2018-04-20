export declare class CustomAppDelegate extends UIResponder implements UIApplicationDelegate {
    static ObjCProtocols: {
        prototype: UIApplicationDelegate;
    }[];
    protected static _queue: Object;
    applicationDidEnterBackground(application: UIApplication): void;
    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: any): boolean;
    applicationOpenURLOptions?(application: UIApplication, url: NSURL, options: NSDictionary<string, any>): any;
    applicationContinueUserActivityRestorationHandler?(application: UIApplication, userActivity: NSUserActivity, restorationHandler: (p1: NSArray<any>) => void): any;
    protected static _promise(fn: string, args: any): any;
    static apply(fn: string, callback: any): any;
}
