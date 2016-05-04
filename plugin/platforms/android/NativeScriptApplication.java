package com.tns;

@com.tns.JavaScriptImplementation(javaScriptFile = "./tns_modules/application/application.js")
public class NativeScriptApplication extends android.app.Application implements com.tns.NativeScriptHashCodeProvider,
 com.auth0.lock.LockProvider {  // AUTH0 INTERFACE
	private static android.app.Application thiz;
	// AUTH0 START
  private com.auth0.lock.Lock lock;
	// AUTH0 END

	public NativeScriptApplication(){
		super();
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
		if (!Runtime.isInitialized()) {
			super.onCreate();
			return;
		}
		java.lang.Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onCreate", void.class, args);

		// AUTH0 START
		System.out.println("AUTH0DEBUG: Initializing Lock instance");
		lock = new com.auth0.lock.Lock.Builder()
        .loadFromApplication(this)
        /** Other configuration goes here */
        .closable(true)
        .build();
		// AUTH0 END
	}

	public void onLowMemory()  {
		if (!Runtime.isInitialized()) {
			super.onLowMemory();
			return;
		}
		java.lang.Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onLowMemory", void.class, args);
	}

	public void onTrimMemory(int param_0)  {
		if (!Runtime.isInitialized()) {
			super.onTrimMemory(param_0);
			return;
		}
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onTrimMemory", void.class, args);
	}

	public boolean equals__super(java.lang.Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

	public static android.app.Application getInstance() {
		return thiz;
	}
}
