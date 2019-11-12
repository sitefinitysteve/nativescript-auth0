import { Component, OnInit } from "@angular/core";
import { Auth0 } from 'nativescript-auth0';

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    private auth0: Auth0;
    private _message: string;

    constructor() {
        // Use the component constructor to inject providers.
        this.auth0 = new Auth0('q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp', 'nativescript.auth0.com');
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    get message(): string {
        return this._message;
    }

    login() {
        this.auth0.webAuthentication({
            scope: 'openid offline_access'
        }).then((result) => {
            this._message = JSON.stringify(result);
            console.log(result);
        }).catch((e: Error) => console.log(e, e.stack));
    }
}
