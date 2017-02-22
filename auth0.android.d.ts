import common = require("./auth0.common");
export declare class Auth0Lock extends common.Auth0Lock {
    _lock: any;
    _callback: any;
    constructor(options: common.Options);
    show(): Promise<any>;
}
