package com.tns;

@JavaScriptImplementation(javaScriptFile = "app/tns_modules/ui/frme/frame.js")
public class NativeScriptActivity extends android.app.Activity implements com.tns.NativeScriptHashCodeProvider {
    private android.support.v4.content.LocalBroadcastManager broadcastManager;
    
    public NativeScriptActivity()
    {
        com.tns.Platform.initInstance(this);
    }

    protected void onCreate(android.os.Bundle savedInstanceState) {
        java.lang.Object[] params = new Object[1];
        params[0] = savedInstanceState;
        com.tns.Platform.callJSMethod(this, "onCreate", void.class, params);

        // AUTH0 START
        broadcastManager = android.support.v4.content.LocalBroadcastManager.getInstance(this);
        broadcastManager.registerReceiver(authenticationReceiver, new android.content.IntentFilter(com.auth0.lock.Lock.AUTHENTICATION_ACTION));
        System.out.println("AUTH0DEBUG: CREATED authenticationReceiver");
        System.out.println(authenticationReceiver);
        System.out.println("AUTH0DEBUG: DONE authenticationReceiver");
        // AUTH0 END
    }

    protected void onSaveInstanceState(android.os.Bundle outState) {
        java.lang.Object[] params = new Object[1];
        params[0] = outState;
        com.tns.Platform.callJSMethod(this, "onSaveInstanceState", void.class, params);
    }

    protected void onStart() {
        java.lang.Object[] params = null;
        com.tns.Platform.callJSMethod(this, "onStart", void.class, params);
    }

    protected void onStop() {
        java.lang.Object[] params = null;
        com.tns.Platform.callJSMethod(this, "onStop", void.class, params);
    }

    protected void onDestroy() {
        java.lang.Object[] params = null;
        com.tns.Platform.callJSMethod(this, "onDestroy", void.class, params);
        
        // AUTH0 START
        broadcastManager.unregisterReceiver(authenticationReceiver);
        // AUTH0 END
    }

    public void onBackPressed() {
        java.lang.Object[] params = null;
        com.tns.Platform.callJSMethod(this, "onBackPressed", void.class, params);
    }

    protected void onActivityResult(int requestCode, int resultCode, android.content.Intent data) {
        java.lang.Object[] params = new Object[3];
        params[0] = requestCode;
        params[1] = resultCode;
        params[2] = data;
        com.tns.Platform.callJSMethod(this, "onActivityResult", void.class, params);
    }

    public boolean equals__super(java.lang.Object other) {
        return super.equals(other);
    }
    public int hashCode__super() {
        return super.hashCode();
    }
    
    private android.content.BroadcastReceiver authenticationReceiver = new android.content.BroadcastReceiver() {
        public void onReceive(android.content.Context context, android.content.Intent intent) {
            com.auth0.core.UserProfile profile = intent.getParcelableExtra("profile");
            com.auth0.core.Token token = intent.getParcelableExtra("token");
            System.out.println("AUTH0DEBUG: LOGGED IN");
        }
   };

}
