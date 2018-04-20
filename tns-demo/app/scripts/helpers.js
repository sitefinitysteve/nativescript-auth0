"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth0Module = require("nativescript-auth0");
function getAuthLock() {
    return new auth0Module.Auth0Core({
        clientId: 'q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp',
        domain: 'nativescript.auth0.com',
    });
}
exports.getAuthLock = getAuthLock;
//# sourceMappingURL=helpers.js.map