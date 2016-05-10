# Demo - Auth0 Social Authentication Plugin for NativeScript

## Setup (Android)

* Navigate to the `demo` folder and run once `tns run android` to generate the `platforms/android` files.

* Update the `app/App_Resources/Android/AndroidManifest.xml` with your **Auth0** application/account information.

```xml
<!--Auth0 Lock-->
<activity
android:name="com.auth0.lock.LockActivity"
android:theme="@style/Lock.Theme"
android:screenOrientation="portrait"
android:launchMode="singleTask">
<intent-filter>
    <action android:name="android.intent.action.VIEW"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <category android:name="android.intent.category.BROWSABLE"/>
		<!-- CLIENTID SCHEME IN LOWERCASE !!! -->
    <!-- KEEP THE 'a0' AT THE BEGINNING !!! -->
    <data android:scheme="a0clientid" android:host="DOMAIN.auth0.com"/>
		<!-- DOMAIN AS IN YOUR AUTH0 APPLICATION DASHBOARD !!! -->
</intent-filter>
</activity>

<!-- CLIENTID SCHEME AS IN YOUR AUTH0 APPLICATION DASHBOARD !!! -->
<meta-data android:name="com.auth0.lock.client-id" android:value="CLIENTID"/>
<!-- DOMAIN AS IN YOUR AUTH0 APPLICATION DASHBOARD !!! -->
<meta-data android:name="com.auth0.lock.domain-url" android:value="DOMAIN.auth0.com"/>
```

* Copy the 2 java files from `./plugin/platforms/android` to the `platforms/android/src/main/java/com/tns/` replacing the existing ones.

> The _demo_ uses the relative _plugin_ folder as a dependency. In that case, the path in which you should search the files is `../plugin/nativescript-auth0/platforms/android`.

* Open an emulator, like _Genymotion_.

* Run again `tns run android`


More information about [Auth0](https://auth0.com) and [Lock](https://auth0.com/lock)
