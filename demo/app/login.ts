import * as appSettings from "application-settings";
import * as frameModule from "ui/frame";
import { Auth0Lock } from "nativescript-auth0";

exports.onPageLoaded = function (args) {
    var page = args.object;
    console.log("Login page");

    //Check to see if the user is logged in
    if(!appSettings.hasKey("auth0Tokens")){
      //No tokens -> login
        doLogin();
    } else {
      //Tokens available. Check expiry and if OK show 'home'
      goToHome();
    }
}


function doLogin(){
    global.auth0.show().then((res) => {
        goToHome();
    }, function (error) {
        alert(error);
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
