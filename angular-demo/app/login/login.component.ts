import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Auth0LockService } from "./auth0-lock.service";
import { Auth0Lock } from "nativescript-auth0";

@Component({
  moduleId: module.id,
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

  private lock: Auth0Lock;

  constructor(
    private auth0LockService: Auth0LockService,
    private routerExtensions: RouterExtensions
  ) { }

  ngOnInit() {
    this.lock = this.auth0LockService.getLock();
    if (!this.lock.hasValidToken()) {
      this.doLogin();
    } else {
      this.goToHome();
    }
  }

  private doLogin() {
    this.lock.show().then((res) => {
      console.log("Hey login worked");
      this.goToHome();
    }).catch((e) => {
      console.error(e);
    });
  }

  private goToHome() {
    this.routerExtensions.navigate(['/home'], {
      transition: {
        name: "fade",
        duration: 380,
        curve: "easeIn"
      },
      clearHistory: true //Dont want the user to nav back to login
    });
  }

}
