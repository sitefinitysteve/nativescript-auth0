package com.tns;

@com.tns.JavaScriptImplementation(javaScriptFile = "./tns_modules/ui/frame/frame.js")
public class NativeScriptActivity extends android.app.Activity implements com.tns.NativeScriptHashCodeProvider {

	// AUTH0 START
	private android.support.v4.content.LocalBroadcastManager broadcastManager;
	// AUTH0 END

	public NativeScriptActivity(){
		super();
		com.tns.Runtime.initInstance(this);
	}

	protected void onCreate(android.os.Bundle param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onCreate", void.class, args);

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
		com.tns.Runtime.callJSMethod(this, "onCreate", void.class, args);

		// AUTH0 START
			broadcastManager = android.support.v4.content.LocalBroadcastManager.getInstance(this);
			broadcastManager.registerReceiver(authenticationReceiver, new android.content.IntentFilter(com.auth0.lock.Lock.AUTHENTICATION_ACTION));
			System.out.println("AUTH0DEBUG: CREATED authenticationReceiver");
			System.out.println(authenticationReceiver);
			System.out.println("AUTH0DEBUG: DONE authenticationReceiver");
		// AUTH0 END
	}

	protected void onSaveInstanceState(android.os.Bundle param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onSaveInstanceState", void.class, args);
	}

	public void onSaveInstanceState(android.os.Bundle param_0, android.os.PersistableBundle param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onSaveInstanceState", void.class, args);
	}

	protected void onStart()  {
		java.lang.Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onStart", void.class, args);
	}

	protected void onStop()  {
		java.lang.Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onStop", void.class, args);
	}

	protected void onDestroy()  {
		java.lang.Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onDestroy", void.class, args);

		// AUTH0 START
			broadcastManager.unregisterReceiver(authenticationReceiver);
		// AUTH0 END
	}

	public void onBackPressed()  {
		java.lang.Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onBackPressed", void.class, args);
	}

	protected void onActivityResult(int param_0, int param_1, android.content.Intent param_2)  {
		java.lang.Object[] args = new java.lang.Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "onActivityResult", void.class, args);
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
