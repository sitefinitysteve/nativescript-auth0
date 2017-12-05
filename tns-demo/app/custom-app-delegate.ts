export class CustomAppDelegate extends UIResponder implements UIApplicationDelegate {
    public static ObjCProtocols = [UIApplicationDelegate];
    protected static _queue: Object = {};

    public applicationDidEnterBackground(application: UIApplication) {
        console.log("applicationDidEnterBackground");
    }

    public applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: any): boolean {
        console.log("applicationDidFinishLaunchingWithOptions");
        return CustomAppDelegate._promise("applicationDidFinishLaunchingWithOptions", { application, launchOptions });
    }

	applicationOpenURLOptions(application: typeof UIApplication, url: string, options: typeof NSDictionary) {
        console.log("applicationOpenURLOptions");
		return CustomAppDelegate._promise("applicationOpenURLOptions", { application, url, options });
	}

    applicationContinueUserActivityRestorationHandler(application: typeof UIApplication, userActivity, restorationHandler) {
        console.log("applicationContinueUserActivityRestorationHandler");
		return CustomAppDelegate._promise("applicationContinueUserActivityRestorationHandler", { application, userActivity, restorationHandler });
	}

    protected static _promise(fn: string, args: any) {
		let constants = {
			// keep a copy of the call-time application state
			state: args.application.applicationState
		};

		let promise = Promise.resolve().then(() => {
			return { fn: fn, args: args, constants: constants };
		});

		let entry;

		if (!(entry = this._queue[fn])) {
			entry = { callbacks: [], promise: promise };
			this._queue[fn] = entry;
			return entry;
		}

		entry.promise = promise;

		if (entry.callbacks.length > 0) {
			entry.callbacks.forEach(function(callback) {
				entry.promise.then(callback);
			});
		}

		return entry;
	}

	public static apply(fn: string, callback: any) {
		let entry;

		if (!(entry = this._queue[fn])) {
			entry = this._queue[fn] = { callbacks: [], promise: false };
		}

		if (!entry.promise) {
			entry.callbacks.push(callback);
		} else {
			entry.promise.then(callback);
		}

		return entry;
	}
}

var handler = function restorationHandler(){

}