# Auth0 Social Plugin for the NativeScript framework (POC)

## Setup
- Login to your auth0 account, get your domain\clientid info
- Make sure you have an allowed callback url per the [docs](https://auth0.com/docs/quickstart/native-mobile/ios-objc/aspnet-webapi#before-starting)

## iOS

Add the plugin
```
var auth0 = require("nativescript-auth0");
```

Open the login screen, returns a Promise
```
auth0.show(page).then(function(args){
		console.log(args.profile);
		console.log(args.token);
	});
```
Open the plist.Info
- Replace DOMAIN-GOES-HERE with your auth0 domain
- Replace CLIENTID-GOES-HERE with your auth0 clientId, note the URLScheme needs an a0 prefix, find replace should just work.

## Android

This won't work yet until {N} can support impliments on the application

[Auth0 Sample](https://auth0.com/docs/quickstart/native-mobile/android/aspnet-webapi#3-initialize-lock)

[Git Issue #283](https://github.com/NativeScript/android-runtime/issues/283)