/// <reference path="typings/Auth0.ios.d.ts" />
/// <reference path="typings/Lock.ios.d.ts" />
import common = require("./auth0.common");
export declare class Auth0Lock extends common.Auth0Lock {
    constructor(options: common.Options);
    show(): Promise<any>;
}
