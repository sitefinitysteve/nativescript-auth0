var appSettings = require("application-settings");
var frameModule = require("ui/frame");
var colorModule = require("color");
var dialogs = require("ui/dialogs");
var theme = null;

exports.show = function() {
	return new Promise(function (resolve, reject) {
		if(global.a0lock){
			try
			{
				var page = frameModule.topmost().ios.controller;
				
				if(theme !== null){
					A0Theme.sharedInstance().registerTheme(theme);
				}
				
				var controller = global.a0lock.newLockViewController();
				controller.onAuthenticationBlock = function(profile, token){
					//Save profile
					var profileData = saveProfile(profile);

					//Save token
					var tokenData = saveToken(token);

					page.dismissViewControllerAnimatedCompletion(true, null);
					
					resolve({
						"profile": profileData,
						"token": tokenData
						});
						
				}			
				page.presentViewControllerAnimatedCompletion(controller, true, null);
			}
			catch(args){
				reject(args);
				console.log(args.message + " : " + args.soureURL);
			}
		}
	});
}

// Pass in the tokenId string, returns a new token object
exports.refreshTokenWithId = function(tokenId){
	return new Promise(function (resolve, reject) {
		if(tokenId != "undefined" && tokenId != null){
			A0APIClient.sharedClient().fetchNewIdTokenWithIdTokenParametersSuccessFailure(tokenId, null,
			function(newToken){
				//Success
				resolve(saveToken(newToken));
			},
			function(args){
				//Failure;
				reject(args);
			});
		}else{
			reject("Token is undefined");
		}
	});
}

exports.refreshTokenWithRefreshToken = function(refreshId){
	return new Promise(function (resolve, reject) {
		if(refreshId != "undefined" && refreshId != null){
			A0APIClient.sharedClient().fetchNewIdTokenWithRefreshTokenParametersSuccessFailure(refreshId, null,
			function(newToken){
				//Success
				resolve(saveToken(newToken));
			},
			function(args){
				//Failure;
				reject(args);
			});
		}else{
			reject("Token is undefined");
		}
	});
}

//https://auth0.com/docs/libraries/lock-ios/sending-authentication-parameters
exports.addParameter = function(key, value){
	return new Promise(function (resolve, reject) {
		if((key != "undefined" && key != null) && (value != "undefined" && value != null)){
			//Add Param
			var params = A0AuthParameters.newDefaultParams();
			params.setValueForKey(key, value);
			resolve({
				params: params,
				status: true
			});
		}else{
			reject(
				{
					status: false,
					message: "key or value is undefined"
				}
			);
		}
	});
}

//https://auth0.com/docs/libraries/lock-ios/sending-authentication-parameters
exports.addScopeParameter = function(scope){
	return new Promise(function (resolve, reject) {
		if(scope != "undefined" && scope != null) {
			//Add Param
			var params = A0AuthParameters.newDefaultParams();
			params.state = scope;
			
			resolve({
				params: params,
				status: true
			});
		}else{
			reject(
				{
					status: false,
					message: "key or value is undefined"
				}
			);
		}
	});
}


//https://auth0.com/docs/libraries/lock-ios/customization
exports.themePrimaryButton = function(normalColor, highlightColor, textColor, font){
	registerThemeColor(normalColor, "A0ThemePrimaryButtonNormalColor");
	registerThemeColor(highlightColor, "A0ThemePrimaryButtonHighlightedColor");
	registerThemeColor(textColor, "A0ThemePrimaryButtonTextColor");
	
	registerFont(font, "A0ThemePrimaryButtonFont");
}

exports.themeSecondaryButton = function(backgroundColor, textColor, font, normalImage, highlightedImage){
	registerThemeColor(backgroundColor, "A0ThemeSecondaryButtonBackgroundColor");
	registerThemeColor(textColor, "A0ThemeSecondaryButtonTextColor");
	
	registerFont(font, "A0ThemeSecondaryButtonFont");
	
	registerImage(normalImage, "A0ThemeSecondaryButtonNormalImageName");
	registerImage(highlightedImage, "A0ThemeSecondaryButtonHighlightedImageName");
}

exports.themeTextField = function(textColor, placeholderTextColor, iconColor, font){
	registerThemeColor(textColor, "A0ThemeTextFieldTextColor");
	registerThemeColor(placeholderTextColor, "A0ThemeTextFieldPlaceholderTextColor");
	registerThemeColor(iconColor, "A0ThemeTextFieldIconColor");
	
	registerFont(font, "A0ThemeTextFieldFont");
}

exports.themeTitle = function(textColor, font){
	registerThemeColor(textColor, "A0ThemeTitleTextColor");
	
	registerFont(font, "A0ThemeTitleFont");
}

exports.themeIcon = function(backgroundColor, imageName){
	registerThemeColor(backgroundColor, "A0ThemeIconBackgroundColor");
	
	registerImage(imageName, "A0ThemeIconImageName");
}

exports.themeBackground = function(backgroundColor, imageName){
	registerThemeColor(backgroundColor, "A0ThemeScreenBackgroundColor");
	
	registerImage(imageName, "A0ThemeScreenBackgroundImageName");
}

exports.themeDescription = function(textColor, font){
	registerThemeColor(textColor, "A0ThemeDescriptionTextColor");
	
	registerFont(font, "A0ThemeDescriptionFont");
}

exports.themeSeperator = function(textColor, font){
	registerThemeColor(textColor, "A0ThemeSeparatorTextColor");
	
	registerFont(font, "A0ThemeSeparatorTextFont");
}

exports.themeCredentialBox = function(borderColor, separatorColor, backgroundColor){
	registerThemeColor(borderColor, "A0ThemeCredentialBoxBorderColor");
	registerThemeColor(separatorColor, "A0ThemeCredentialBoxSeparatorColor");
	registerThemeColor(backgroundColor, "A0ThemeCredentialBoxBackgroundColor");
}

exports.themeCloseButton = function(tintColor){
	registerThemeColor(tintColor, "A0ThemeCloseButtonTintColor");
}



function registerThemeColor(color, key){
	if(color != "undefined" && color !== null){
		if(theme === null){
			theme = new A0Theme();
		}
		
		theme.registerColorForKey(new colorModule.Color(color).ios, key);
	}
}

function registerImage(name, key){
	if(name != "undefined" && name !== null){
		if(theme === null){
			theme = new A0Theme();
		}

		var bundle = NSBundle.mainBundle();
		theme.registerImageWithNameBundleForKey(name, bundle, key);
	}
}

function registerFont(font, key){
	if(font != "undefined" && font !== null){
		if(theme === null){
			theme = new A0Theme();
		}
		
		theme.registerFont(font, key);
	}
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
	
	return userData;
}

function saveToken(token){
	var tokenData = {
		accessToken: token.accessToken,
		idToken: token.idToken,
		refreshToken: token.refreshToken,
		tokenType: token.tokenType	
	};

	return tokenData;
}