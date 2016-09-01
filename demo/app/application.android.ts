import * as application from "application";

// the `JavaProxy` decorator specifies the package and the name for the native *.JAVA file generated. 
@JavaProxy("org.myApp.Application")
@Interfaces([com.auth0.lock.LockProvider]) 
class Application extends android.app.Application{
    // AUTH0 START
    private lock: com.auth0.lock.Lock;
	// AUTH0 END

    public onCreate(): void {
        super.onCreate();

        // initialize the modules with the custom application object
        application.android.init(this);

        // Enter custom initialization code here
        		// AUTH0 START
		console.log("AUTH0DEBUG: Initializing Lock instance");
		this.lock = new com.auth0.lock.Lock.Builder()
        .loadFromApplication(this)
        //Other configuration goes here
        .closable(true)
        .build();

        console.dump(this.lock);
		// AUTH0 END
    }

    // AUTH0 START
	public  getLock() : com.auth0.lock.Lock {
		console.log("AUTH0DEBUG: Getting Lock instance");
        return this.lock;
    }
	// AUTH0 END

    protected attachBaseContext(baseContext: android.content.Context) {
        super.attachBaseContext(baseContext);

        // This code enables MultiDex support for the application (if needed)
        // android.support.multidex.MultiDex.install(this);
    }
}
