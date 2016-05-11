var appSettings = require("application-settings");
var util = require("utils/utils");
var appModule = require("application");
var common = require("./common");

exports.show = function(page) {
	return new Promise(function (resolve, reject) {
        try
        {
            var context = util.ad.getApplicationContext();
            var lockIntent = new android.content.Intent(appModule.android.foregroundActivity, com.auth0.lock.LockActivity.class);
            if (lockIntent.resolveActivity(context.getPackageManager()) != null) {
                appModule.android.onActivityResult = function(requestCode, resultCode, data) {
                    debugger;
                    console.log(requestCode);
                    console.log(resultCode);
                    console.log(data);
                }
                
                
                appModule.android.foregroundActivity.startActivity(lockIntent);	
            }
            
        }
        catch(args){
            reject(args);
        }
	});
}
