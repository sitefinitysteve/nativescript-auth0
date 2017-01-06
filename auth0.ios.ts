import { Common } from './auth0.common';

import * as util from "utils/utils";
import * as application from "application";

var localResolve;
var reciever;

export class Auth0Lock{
    constructor(){

    }

    public initalize(clientId: string, domain: string) : void{

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
