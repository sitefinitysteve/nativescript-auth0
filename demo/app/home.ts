import * as appSettings from "application-settings";
import * as frameModule from "ui/frame";
import * as observableModule from "data/observable";
import * as helpers from "./scripts/helpers";
import { Auth0Lock } from "nativescript-auth0";
var init = false;
var auth0Tokens = {};

declare var JSON: any;
let lock: Auth0Lock = null;
let auth0Data: observableModule.Observable;

exports.onPageLoaded = function (args) {
    var page = args.object;
    console.log("Home page"); 
    lock = helpers.getAuthLock();

    auth0Data = observableModule.fromObject({
        data: "Welcome, press a button below",
        creds: { 
            accessToken: lock.credientials.accessToken,
            idToken: lock.credientials.idToken,
            refreshToken: lock.credientials.refreshToken
        }
    });

    
    console.dump(lock.credientials);



    page.bindingContext = auth0Data; 
} 

exports.onLogout = function (args) {
    console.log("Logout");
    appSettings.remove(Auth0Lock._tokenKey);
         
  var navOptions = {
      moduleName: "login",
      transition: {
          name: "fade",
          duration: 380,
          curve: "easeIn"
      },
      clearHistory: true //Dont want the user to nav back to login
  };

  frameModule.topmost().navigate(navOptions);
}

exports.onGetUserData = function(args){
    console.log("Get user data");
    lock.getUserInfo().then((user) => {
        console.log("Complete");
        auth0Data.set("data", JSON.stringify(user));
    });
}

exports.onGetTokenData = function(args){
    console.log("Get token data");
    lock.getTokenInfo().then((token) => {
        console.log("Complete");
        auth0Data.set("data", JSON.stringify(token));
    });
}