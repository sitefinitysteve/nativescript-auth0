# Auth0 Social Authentication Plugin for NativeScript

[Auth0: Identity made simple for developers](https://auth0.com)

## Setup
- Login to your auth0 account, get your domain\clientid info
- Setup the allowed providers, what you pick here is what AUTOMATICALLY shows up on the login box (so cool and easy)
- Make sure you have an allowed callback url per the [docs](https://auth0.com/docs/quickstart/native-mobile/ios-objc/aspnet-webapi#before-starting)

## iOS
Initalize on load in app.js
```
if (application.ios) {
    var __extends = this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        __.prototype = b.prototype;
        d.prototype = new __();
    };
    
    var appDelegate = (function (_super) {
        __extends(appDelegate, _super);
        function appDelegate() {
            _super.apply(this, arguments);
        }
        
        appDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
            global.a0lock = new A0Lock();
            
        };
        
        appDelegate.ObjCProtocols = [UIApplicationDelegate];
        return appDelegate;
    })(UIResponder);
    application.ios.delegate = appDelegate;
}
```

In your login script reference the plugin
```
var auth0 = require("nativescript-auth0");
```

This is how you open the login screen, returns a Promise
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

## Styling

Auth0 lets you customize a lot about the widget, I've wrapped them into some helpers.  
* Pass the colors as Hex codes, convert to UIColor on iOS
* Image the name of the image
* Font string... I haven't tested yet, on iOS is a UIFont
* Call these before your calling show


```
auth0.themePrimaryButton(normalColor, highlightColor, textColor, font);
auth0.themeSecondaryButton(backgroundColor, textColor, font, normalImage, highlightedImage);
auth0.themeTextField(textColor, placeholderTextColor, iconColor, font);
auth0.themeTitle(textColor, font);
auth0.themeIcon(backgroundColor, imageName);
auth0.themeBackground(backgroundColor, imageName);
auth0.themeDescription(textColor, font);
auth0.themeSeperator(textColor, font);
auth0.themeCredentialBox(borderColor, separatorColor, backgroundColor);
auth0.themeCloseButton(tintColor);
```

## Parameters
[Documentation](https://auth0.com/docs/libraries/lock-ios/sending-authentication-parameters)
```
auth0.addParameter("foo", "bar").then(function(args){
        console.log(args);    
    });
```

```
auth0.addScopeParameter("login").then(function(args){
        console.log(args);    
    });
```

## TODO
* Custom Login
* Token Helpers, store in Keychain