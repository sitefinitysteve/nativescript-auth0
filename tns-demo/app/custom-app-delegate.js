"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomAppDelegate = (function (_super) {
    __extends(CustomAppDelegate, _super);
    function CustomAppDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomAppDelegate.prototype.applicationDidEnterBackground = function (application) {
        console.log("applicationDidEnterBackground");
    };
    CustomAppDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
        console.log("applicationDidFinishLaunchingWithOptions");
        return CustomAppDelegate._promise("applicationDidFinishLaunchingWithOptions", { application: application, launchOptions: launchOptions });
    };
    CustomAppDelegate.prototype.applicationOpenURLOptions = function (application, url, options) {
        console.log("applicationOpenURLOptions");
        return CustomAppDelegate._promise("applicationOpenURLOptions", { application: application, url: url, options: options });
    };
    CustomAppDelegate.prototype.applicationContinueUserActivityRestorationHandler = function (application, userActivity, restorationHandler) {
        console.log("applicationContinueUserActivityRestorationHandler");
        return CustomAppDelegate._promise("applicationContinueUserActivityRestorationHandler", { application: application, userActivity: userActivity, restorationHandler: restorationHandler });
    };
    CustomAppDelegate._promise = function (fn, args) {
        var constants = {
            state: args.application.applicationState
        };
        var promise = Promise.resolve().then(function () {
            return { fn: fn, args: args, constants: constants };
        });
        var entry;
        if (!(entry = this._queue[fn])) {
            entry = { callbacks: [], promise: promise };
            this._queue[fn] = entry;
            return entry;
        }
        entry.promise = promise;
        if (entry.callbacks.length > 0) {
            entry.callbacks.forEach(function (callback) {
                entry.promise.then(callback);
            });
        }
        return entry;
    };
    CustomAppDelegate.apply = function (fn, callback) {
        var entry;
        if (!(entry = this._queue[fn])) {
            entry = this._queue[fn] = { callbacks: [], promise: false };
        }
        if (!entry.promise) {
            entry.callbacks.push(callback);
        }
        else {
            entry.promise.then(callback);
        }
        return entry;
    };
    CustomAppDelegate.ObjCProtocols = [UIApplicationDelegate];
    CustomAppDelegate._queue = {};
    return CustomAppDelegate;
}(UIResponder));
exports.CustomAppDelegate = CustomAppDelegate;
var handler = function restorationHandler() {
};
//# sourceMappingURL=custom-app-delegate.js.map