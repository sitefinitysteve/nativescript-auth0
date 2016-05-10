package com.tns;

import android.app.Application;

@JavaScriptImplementation(javaScriptFile = "app/tns_modules/application/application.js")
public class NativeScriptApplication extends android.app.Application implements com.tns.NativeScriptHashCodeProvider,
 com.auth0.lock.LockProvider {  // AUTH0 INTERFACE
private static NativeScriptApplication thiz;
	// AUTH0 START
  private com.auth0.lock.Lock lock;
	// AUTH0 END

    public NativeScriptApplication() {
        thiz = this;
    }

	// AUTH0 START
	public com.auth0.lock.Lock getLock() {
		System.out.println("AUTH0DEBUG: Getting Lock instance");
    return lock;
  }
	// AUTH0 END

	public void onCreate()  {
		new RuntimeHelper(this).initRuntime();
		if (Platform.isInitialized()) {
	        java.lang.Object[] params = null;
	        com.tns.Platform.callJSMethod(this, "onCreate", void.class, params);
		} else {
			super.onCreate();
		}

		// AUTH0 START
		System.out.println("AUTH0DEBUG: Initializing Lock instance");
		lock = new com.auth0.lock.Lock.Builder()
        .loadFromApplication(this)
        /** Other configuration goes here */
        .closable(true)
        .build();
		// AUTH0 END
	}

    public void onLowMemory() {
    	if (Platform.isInitialized()) {
	        java.lang.Object[] params = null;
	        com.tns.Platform.callJSMethod(this, "onLowMemory", void.class, params);
    	} else {
    		super.onLowMemory();
    	}
    }
	
    public void onTrimMemory(int level) {
    	if (Platform.isInitialized()) {
	        java.lang.Object[] params = new Object[1];
	        params[0] = level;
	        com.tns.Platform.callJSMethod(this, "onTrimMemory", void.class, params);
    	} else {
    		super.onTrimMemory(level);
    	}
    }

	public boolean equals__super(java.lang.Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

    public static Application getInstance() {
        return thiz;
    }
}
