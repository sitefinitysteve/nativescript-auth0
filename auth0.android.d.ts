import common = require("./auth0.common");
export declare class Auth0Core extends common.Auth0Core {
    _lock: any;
    _callback: any;
    constructor(options: common.Options);
    show(): Promise<any>;
}
