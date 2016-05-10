package com.tns;

@JavaScriptImplementation(javaScriptFile = "app/tns_modules/ui/frame/frame.js")
public class NativeScriptActivity extends android.app.Activity implements com.tns.NativeScriptHashCodeProvider {

	// AUTH0 START
	private android.support.v4.content.LocalBroadcastManager broadcastManager;
	// AUTH0 END

	public NativeScriptActivity(){
		super();
		com.tns.Platform.initInstance(this);
	}

	protected void onCreate(android.os.Bundle param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Platform.callJSMethod(this, "onCreate", void.class, args);

		// AUTH0 START
			broadcastManager = android.support.v4.content.LocalBroadcastManager.getInstance(this);
			broadcastManager.registerReceiver(authenticationReceiver, new android.content.IntentFilter(com.auth0.lock.Lock.AUTHENTICATION_ACTION));
			System.out.println("AUTH0DEBUG: CREATED authenticationReceiver");
			System.out.println(authenticationReceiver);
			System.out.println("AUTH0DEBUG: DONE authenticationReceiver");
		// AUTH0 END
	}

	public void onCreate(android.os.Bundle param_0, android.os.PersistableBundle param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Platform.callJSMethod(this, "onCreate", void.class, args);

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

	public void onSaveInstanceState(android.os.Bundle param_0, android.os.PersistableBundle param_1)  {
		java.lang.Object[] params = new Object[2];
		params[0] = param_0;
		params[1] = param_1;
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

	protected void onDestroy()  {
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

	// AUTH0 START
	private android.content.BroadcastReceiver authenticationReceiver = new android.content.BroadcastReceiver() {
	    public void onReceive(android.content.Context context, android.content.Intent intent) {
	        com.auth0.core.UserProfile profile = intent.getParcelableExtra("profile");
	        com.auth0.core.Token token = intent.getParcelableExtra("token");
	        System.out.println("AUTH0DEBUG: LOGGED IN");
	    }
	};
	// AUTH0 END

}
