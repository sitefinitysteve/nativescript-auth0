import * as appSettings from "application-settings";
import * as frameModule from "ui/frame";
import * as observableModule from "data/observable";
var init = false;
var auth0Tokens = {};

declare var JSON: any;

exports.onPageLoaded = function (args) {
    var page = args.object;
    console.log("Home page");

    var source = new observableModule.Observable();
    console.dump(global.auth0.credentials);
    source = global.auth0.credentials;
    page.bindingContext = source;
}

exports.onLogout = function (args) {
    console.log("Logout");
    appSettings.remove("auth0Tokens");
        
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