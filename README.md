# Auth0 Social Plugin for the NativeScript framework (POC)

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

## Android

This won't work yet until {N} can support impliments on the application

[Auth0 Sample](https://auth0.com/docs/quickstart/native-mobile/android/aspnet-webapi#3-initialize-lock)

[Git Issue #283](https://github.com/NativeScript/android-runtime/issues/283)