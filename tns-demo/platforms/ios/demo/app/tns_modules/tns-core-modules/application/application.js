var common = require("./application-common");
var frame_1 = require("ui/frame");
var uiUtils = require("ui/utils");
var utils = require("utils/utils");
global.moduleMerge(common, exports);
var typedExports = exports;
var Responder = (function (_super) {
    __extends(Responder, _super);
    function Responder() {
        _super.apply(this, arguments);
    }
    return Responder;
}(UIResponder));
var Window = (function (_super) {
    __extends(Window, _super);
    function Window() {
        _super.apply(this, arguments);
    }
    Window.prototype.initWithFrame = function (frame) {
        var window = _super.prototype.initWithFrame.call(this, frame);
        if (window) {
            window.autoresizingMask = 0;
        }
        return window;
    };
    Object.defineProperty(Window.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            this._content = value;
        },
        enumerable: true,
        configurable: true
    });
    Window.prototype.layoutSubviews = function () {
        if (utils.ios.MajorVersion < 9) {
            uiUtils.ios._layoutRootView(this._content, utils.ios.getter(UIScreen, UIScreen.mainScreen).bounds);
        }
        else {
            uiUtils.ios._layoutRootView(this._content, this.frame);
        }
    };
    return Window;
}(UIWindow));
var NotificationObserver = (function (_super) {
    __extends(NotificationObserver, _super);
    function NotificationObserver() {
        _super.apply(this, arguments);
    }
    NotificationObserver.new = function () {
        return _super.new.call(this);
    };
    NotificationObserver.prototype.initWithCallback = function (onReceiveCallback) {
        this._onReceiveCallback = onReceiveCallback;
        return this;
    };
    NotificationObserver.prototype.onReceive = function (notification) {
        this._onReceiveCallback(notification);
    };
    NotificationObserver.ObjCExposedMethods = {
        "onReceive": { returns: interop.types.void, params: [NSNotification] }
    };
    return NotificationObserver;
}(NSObject));
var IOSApplication = (function () {
    function IOSApplication() {
        this._currentOrientation = utils.ios.getter(UIDevice, UIDevice.currentDevice).orientation;
        this._observers = new Array();
        this.addNotificationObserver(UIApplicationDidFinishLaunchingNotification, this.didFinishLaunchingWithOptions.bind(this));
        this.addNotificationObserver(UIApplicationDidBecomeActiveNotification, this.didBecomeActive.bind(this));
        this.addNotificationObserver(UIApplicationDidEnterBackgroundNotification, this.didEnterBackground.bind(this));
        this.addNotificationObserver(UIApplicationWillTerminateNotification, this.willTerminate.bind(this));
        this.addNotificationObserver(UIApplicationDidReceiveMemoryWarningNotification, this.didReceiveMemoryWarning.bind(this));
        this.addNotificationObserver(UIDeviceOrientationDidChangeNotification, this.orientationDidChange.bind(this));
    }
    Object.defineProperty(IOSApplication.prototype, "nativeApp", {
        get: function () {
            return utils.ios.getter(UIApplication, UIApplication.sharedApplication);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IOSApplication.prototype, "window", {
        get: function () {
            return this._window;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IOSApplication.prototype, "delegate", {
        get: function () {
            return this._delegate;
        },
        set: function (value) {
            if (this._delegate !== value) {
                this._delegate = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    IOSApplication.prototype.addNotificationObserver = function (notificationName, onReceiveCallback) {
        var observer = NotificationObserver.new().initWithCallback(onReceiveCallback);
        utils.ios.getter(NSNotificationCenter, NSNotificationCenter.defaultCenter).addObserverSelectorNameObject(observer, "onReceive", notificationName, null);
        this._observers.push(observer);
        return observer;
    };
    IOSApplication.prototype.removeNotificationObserver = function (observer, notificationName) {
        var index = this._observers.indexOf(observer);
        if (index >= 0) {
            this._observers.splice(index, 1);
            utils.ios.getter(NSNotificationCenter, NSNotificationCenter.defaultCenter).removeObserverNameObject(observer, notificationName, null);
        }
    };
    IOSApplication.prototype.didFinishLaunchingWithOptions = function (notification) {
        this._window = Window.alloc().initWithFrame(utils.ios.getter(UIScreen, UIScreen.mainScreen).bounds);
        this._window.backgroundColor = utils.ios.getter(UIColor, UIColor.whiteColor);
        if (typedExports.onLaunch) {
            typedExports.onLaunch(undefined);
        }
        var args = {
            eventName: typedExports.launchEvent,
            object: this,
            ios: notification.userInfo && notification.userInfo.objectForKey("UIApplicationLaunchOptionsLocalNotificationKey") || null
        };
        typedExports.notify(args);
        var rootView = createRootView(args.root);
        this._window.content = rootView;
        if (rootView instanceof frame_1.Frame) {
            this.rootController = this._window.rootViewController = rootView.ios.controller;
        }
        else if (rootView.ios instanceof UIViewController) {
            this.rootController = this._window.rootViewController = rootView.ios;
        }
        else if (rootView.ios instanceof UIView) {
            var newController = UIViewController.new();
            newController.view.addSubview(rootView.ios);
            this.rootController = newController;
        }
        else {
            throw new Error("Root should be either UIViewController or UIView");
        }
        this._window.makeKeyAndVisible();
    };
    IOSApplication.prototype.didBecomeActive = function (notification) {
        if (typedExports.onResume) {
            typedExports.onResume();
        }
        typedExports.notify({ eventName: typedExports.resumeEvent, object: this, ios: utils.ios.getter(UIApplication, UIApplication.sharedApplication) });
    };
    IOSApplication.prototype.didEnterBackground = function (notification) {
        if (typedExports.onSuspend) {
            typedExports.onSuspend();
        }
        typedExports.notify({ eventName: typedExports.suspendEvent, object: this, ios: utils.ios.getter(UIApplication, UIApplication.sharedApplication) });
    };
    IOSApplication.prototype.willTerminate = function (notification) {
        if (typedExports.onExit) {
            typedExports.onExit();
        }
        typedExports.notify({ eventName: typedExports.exitEvent, object: this, ios: utils.ios.getter(UIApplication, UIApplication.sharedApplication) });
    };
    IOSApplication.prototype.didReceiveMemoryWarning = function (notification) {
        if (typedExports.onLowMemory) {
            typedExports.onLowMemory();
        }
        typedExports.notify({ eventName: typedExports.lowMemoryEvent, object: this, android: undefined, ios: utils.ios.getter(UIApplication, UIApplication.sharedApplication) });
    };
    IOSApplication.prototype.orientationDidChange = function (notification) {
        var orientation = utils.ios.getter(UIDevice, UIDevice.currentDevice).orientation;
        if (this._currentOrientation !== orientation) {
            this._currentOrientation = orientation;
            var enums = require("ui/enums");
            var newValue;
            switch (orientation) {
                case 4:
                case 3:
                    newValue = enums.DeviceOrientation.landscape;
                    break;
                case 1:
                case 2:
                    newValue = enums.DeviceOrientation.portrait;
                    break;
                default:
                    newValue = enums.DeviceOrientation.unknown;
                    break;
            }
            common._onOrientationChanged();
            typedExports.notify({
                eventName: typedExports.orientationChangedEvent,
                ios: this,
                newValue: newValue,
                object: this
            });
        }
    };
    return IOSApplication;
}());
var iosApp = new IOSApplication();
typedExports.ios = iosApp;
global.__onUncaughtError = function (error) {
    var types = require("utils/types");
    if (types.isFunction(typedExports.onUncaughtError)) {
        typedExports.onUncaughtError(error);
    }
    typedExports.notify({ eventName: typedExports.uncaughtErrorEvent, object: typedExports.ios, ios: error });
};
function loadCss() {
    typedExports.appSelectors = typedExports.loadCss(typedExports.cssFile) || [];
    if (typedExports.appSelectors.length > 0) {
        typedExports.mergeCssSelectors(typedExports);
    }
}
function addCss(cssText) {
    var parsed = typedExports.parseCss(cssText);
    if (parsed) {
        typedExports.additionalSelectors.push.apply(typedExports.additionalSelectors, parsed);
        typedExports.mergeCssSelectors(typedExports);
    }
}
exports.addCss = addCss;
function createRootView(v) {
    var rootView = v;
    var frame;
    var navParam;
    if (!rootView) {
        navParam = typedExports.mainEntry;
        if (!navParam) {
            navParam = typedExports.mainModule;
        }
        if (navParam) {
            frame = new frame_1.Frame();
            frame.navigate(navParam);
        }
        else {
            throw new Error("A Frame must be used to navigate to a Page.");
        }
        rootView = frame;
    }
    return rootView;
}
var started = false;
typedExports.start = function (entry) {
    if (entry) {
        exports.mainEntry = entry;
    }
    started = true;
    loadCss();
    if (!iosApp.nativeApp) {
        UIApplicationMain(0, null, null, typedExports.ios && typedExports.ios.delegate ? NSStringFromClass(typedExports.ios.delegate) : NSStringFromClass(Responder));
    }
    else {
        var rootView = createRootView();
        if (rootView) {
            var window = iosApp.nativeApp.keyWindow || (iosApp.nativeApp.windows.count > 0 && iosApp.nativeApp.windows[0]);
            if (window) {
                var rootController = window.rootViewController;
                if (rootController) {
                    rootController.presentViewControllerAnimatedCompletion(rootView.ios.controller, utils.ios.MajorVersion >= 7, null);
                    uiUtils.ios._layoutRootView(rootView, utils.ios.getter(UIScreen, UIScreen.mainScreen).bounds);
                }
            }
        }
    }
};
global.__onLiveSync = function () {
    if (!started) {
        return;
    }
    common.__onLiveSync();
    loadCss();
};
//# sourceMappingURL=application.js.map