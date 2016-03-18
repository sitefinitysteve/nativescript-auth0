var appSettings = require("application-settings");
var frameModule = require("ui/frame");

exports.onPageLoaded = function (args) {
    var page = args.object;
    debugger;
    var userData = JSON.parse(appSettings.getString("UserData"));
    page.bindingContext = userData;
}

exports.onLogout = function (args) {
    appSettings.remove("UserData");
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