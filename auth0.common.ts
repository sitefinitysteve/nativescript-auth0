import * as app from 'application';
import * as httpModule from 'http';
import * as appSetttings from 'application-settings';
var jwt = require("./jwt");

export interface Options{
  domain: string,
  clientId: string,
  scope?: Array<string>
}

export interface Credentials {
    accessToken: string;
    idToken: string;
    refreshToken: string;
}

export class Auth0Lock {
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
    if(appSetttings.hasKey(Auth0Lock._tokenKey)){
      //Flesh out the object
      let data: Credentials = JSON.parse(appSetttings.getString(Auth0Lock._tokenKey));
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

    var data = jwt(token);
    var expiresOn = new Date(data.ext);
    
    return (expiresOn > new Date()) ? true : false;
  }

  public clearTokens(): void{
    appSetttings.remove(Auth0Lock._tokenKey);
  }
}

