var appSettings = require("application-settings");
var util = require("utils/utils");
var application = require("application");
var common = require("./common");

var localResolve;
var reciever;

exports.initalize = function () {
    //Stub to maintain platform compatability
    application.on("activityResult", function(args){
       debugger; 
    });
}

exports.show = function(page) {
	return new Promise(function (resolve, reject) {
        try
        {
            localResolve = resolve;
            
            var context = util.ad.getApplicationContext();
            var lockIntent = global.auth0._lock.newIntent(global.auth0);
            
            if (lockIntent.resolveActivity(context.getPackageManager()) != null) {
                application.android.foregroundActivity.startActivity(lockIntent);	
            }
        }
        catch(args){
            reject(args);
        }
	});
}
