import * as auth0Module from "nativescript-auth0";

//Single point of entry to get the Lock object, only have to set the keys once
export function getAuthLock(): auth0Module.Auth0Lock {
    return new auth0Module.Auth0Lock({
        clientId: '7bQ7n7ovxDOUnkh4WyvKO4J57tgUMV75',
        domain: 'wfwheele-qbfl.auth0.com',
        //scope: ["offline_access openid"]
    });
}
