var appSettings = require("application-settings");
import { Auth0Lock } from "nativescript-auth0";
var frameModule = require("ui/frame");

let auth0: Auth0Lock;

exports.onPageLoaded = function (args) {
    var page = args.object;
    auth0 = new Auth0Lock('q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp','nativescript.auth0.com');

    //Check to see if the user is logged in
    if(!appSettings.hasKey("auth0Token")){
        doLogin();
    }else{
        /*
        //Deserialzise the saved user
        var tokenData = JSON.parse(appSettings.getString("auth0Token"));
        
        //Check if it's expired
        if(auth0.isTokenExpired(tokenData.idToken)){
            //Make them log in again
            doLogin();
        }else{
            //All good, navigate to your start page
            goToHome();
        }
        */
    }
}

function doLogin(){
    auth0.show().then((args) => {
        goToHome();
    }, function (error) {
        alert(error);
    });
}

function goToHome(){
    frameModule.topmost().navigate(
    { 
        moduleName: "home",
        transition: {
            name: "fade",
            duration: 380,
            curve: "easeIn"
        },
        clearHistory: true //Dont want the user to nav back to login
    });
}