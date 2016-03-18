var createViewModel = require("./main-view-model").createViewModel;
var auth0 = require("nativescript-auth0");


function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
    
    auth0.show().then(function(args){
        console.log(args.profile);
        console.log(args.token);
    });
}

exports.onNavigatingTo = onNavigatingTo;