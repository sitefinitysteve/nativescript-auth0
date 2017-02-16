"use strict";
var application = require("application");
var nativescript_auth0_1 = require("nativescript-auth0");
if (application.ios) {
    var MyDelegate = (function (_super) {
        __extends(MyDelegate, _super);
        function MyDelegate() {
            return _super.apply(this, arguments) || this;
        }
        MyDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
            var lock = new nativescript_auth0_1.Auth0Lock('q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp', 'nativescript.auth0.com');
            global.auth0 = lock;
            return true;
        };
        return MyDelegate;
    }(UIResponder));
    MyDelegate.ObjCProtocols = [UIApplicationDelegate];
    application.ios.delegate = MyDelegate;
}
else {
    application.on(application.launchEvent, function (args) {
        var lock = new nativescript_auth0_1.Auth0Lock('q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp', 'nativescript.auth0.com');
        global.auth0 = lock;
    });
}
application.start({
    moduleName: "login"
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx5Q0FBMkM7QUFDM0MseURBQStDO0FBSS9DLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRWxCO1FBQXlCLDhCQUFXO1FBQXBDOztRQVNBLENBQUM7UUFORyw2REFBd0MsR0FBeEMsVUFBeUMsV0FBMEIsRUFBRSxhQUEyQjtZQUM1RixJQUFJLElBQUksR0FBRyxJQUFJLDhCQUFTLENBQUMsa0NBQWtDLEVBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN0RixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFTCxpQkFBQztJQUFELENBQUMsQUFURCxDQUF5QixXQUFXO0lBQ2xCLHdCQUFhLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBVTFELFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztBQUUxQyxDQUFDO0FBQUEsSUFBSSxDQUFBLENBQUM7SUFFRixXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxJQUFJO1FBQ2xELElBQUksSUFBSSxHQUFHLElBQUksOEJBQVMsQ0FBQyxrQ0FBa0MsRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQztBQUVELFdBQVcsQ0FBQyxLQUFLLENBQ2I7SUFDSSxVQUFVLEVBQUUsT0FBTztDQUN0QixDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IEF1dGgwTG9jayB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYXV0aDBcIjtcblxuXG5cbmlmIChhcHBsaWNhdGlvbi5pb3MpIHtcbiAgICAvL2lPU1xuICAgIGNsYXNzIE15RGVsZWdhdGUgZXh0ZW5kcyBVSVJlc3BvbmRlciBpbXBsZW1lbnRzIFVJQXBwbGljYXRpb25EZWxlZ2F0ZSB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgT2JqQ1Byb3RvY29scyA9IFtVSUFwcGxpY2F0aW9uRGVsZWdhdGVdO1xuXG4gICAgICAgIGFwcGxpY2F0aW9uRGlkRmluaXNoTGF1bmNoaW5nV2l0aE9wdGlvbnMoYXBwbGljYXRpb246IFVJQXBwbGljYXRpb24sIGxhdW5jaE9wdGlvbnM6IE5TRGljdGlvbmFyeSk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgdmFyIGxvY2sgPSBuZXcgQXV0aDBMb2NrKCdxNWF0UXppNkRnbVdCcEhXUkpiZDdNQk5hNWVMQlBScCcsJ25hdGl2ZXNjcmlwdC5hdXRoMC5jb20nKTtcbiAgICAgICAgICAgIGdsb2JhbC5hdXRoMCA9IGxvY2s7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgYXBwbGljYXRpb24uaW9zLmRlbGVnYXRlID0gTXlEZWxlZ2F0ZTtcblxufWVsc2V7XG4gICAgLy9BTkRST0lEXG4gICAgYXBwbGljYXRpb24ub24oYXBwbGljYXRpb24ubGF1bmNoRXZlbnQsIGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIHZhciBsb2NrID0gbmV3IEF1dGgwTG9jaygncTVhdFF6aTZEZ21XQnBIV1JKYmQ3TUJOYTVlTEJQUnAnLCduYXRpdmVzY3JpcHQuYXV0aDAuY29tJyk7XG4gICAgICAgIGdsb2JhbC5hdXRoMCA9IGxvY2s7XG4gICAgfSk7XG5cbn1cblxuYXBwbGljYXRpb24uc3RhcnQoXG4gICAgeyBcbiAgICAgICAgbW9kdWxlTmFtZTogXCJsb2dpblwiIFxuICAgIH1cbik7XG4iXX0=