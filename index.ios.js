var appSettings = require("application-settings");
var frameModule = require("ui/frame");
var colorModule = require("color");
var theme = null;

exports.show = function() {
	return new Promise(function (resolve, reject) {
		if(global.a0lock){
			try
			{
				var page = frameModule.topmost().ios.controller;
				debugger;
				
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

//https://auth0.com/docs/libraries/lock-ios/customization
exports.themePrimaryButton = function(normalColor, highlightColor, textColor){
	registerThemeColor(normalColor, "A0ThemePrimaryButtonNormalColor");
	registerThemeColor(highlightColor, "A0ThemePrimaryButtonHighlightedColor");
	registerThemeColor(textColor, "A0ThemePrimaryButtonTextColor");
}

exports.themeSecondaryButton = function(backgroundColor, textColor){
	registerThemeColor(backgroundColor, "A0ThemeSecondaryButtonBackgroundColor");
	registerThemeColor(textColor, "A0ThemeSecondaryButtonTextColor");
}

exports.themeTextField = function(textColor, placeholderTextColor, iconColor){
	registerThemeColor(textColor, "A0ThemeTextFieldTextColor");
	registerThemeColor(placeholderTextColor, "A0ThemeTextFieldPlaceholderTextColor");
	registerThemeColor(iconColor, "A0ThemeTextFieldIconColor");
}

exports.themeTitle = function(textColor){
	registerThemeColor(textColor, "A0ThemeTitleTextColor");
}

exports.themeIcon = function(backgroundColor){
	registerThemeColor(backgroundColor, "A0ThemeIconBackgroundColor");
}

exports.themeBackground = function(backgroundColor){
	registerThemeColor(backgroundColor, "A0ThemeScreenBackgroundColor");
}

exports.themeDescription = function(textColor){
	registerThemeColor(textColor, "A0ThemeDescriptionTextColor");
}

exports.themeSeperator = function(textColor){
	registerThemeColor(textColor, "A0ThemeSeparatorTextColor");
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
	if(theme === null){
		theme = new A0Theme();
	}
	
	theme.registerColorForKey(new colorModule.Color(color).ios, key);
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