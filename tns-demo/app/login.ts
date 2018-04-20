import * as appSettings from "application-settings";
import * as frameModule from "ui/frame";
import * as helpers from "./scripts/helpers";
import { Auth0Core } from "nativescript-auth0";

let lock: Auth0Core = null;

exports.onPageLoaded = function (args) {
    lock = helpers.getAuthLock();
    console.dump(lock.credientials);
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
        console.log("Hey login worked");
        goToHome();
    }, function (error) {
        console.log(error);
    });
}

function goToHome(){
    console.log("Lets navigate to home");

    var navOptions = {
        moduleName: "home",
        transition: {
            name: "fade",
            duration: 380,
            curve: "easeIn"
        },
        clearHistory: true //Dont want the user to nav back to login
    };
    console.log("Frame count: " + frameModule.stack().length);
    frameModule.topmost().navigate(navOptions);

}
