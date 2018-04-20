"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("application");
if (application.ios) {
    var delegate = require("./custom-app-delegate");
    var CustomAppDelegate = delegate.CustomAppDelegate;
    application.ios.delegate = CustomAppDelegate;
    CustomAppDelegate.apply("applicationOpenURLOptions", function (event) {
        return Auth0.resumeAuth(event.args.url, event.args.options);
    });
}
application.start({
    moduleName: "login"
});
//# sourceMappingURL=app.js.map