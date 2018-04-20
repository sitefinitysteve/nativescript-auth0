import * as app from 'application';
import * as httpModule from 'http';
import * as appSetttings from 'application-settings';
var jwt = require("./jwt");

export interface Options{
  domain: string,
  clientId: string,
  audience?: string,
  scope?: Array<string>
}

export interface Credentials {
    accessToken: string;
    idToken: string;
    refreshToken: string;
}

export class Auth0Core {
  public static readonly _tokenKey: string = "auth0Tokens";
  public static readonly _nullCredsMessage: string = "Unknown or invalid credientials";

  protected options: Options;
  
  public credientials: Credentials;
 
  constructor(options: Options) {
    this.options = options;

    this.credientials = {
      accessToken: "",
      idToken: "",
      refreshToken: ""
    };

    this.refresh();
  }

  public refresh(): void{
    if(appSetttings.hasKey(Auth0Core._tokenKey)){
      //Flesh out the object
      let data: Credentials = JSON.parse(appSetttings.getString(Auth0Core._tokenKey));
      this.credientials = {
        accessToken: data.accessToken,
        idToken: data.idToken,
        refreshToken: data.refreshToken,
      };
    }
  }


  public getUserInfo(): Promise<any>{
    return new Promise((resolve, reject) => {
        httpModule.request({ 
          url: "https://" + this.options.domain + "/userinfo", 
          method: "GET",
          headers: {
            "Authorization": "Bearer " + this.credientials.accessToken
          }
      }).then((response) => {
            resolve(response.content.toJSON());
        }, function (e) {
          console.log(e);
            reject(e);
        });
      });
  }

  public getTokenInfo(): Promise<any>{
      return new Promise((resolve, reject) => {
        httpModule.request({ 
          url: "https://" + this.options.domain + "/tokeninfo", 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          content: JSON.stringify({ "id_token": this.credientials.idToken })
      }).then((response) => {
            resolve(response.content.toJSON());
        }, function (e) {
            reject(e);
        });
      });
  }

  public hasValidToken(): Boolean{
      var token = this.credientials.accessToken;

      if(token === "")
        return false;

      if(this.isTokenExpired())
        return false;

      return true;
  }

  public isTokenExpired(): boolean{
    var token = this.credientials.idToken;
    if(token === "" || token === null)
      return true;

    var expiresOn = this.getRawToken().exp;
    
    return (expiresOn < Date.now() / 1000);
  }

  public getTokenExpiryDate(): Date{
    var data = this.getRawToken()
    return new Date(data.exp * 1000); //JS is in milliseconds
  }

  public getRawToken(): any{
    var token = this.credientials.idToken;
    if(token === "" || token === null)
      throw "idToken is empty";

    return jwt(token);
  }

  public clearTokens(): void{
    appSetttings.remove(Auth0Core._tokenKey);
  }
}

