"use strict";
var application = require("application");
// the `JavaProxy` decorator specifies the package and the name for the native *.JAVA file generated. 
var Application = (function (_super) {
    __extends(Application, _super);
    function Application() {
        _super.apply(this, arguments);
    }
    // AUTH0 END
    Application.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        // initialize the modules with the custom application object
        application.android.init(this);
        // Enter custom initialization code here
        // AUTH0 START
        console.log("AUTH0DEBUG: Initializing Lock instance");
        this.lock = new com.auth0.lock.Lock.Builder()
            .loadFromApplication(this)
            .closable(true)
            .build();
        console.dump(this.lock);
        // AUTH0 END
    };
    // AUTH0 START
    Application.prototype.getLock = function () {
        console.log("AUTH0DEBUG: Getting Lock instance");
        return this.lock;
    };
    // AUTH0 END
    Application.prototype.attachBaseContext = function (baseContext) {
        _super.prototype.attachBaseContext.call(this, baseContext);
        // This code enables MultiDex support for the application (if needed)
        // android.support.multidex.MultiDex.install(this);
    };
    Application = __decorate([
        JavaProxy("org.myApp.Application"), 
        __metadata('design:paramtypes', [])
    ], Application);
    return Application;
}(android.app.Application));
//# sourceMappingURL=application.android.js.map