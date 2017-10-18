# Nativescript Auth0Lock

[Auth0](https://auth0.com) is a social login provider for Nativescript allowing you to choose between [50 different providers](https://auth0.com/docs/identityproviders).  Use the Auth0 portal to select and configure the providers you would like to make available in your NativeScript application. The Auth0 NativeScript plugin will dynamically load your chosen providers into your application.

The dynamically loading feature reduces the amount of dependencies you’ll have in your application. You also don’t have to worry about loading and managing Cocoapods or Android Jars specific to each implementation.

Auth0 is a freemium service. The free tier supports up to 7,000 active users. [Auth0 paid service levels](https://auth0.com/pricing) are very reasonable.

In addition to managing many login providers, Auth0 also has solutions for application analytics, logging, web tasks and more. [Take a look at all of the Auth0 features](https://auth0.com/why-auth0) and services.


## Installation

``` terminal
tns plugin add nativescript-auth0
```

OPTIONAL: Add this to your references.d.ts (if you use typescript)
``` xml
/// <reference path="./node_modules/nativescript-auth0/typings/Auth0.ios.d.ts" />
/// <reference path="./node_modules/nativescript-auth0/typings/Lock.ios.d.ts" />
```

Go to your Auth0.com backend and configure your CallbackUrls, *DO NOT USE THE KEYS IN THE DEMO*
[Configure Callback URLs](https://auth0.com/docs/quickstart/native/ios-swift/00-getting-started#configure-callback-urls)

Syntax should be: {YOURBUNDLEID}://{DOMAIN}.auth0.com/ios/{YOURBUNDLEID}/callback



### iOS

Make a new file called Auth0.plist, add this into it, clearly replacing the temp clientids and domain.  Note to keep a0 infront of the scheme.

[Info.plist](https://github.com/sitefinitysteve/nativescript-auth0/blob/master/demo/app/App_Resources/iOS/Info.plist#L46-L62)
``` xml
<key>CFBundleURLTypes</key>
<array>
	<dict>
		<key>CFBundleTypeRole</key>
		<string>None</string>
		<key>CFBundleURLName</key>
		<string>auth0</string>
		<key>CFBundleURLSchemes</key>
		<array>
			<string>org.nativescript.auth0demo</string>
		</array>
	</dict>
</array>
  ```
  

[Auth0.plist](https://github.com/sitefinitysteve/nativescript-auth0/blob/master/demo/app/App_Resources/iOS/Auth0.plist)
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>ClientId</key>
    <string>q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp</string>
    <key>Domain</key>
    <string>nativescript.auth0.com</string>
  </dict>
</plist>
  ```

  #### Impliement Delegate ####

  [Sample Delegate](https://github.com/sitefinitysteve/nativescript-auth0/blob/master/demo/app/custom-app-delegate.ts)

  [How to initalize it in app.ts](https://github.com/sitefinitysteve/nativescript-auth0/blob/master/demo/app/app.ts#L5-L17)

  

### Android

1. Add `manifestPlaceholders` to `app/App_resources/Android/app.gradle`.

```

defaultConfig {  
    generatedDensities = []
    applicationId = "org.nativescript.app"  
    manifestPlaceholders = [auth0Domain: "yourdomain.auth0.com", auth0Scheme: "https"]
  } 
```

2. Add this to your `AndroidManifest.xml`

``` xml
    <activity
			android:name="com.auth0.android.lock.LockActivity"
			android:label="@string/app_name"
			android:launchMode="singleTask"
			android:screenOrientation="portrait"
			android:theme="@style/MyLock.Theme"/>
```
[Sample from demo](https://github.com/sitefinitysteve/nativescript-auth0/blob/master/demo/app/App_Resources/Android/AndroidManifest.xml#L39-L63)


3. Add this to `app/App_resouces/Android/values/styles.xml`

``` xml
<style name="MyLock.Theme" parent="Lock.Theme" />
```


## Usage

Initalize at the top of your view

``` js
import { Auth0Lock } from "nativescript-auth0";
```

Create your lock object, I like to do this in a [shared helper or something](https://github.com/sitefinitysteve/nativescript-auth0/blob/master/demo/app/scripts/helpers.ts#L4)
``` js
  var lock = new Auth0Lock({
        clientId: '<your clientid>',
        domain:'<your domain>',
        audience: '<your-auth0-audience>',
        scope: [ 'offline_access', 'openid'] //Optional param, check the auth0 docs
    });
```

Show the lock screen, returns a promise
```js
    /// Promise returns
    /// {
    ///        credentials: {
    ///           accessToken
    ///           idToken
    ///           refreshToken
    ///        },
    ///        ios: {
    ///           profile,
    ///           token
    ///        },
    ///        android: {}
    /// }
    lock.show().then((res) => {
        //goToHomeOrWhatevs(); 
    }, function (error) {
        //console.log(error);
    });
```

## Methods
| Name             | Description                                                                                                   | Docs                                                             | Returns |
|------------------|---------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|--------:|
| refresh()        | reloads the saved credentials from app-settings                                                               |                                                                  |    void |
| hasValidToken()  | Is the token still good, is there a token set, is it expired, couple checks                                   |                                                                  |    bool |
| isTokenExpired() | Decodes the token to check it's expiry                                                                        |                                                                  |    bool |
| clearToken()     | Removes the appsettings key that stores the tokens locally                                                    |                                                                  |    void |
| getUserInfo()    | Returns the current user details, this is an internal http callback to auth0, might want to cache the results | [Link](https://auth0.com/docs/api/authentication#get-user-info)  | Promise |
| getTokenInfo()   | Token details, this is an internal http callback to auth0, might want to cache the results                    | [Link](https://auth0.com/docs/api/authentication#get-token-info) | Promise |


## ISSUES
- iOS: Login success, but iOS says unable to open page and doesn't return you to your app.  Please replace the ${PRODUCT_BUNDLE_IDENTIFIER} in the info.plist with actual bundle ID.


## Version Notes

### 1.2.6

Update to android lock v2

### 1.2.3

Bug fixes

### 1.2.0

Updated API to Auth0 v2 Swift on iOS

### 1.0.0

Total rewrite, hey, but it works!  Per semvar incrimenting major version as there's breaking changes.  However the bonus of this is you no longer need app.js initaliation code.