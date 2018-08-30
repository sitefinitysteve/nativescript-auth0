# Nativescript Auth0Lock

[Auth0](https://auth0.com) is a social login provider for NativeScript allowing you to choose between [50 different providers](https://auth0.com/docs/identityproviders).  Use the Auth0 portal to select and configure the providers you would like to make available in your NativeScript application. The Auth0 NativeScript plugin will dynamically load your chosen providers into your application.

The dynamically loading feature reduces the amount of dependencies you’ll have in your application. You also don’t have to worry about loading and managing Cocoapods or Android Jars specific to each implementation.

Auth0 is a freemium service. The free tier supports up to 7,000 active users. [Auth0 paid service levels](https://auth0.com/pricing) are very reasonable.

In addition to managing many login providers, Auth0 also has solutions for application analytics, logging, web tasks and more. [Take a look at all of the Auth0 features](https://auth0.com/why-auth0) and services.

Requires NativeScript version `^4.2.0`.


## Installation

```terminal
tns plugin add nativescript-auth0
```

Go to your Auth0.com backend and configure your CallbackUrls, *DO NOT USE THE KEYS IN THE DEMO*
[Configure Callback URLs](https://auth0.com/docs/quickstart/native/ios-swift/00-getting-started#configure-callback-urls)

Syntax should be:
```
<!-- iOS -->
{YOUR_BUNDLE_IDENTIFIER}://${YOUR_AUTH0_DOMAIN}/ios/{YOUR_BUNDLE_IDENTIFIER}/callback

<!-- Android -->
https://{YOUR_AUTH0_DOMAIN}/android/{YOUR_APP_PACKAGE_NAME}/callback
```



### iOS

Add this to your Info.plist

[Info.plist](./demo/app/App_Resources/iOS/Info.plist#L46-L58)
```xml
<!-- Info.plist -->

<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>None</string>
        <key>CFBundleURLName</key>
        <string>auth0</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>YOUR_APP_BUNDLE_IDENTIFIER</string>
        </array>
    </dict>
</array>
```


#### Implement Delegate ####

[Sample Delegate](./demo/app/custom-app-delegate.ts)

[How to initalize it in app.ts](./demo/app/app.ts#L3-L13)



### Android

Add this to your AndroidManifest.xml

```xml
        <activity
            android:name="org.nativescript.auth0.RedirectActivity"
            tools:node="replace">
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data
                    android:host="YOUR_AUTH0_DOMAIN"
                    android:pathPrefix="/android/${applicationId}/callback"
                    android:scheme="https" />
            </intent-filter>
        </activity>
```
[Sample from demo](./demo/app/App_Resources/Android/src/AndroidManifest.xml#L44-L60)


## Usage

Import Auth0 in a shared helper or something

```ts
import { Auth0 } from 'nativescript-auth0';
```

Create your Auth0 object
```ts
    this.auth0 = new Auth0('<your clientid>', '<your domain>');
```

Start the web authentication flow, returns a promise
```ts
    /// Promise returns credentials object
    this.auth0.webAuthentication({
        scope: 'openid offline_access'
    }).then((res) => {
        // goToHomeOrWhatevs(); 
    }, (error) => {
        // console.log(error);
    });
```

## Methods
| Name                             | Description                                                                 | Docs                                                                    | Returns              |
|----------------------------------|-----------------------------------------------------------------------------|-------------------------------------------------------------------------|---------------------:|
| webAuthentication(options)       | Starts the web authentication flow to login a user                          | [Link](https://auth0.com/docs/api/authentication#login)                 | Promise\<Credentials> |
| renewCredentials(refreshToken)   | Renews credentials using refresh token                                      | [Link](https://auth0.com/docs/api/authentication#refresh-token)         | Promise\<Credentials> |
| revokeRefreshToken(refreshToken) | Revokes refresh token                                                       | [Link](https://auth0.com/docs/api/authentication#revoke-refresh-token)  |        Promise\<void> |
| getUserInfo(accessToken)         | Returns the current user details, might want to cache the results           | [Link](https://auth0.com/docs/api/authentication#get-user-info)         |    Promise\<UserInfo> |


## ISSUES
- No known issues.
