import { Component, OnInit } from "@angular/core";
import { Auth0LockService } from "../login/auth0-lock.service";
import { Auth0Lock } from "nativescript-auth0";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  moduleId: module.id,
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private lock: Auth0Lock;
  private data: string;
  public creds;
  public tokenExpiryDate;

  constructor(
    private auth0LockService: Auth0LockService,
    private routerExtension: RouterExtensions
  ) { }

  public ngOnInit() {
    this.lock = this.auth0LockService.getLock();
    this.creds = {
      accessToken: this.lock.credientials.accessToken,
      idToken: this.lock.credientials.idToken,
      refreshToken: this.lock.credientials.refreshToken
    }
    this.tokenExpiryDate = this.lock.getTokenExpiryDate() + " (" + this.lock.getRawToken().exp + ")"
  }

  public onLogout() {
    this.routerExtension.navigate(['/login'], {
      transition: {
        name: "fade",
        duration: 380,
        curve: "easeIn"
      },
      clearHistory: true //Dont want the user to nav back to login})
    });
  }

  public onGetUserData() {
    console.log("Get user data");
    this.lock.getUserInfo().then((user) => {
      console.log("Complete");
      this.data = JSON.stringify(user);
    })
  }

  public OnGetTokenData() {
    console.log("Get token data");
    this.lock.getTokenInfo().then((token) => {
      console.log("complete");
      this.data = JSON.stringify(token);
    })
  }

}
