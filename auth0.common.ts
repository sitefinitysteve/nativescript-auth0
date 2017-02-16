import * as app from 'application';
import * as appSetttings from 'application-settings';
import * as common from "./index";

export class Auth0Lock {
  public static readonly _tokenKey: string = "auth0Tokens";

  protected _clientId: string;
  protected _domain: string;
  
  public credientials: common.Credentials;
 
  constructor(clientId: string, domain: string) {
    this._clientId = clientId;
    this._domain = domain;
    this.credientials = null;
  }

  public hasToken(): Boolean{
      return appSetttings.hasKey(Auth0Lock._tokenKey);
  }

  public saveTokens(accessToken: string, idToken: string, refreshToken: string): void{
    this.credientials.accessToken = accessToken;
    this.credientials.idToken = idToken;
    this.credientials.refreshToken = refreshToken;

    var creds = JSON.stringify(this.credientials);

    console.log("Save token");
    console.dump(creds);
    appSetttings.setString(Auth0Lock._tokenKey, creds);
  }

  public clearTokens(): void{
    appSetttings.remove(Auth0Lock._tokenKey);
  }
}
