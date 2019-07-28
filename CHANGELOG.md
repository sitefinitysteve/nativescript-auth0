
## Version Notes

### 3.0.1

fix(common): UserInfo incorrect JSON serialization

### 3.0.0

feat: Update to NativeScript 6.0 with AndroidX

BREAKING CHANGE: NativeScript 6.0 required due to AndroidX support

### 2.1.2

fix(android): Browser not opening on Xiaomi device
fix(style): Fixed tslint errors

### 2.1.1

Fix crash related to null foregroundActivity
Fix errors on android not building properly
Fix user cancel on android not raising error

### 2.1.0

Remove use of a large pod and replace with a small Objective-C file
Update readme

### 2.0.4

Fix bugged iOS version comparsion causing SafariAuthenticationSession to not be used.

### 2.0.3

Fix crash occuring on devices running older than Android 6.0

### 2.0.2

Fix Web Authentication flow on Android returning Credentials object with idToken and accessToken mixed around
Fix JSON serialization for Credentials, DatabaseUser, and UserInfo objects 

### 2.0.1

Fix publish

### 2.0.0

Rewrite to using Auth0 Universal Login

### 1.2.7

Merged in some PRs, NG2 demo, audience property

### 1.2.6

Update to android lock v2

### 1.2.3

Bug fixes

### 1.2.0

Updated API to Auth0 v2 Swift on iOS

### 1.0.0

Total rewrite, hey, but it works!  Per semvar incrimenting major version as there's breaking changes.  However the bonus of this is you no longer need app.js initaliation code.