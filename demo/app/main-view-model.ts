import { Observable } from '@nativescript/core';
import { Auth0, Credentials, WebAuthException } from 'nativescript-auth0';

export class HelloWorldModel extends Observable {
    private auth0: Auth0;
    public message: string;

    constructor() {
        super();

        this.auth0 = new Auth0('q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp', 'nativescript.auth0.com');
        this.message = '';
    }

    onTap() {
        this.auth0.webAuthentication({
            scope: 'openid offline_access'
        }).then((result: Credentials) => {
            this.set('message', JSON.stringify(result, null, '  '));
            console.log(result);
        }).catch((error: Error | WebAuthException) => {
            this.set('message', JSON.stringify(error, null, '  '));
            console.log(error.stack);
        });
    }
}
