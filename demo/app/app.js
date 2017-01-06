"use strict";
var application = require("application");
var nativescript_auth0_1 = require("nativescript-auth0");
if (application.ios) {
    var MyDelegate = (function (_super) {
        __extends(MyDelegate, _super);
        function MyDelegate() {
            return _super.apply(this, arguments) || this;
        }
        MyDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
            var lock = new nativescript_auth0_1.Auth0Lock('q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp', 'nativescript.auth0.com');
            lock.initalize();
            global.auth0 = lock;
            return true;
        };
        return MyDelegate;
    }(UIResponder));
    MyDelegate.ObjCProtocols = [UIApplicationDelegate];
    application.ios.delegate = MyDelegate;
}
else {
    application.on(application.launchEvent, function (args) {
        var lock = new nativescript_auth0_1.Auth0Lock('q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp', 'nativescript.auth0.com');
        global.auth0 = lock;
    });
}
application.start({
    moduleName: "login"
});
//# sourceMappingURL=app.js.map