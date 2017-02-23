# Nativescript Auth0 

## Installation
``` terminal
  tns plugin add nativescript-auth0
```

### iOS
Add this to your info.plist somewhere 
``` xml
<key>Auth0ClientId</key>
	<string>q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp</string>
	<key>Auth0Domain</key>
	<string>nativescript.auth0.com</string>
	 <key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleTypeRole</key>
			<string>None</string>
			<key>CFBundleURLName</key>
			<string>auth0</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>a0q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp</string>
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