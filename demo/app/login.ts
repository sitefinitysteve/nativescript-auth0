import * as appSettings from "application-settings";
import * as frameModule from "ui/frame";
import * as helpers from "./scripts/helpers";
import { Auth0Lock } from "nativescript-auth0";

let lock: Auth0Lock = null;

exports.onPageLoaded = function (args) {
    lock = helpers.getAuthLock();

    var page = args.object;
    console.log("Login page");

    //Check to see if the user is logged in
    if(!lock.hasValidToken()){
      //No tokens -> login
        doLogin();
    } else {
      //Tokens available. Check expiry and if OK show 'home'
      goToHome();
    }
}


function doLogin(){
    lock.show().then((res) => {
        goToHome();
    }, function (error) {
        console.log(error);
    });
}

function goToHome(){
  var navOptions = {
      moduleName: "home",
      transition: {
          name: "fade",
          duration: 380,
          curve: "easeIn"
      },
      clearHistory: true //Dont want the user to nav back to login
  };
  frameModule.topmost().navigate(navOptions);
}
