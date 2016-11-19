"use strict";
var application = require("application");
var auth0 = require("nativescript-auth0");
if (application.ios) {
    //iOS
    var MyDelegate = (function (_super) {
        __extends(MyDelegate, _super);
        function MyDelegate() {
            _super.apply(this, arguments);
        }
        MyDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
            auth0.initalize();
            return true;
        };
        MyDelegate.ObjCProtocols = [UIApplicationDelegate];
        return MyDelegate;
    }(UIResponder));
    application.ios.delegate = MyDelegate;
}
else {
    //ANDROID
    application.on(application.launchEvent, function (args) {
        auth0.initalize();
    });
}
application.start({
    moduleName: "login"
});
//# sourceMappingURL=app.js.map