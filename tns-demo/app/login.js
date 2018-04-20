"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frameModule = require("ui/frame");
var helpers = require("./scripts/helpers");
var lock = null;
exports.onPageLoaded = function (args) {
    lock = helpers.getAuthLock();
    console.dump(lock.credientials);
    var page = args.object;
    console.log("Login page");
    if (!lock.hasValidToken()) {
        doLogin();
    }
    else {
        goToHome();
    }
};
function doLogin() {
    lock.show().then(function (res) {
        console.log("Hey login worked");
        goToHome();
    }, function (error) {
        console.log(error);
    });
}
function goToHome() {
    console.log("Lets navigate to home");
    var navOptions = {
        moduleName: "home",
        transition: {
            name: "fade",
            duration: 380,
            curve: "easeIn"
        },
        clearHistory: true
    };
    console.log("Frame count: " + frameModule.stack().length);
    frameModule.topmost().navigate(navOptions);
}
//# sourceMappingURL=login.js.map