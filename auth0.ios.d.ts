import common = require("./auth0.common");
export declare class Auth0Core extends common.Auth0Core {
    constructor(options: common.Options);
    show(): Promise<any>;
}
