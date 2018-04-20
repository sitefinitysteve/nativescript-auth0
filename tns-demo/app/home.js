"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appSettings = require("application-settings");
var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var helpers = require("./scripts/helpers");
var nativescript_auth0_1 = require("nativescript-auth0");
var init = false;
var auth0Tokens = {};
var lock = null;
var auth0Data;
exports.onPageLoaded = function (args) {
    var page = args.object;
    console.log("Home page");
    lock = helpers.getAuthLock();
    auth0Data = observableModule.fromObject({
        data: "Welcome, press a button below",
        creds: {
            accessToken: lock.credientials.accessToken,
            idToken: lock.credientials.idToken,
            refreshToken: lock.credientials.refreshToken
        },
        tokenExpiryDate: lock.getTokenExpiryDate() + " (" + lock.getRawToken().exp + ")"
    });
    console.dump(lock.credientials);
    console.log("ID TOKEN: " + lock.credientials.idToken);
    page.bindingContext = auth0Data;
};
exports.onLogout = function (args) {
    console.log("Logout");
    appSettings.remove(nativescript_auth0_1.Auth0Core._tokenKey);
    var navOptions = {
        moduleName: "login",
        transition: {
            name: "fade",
            duration: 380,
            curve: "easeIn"
        },
        clearHistory: true
    };
    frameModule.topmost().navigate(navOptions);
};
exports.onGetUserData = function (args) {
    console.log("Get user data");
    lock.getUserInfo().then(function (user) {
        console.log("Complete");
        auth0Data.set("data", JSON.stringify(user));
    });
};
exports.onGetTokenData = function (args) {
    console.log("Get token data");
    lock.getTokenInfo().then(function (token) {
        console.log("Complete");
        auth0Data.set("data", JSON.stringify(token));
    });
};
//# sourceMappingURL=home.js.map