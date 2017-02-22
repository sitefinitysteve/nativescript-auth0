import common = require("./auth0.common");

import * as util from "utils/utils";
import * as application from "application";

var localResolve;
var reciever;

export class Auth0Lock extends common.Auth0Lock{
    constructor(options: common.Options){
        super(options);
    }
}
