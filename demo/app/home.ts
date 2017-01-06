var appSettings = require("application-settings");
var frameModule = require("ui/frame");
var init = false;
var userData = {};

declare var JSON: any;

exports.onPageLoaded = function (args) {
    var page = args.object;
    
    if(!init){
        userData = JSON.parse(appSettings.getString("auth0UserData"));
        init = true;
    }
    
    page.bindingContext = userData;
}

exports.onLogout = function (args) {
    appSettings.remove("auth0Token");
    appSettings.remove("auth0UserData");
        
    frameModule.topmost().navigate(
    { 
        moduleName: "login",
        transition: {
            name: "fade",
            duration: 380,
            curve: "easeIn"
        },
        clearHistory: true //Dont want the user to nav back to home
    });
}