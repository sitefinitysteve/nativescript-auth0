var appSettings = require("application-settings");
var util = require("utils/utils");
var appModule = require("application");

exports.show = function(page) {
	return new Promise(function (resolve, reject) {
		if(global.a0lock){
			try
			{

				var context = util.ad.getApplicationContext();
				var lockIntent = new android.content.Intent(appModule.android.foregroundActivity, com.auth0.lock.LockActivity.class);
				if (lockIntent.resolveActivity(context.getPackageManager()) != null) {
					debugger;
					appModule.android.foregroundActivity.startActivity(lockIntent);	
				}
				
			}
			catch(args){
				reject(args);
				debugger;
			}
		}
	});
}


function saveProfile(profile){
	var userData = {
		name: profile.name,
		nickname: profile.nickname,
		userId: profile.userId,
		email: profile.email,
		createdAt: profile.createdAt,
		avatarUrl: profile.picture.absoluteURL.absoluteString,
		extraInfo: [],
		identities: []
	};
	
	for(var i = 0; i < profile.extraInfo.allKeys.count; i++){
		var data = {
			"key" : profile.extraInfo.allKeys[i],
			"value" : profile.extraInfo.allValues[i] 
		};
		userData.extraInfo.push(data);
	}
	
	for(var i = 0; i < profile.identities.count; i++){
		var data = {
			accessToken : profile.identities[i].accessToken,
			connection : profile.identities[i].connection,
			identityId: profile.identities[i].identityId,
			provider: profile.identities[i].provider,
			social:profile.identities[i].social,
			userId: profile.identities[i].userId
		};
		userData.identities.push(data);
	}
	
	appSettings.setString("auth0UserData", JSON.stringify(userData));
	console.log(JSON.stringify(userData));
	return userData;
}

function saveToken(token){
	var tokenData = {
		accessToken: token.accessToken,
		idToken: token.idToken,
		refreshToken: token.refreshToken,
		tokenType: token.tokenType	
	};
	
	appSettings.setString("auth0Token", JSON.stringify(tokenData));
	console.log(JSON.stringify(tokenData));
	return tokenData;
}