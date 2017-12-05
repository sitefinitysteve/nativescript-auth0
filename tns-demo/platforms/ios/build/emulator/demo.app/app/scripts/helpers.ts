import * as auth0Module from "nativescript-auth0";

//Single point of entry to get the Lock object, only have to set the keys once
export function getAuthLock(): auth0Module.Auth0Lock{
    return new auth0Module.Auth0Lock({
        clientId: 'q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp',
        domain:'nativescript.auth0.com',
        //scope: ["offline_access openid"]
    });
}