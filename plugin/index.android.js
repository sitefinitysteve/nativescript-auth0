var appSettings = require("application-settings");
var util = require("utils/utils");
var appModule = require("application");
var common = require("./common");

var localResolve;

exports.initalize = function () {
    appModule.android.registerBroadcastReceiver(new android.content.IntentFilter(com.auth0.lock.Lock.AUTHENTICATION_ACTION), recieverCallback);
}

exports.show = function(page) {
	return new Promise(function (resolve, reject) {
        try
        {
            localResolve = resolve;
            var context = util.ad.getApplicationContext();
            var lockIntent = new android.content.Intent(appModule.android.foregroundActivity, com.auth0.lock.LockActivity.class);
            
            if (lockIntent.resolveActivity(context.getPackageManager()) != null) {
                appModule.android.foregroundActivity.startActivity(lockIntent);	
            }
            
        }
        catch(args){
            reject(args);
        }
	});
}

function recieverCallback(context, intent){
        debugger;
        var profile = intent.getParcelableExtra("profile");
        var token = intent.getParcelableExtra("token");
        
        localResolve({
            profile: profile,
            token: token
        })
}