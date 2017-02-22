"use strict";
var application = require("application");
if (application.ios) {
    var MyDelegate = (function (_super) {
        __extends(MyDelegate, _super);
        function MyDelegate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
            return true;
        };
        return MyDelegate;
    }(UIResponder));
    MyDelegate.ObjCProtocols = [UIApplicationDelegate];
    application.ios.delegate = MyDelegate;
}
application.start({
    moduleName: "login"
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx5Q0FBMkM7QUFLM0MsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFbEI7UUFBeUIsOEJBQVc7UUFBcEM7O1FBU0EsQ0FBQztRQU5HLDZEQUF3QyxHQUF4QyxVQUF5QyxXQUEwQixFQUFFLGFBQTJCO1lBRzVGLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVMLGlCQUFDO0lBQUQsQ0FBQyxBQVRELENBQXlCLFdBQVc7SUFDbEIsd0JBQWEsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFVMUQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBRTFDLENBQUM7QUFFRCxXQUFXLENBQUMsS0FBSyxDQUNiO0lBQ0ksVUFBVSxFQUFFLE9BQU87Q0FDdEIsQ0FDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBBdXRoMExvY2sgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWF1dGgwXCI7XG5cblxuXG5pZiAoYXBwbGljYXRpb24uaW9zKSB7XG4gICAgLy9pT1NcbiAgICBjbGFzcyBNeURlbGVnYXRlIGV4dGVuZHMgVUlSZXNwb25kZXIgaW1wbGVtZW50cyBVSUFwcGxpY2F0aW9uRGVsZWdhdGUge1xuICAgICAgICBwdWJsaWMgc3RhdGljIE9iakNQcm90b2NvbHMgPSBbVUlBcHBsaWNhdGlvbkRlbGVnYXRlXTtcblxuICAgICAgICBhcHBsaWNhdGlvbkRpZEZpbmlzaExhdW5jaGluZ1dpdGhPcHRpb25zKGFwcGxpY2F0aW9uOiBVSUFwcGxpY2F0aW9uLCBsYXVuY2hPcHRpb25zOiBOU0RpY3Rpb25hcnkpOiBib29sZWFuIHtcbiAgICAgICAgICAgIC8vdmFyIGxvY2sgPSBuZXcgQXV0aDBMb2NrKCdxNWF0UXppNkRnbVdCcEhXUkpiZDdNQk5hNWVMQlBScCcsJ25hdGl2ZXNjcmlwdC5hdXRoMC5jb20nKTtcbiAgICAgICAgICAgIC8vZ2xvYmFsLmF1dGgwID0gbG9jaztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBhcHBsaWNhdGlvbi5pb3MuZGVsZWdhdGUgPSBNeURlbGVnYXRlO1xuXG59XG5cbmFwcGxpY2F0aW9uLnN0YXJ0KFxuICAgIHsgXG4gICAgICAgIG1vZHVsZU5hbWU6IFwibG9naW5cIiBcbiAgICB9XG4pO1xuIl19