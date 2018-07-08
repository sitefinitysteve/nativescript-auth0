import { Observable } from 'tns-core-modules/data/observable/observable';
import { Auth0 } from 'nativescript-auth0';

export class HelloWorldModel extends Observable {
    public message: string;
    private auth0: Auth0;

    constructor() {
        super();

        this.auth0 = new Auth0('q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp', 'nativescript.auth0.com');
        this.message = 'hello';
    }

    onTap(args) {
        const button = args.object;
        this.auth0.webAuthentication({}).then((result) => {
            this.message = JSON.stringify(result);
            console.log(result);
        });
    }
}
