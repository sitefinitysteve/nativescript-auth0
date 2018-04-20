"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers = require("../scripts/helpers");
var appSetttings = require("application-settings");
var nativescript_auth0_1 = require("nativescript-auth0");
describe('Auth0Lock', function () {
    var accessToken = "G47mNzshIVeFAivt";
    var idToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL25hdGl2ZXNjcmlwdC5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU5MjQ4NDk5NDA1OTAyNjQwMjUiLCJhdWQiOiJxNWF0UXppNkRnbVdCcEhXUkpiZDdNQk5hNWVMQlBScCIsImV4cCI6MTQ4NzgyODkwMCwiaWF0IjoxNDg3NzkyOTAwfQ.fn9Ndgheo6DajCB_1KWDNmB6CR6bCmhh2rJA3kA8w1Q";
    var refreshToken = "";
    var lock = helpers.getAuthLock();
    before(function () {
        var creds = {
            accessToken: accessToken,
            idToken: idToken,
            refreshToken: refreshToken,
        };
        appSetttings.setString(nativescript_auth0_1.Auth0Core._tokenKey, JSON.stringify(creds));
    });
    it("Can validate expiry", function () {
        var isExpired = lock.isTokenExpired();
        console.log("Is expired: " + isExpired);
        assert.isFalse(isExpired);
    });
    it("Can get user profile", function () {
        var user = lock.getUserInfo();
        console.dump(user);
        assert.isTrue(user);
    });
});
//# sourceMappingURL=tests.js.map