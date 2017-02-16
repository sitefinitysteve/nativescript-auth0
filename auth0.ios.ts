import common = require("./auth0.common");

import * as util from "utils/utils";
import * as application from "application";

var localResolve;
var reciever;

export class Auth0Lock extends common.Auth0Lock{
    constructor(clientId: string, domain: string){
        super(clientId, domain);
    }

    public show() : Promise<any>{
        return new Promise(function (resolve, reject) {
            try
            {
                localResolve = resolve;

            }
            catch(args){
                reject(args);
            }
        });
    }
}
