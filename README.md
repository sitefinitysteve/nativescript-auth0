# Nativescript Auth0 
<img src="https://cdn.auth0.com/styleguide/latest/lib/logos/img/logo-grey.png" alt="Drawing" style="width: 200px;"/>

[Auth0](https://auth0.com) is the only social login provider for Nativescript that allows you to choose around [50 providers](https://auth0.com/docs/identityproviders) to log in with.

The very clear benifet of the system is you configure and select which providers you want in the Auth0 backend and the plugin will dynamically load them in.  This cuts down on the plugin code and the amount of cocoapods or gradle dependancies you need to use\compile.

Auth0 won't even cost you anuthing until you need over 7000 active users! 
[Pricing page](https://auth0.com/pricing)

I wont even touch on analytics, logging, webtasks, go browse them [here](https://auth0.com/why-auth0) when you get a chance

## Installation

``` terminal
tns plugin add nativescript-auth0
```

### iOS

Add this to your info.plist somewhere 

``` xml
<key>Auth0ClientId</key>
	<string>myclientid</string>
	<key>Auth0Domain</key>
	<string>mydomain.auth0.com</string>
	 <key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleTypeRole</key>
			<string>None</string>
			<key>CFBundleURLName</key>
			<string>auth0</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>a0myclientid</string>
			</array>
		</dict>
	</array>
  ```
  [Sample from demo](https://github.com/sitefinitysteve/nativescript-auth0/blob/master/demo/app/App_Resources/iOS/Info.plist#L46-L62)

### Android

Add this to your AndroidManifest.xml

``` xml
<!--Auth0 Lock-->
      <activity
          android:name="com.auth0.android.lock.LockActivity"
          android:label="Classic Lock"
          android:launchMode="singleTask"
          android:screenOrientation="portrait"
          android:theme="@style/Lock.Theme">
          <intent-filter>
              <action android:name="android.intent.action.VIEW" />

              <category android:name="android.intent.category.DEFAULT" />
              <category android:name="android.intent.category.BROWSABLE" />

              <data
                  android:host="nativescript.auth0.com"
                  android:pathPrefix="/android/__PACKAGE__/callback"
                  android:scheme="https" />
          </intent-filter>
      </activity>
      <!--Auth0 Lock End-->

  <!--Auth0 Lock Embedded WebView-->
      <activity
          android:name="com.auth0.android.provider.WebAuthActivity" />
      <!--Auth0 Lock Embedded WebView End-->
```
[Sample from demo](https://github.com/sitefinitysteve/nativescript-auth0/blob/master/demo/app/App_Resources/Android/AndroidManifest.xml#L39-L63)

## Usage

Initalize at the top of your view

``` js
import { Auth0Lock } from "nativescript-auth0";
```

Create your lock object, I like to do this in a [shared helper or something](https://github.com/sitefinitysteve/nativescript-auth0/blob/master/demo/app/scripts/helpers.ts#L4)
``` js
  var lock = new Auth0Lock({
        clientId: '<your clientid>',
        domain:'<your domain>'
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

## Version Notes

### 3.0

Total rewrite, hey, but it works!  Per semvar incrimenting major version as there's breaking changes.  However the bonus of this is you no longer need app.js initaliation code.