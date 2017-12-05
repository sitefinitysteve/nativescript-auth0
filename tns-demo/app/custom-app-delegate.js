"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomAppDelegate = (function (_super) {
    __extends(CustomAppDelegate, _super);
    function CustomAppDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomAppDelegate.prototype.applicationDidEnterBackground = function (application) {
        console.log("applicationDidEnterBackground");
    };
    CustomAppDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
        console.log("applicationDidFinishLaunchingWithOptions");
        return CustomAppDelegate._promise("applicationDidFinishLaunchingWithOptions", { application: application, launchOptions: launchOptions });
    };
    CustomAppDelegate.prototype.applicationOpenURLOptions = function (application, url, options) {
        console.log("applicationOpenURLOptions");
        return CustomAppDelegate._promise("applicationOpenURLOptions", { application: application, url: url, options: options });
    };
    CustomAppDelegate.prototype.applicationContinueUserActivityRestorationHandler = function (application, userActivity, restorationHandler) {
        console.log("applicationContinueUserActivityRestorationHandler");
        return CustomAppDelegate._promise("applicationContinueUserActivityRestorationHandler", { application: application, userActivity: userActivity, restorationHandler: restorationHandler });
    };
    CustomAppDelegate._promise = function (fn, args) {
        var constants = {
            state: args.application.applicationState
        };
        var promise = Promise.resolve().then(function () {
            return { fn: fn, args: args, constants: constants };
        });
        var entry;
        if (!(entry = this._queue[fn])) {
            entry = { callbacks: [], promise: promise };
            this._queue[fn] = entry;
            return entry;
        }
        entry.promise = promise;
        if (entry.callbacks.length > 0) {
            entry.callbacks.forEach(function (callback) {
                entry.promise.then(callback);
            });
        }
        return entry;
    };
    CustomAppDelegate.apply = function (fn, callback) {
        var entry;
        if (!(entry = this._queue[fn])) {
            entry = this._queue[fn] = { callbacks: [], promise: false };
        }
        if (!entry.promise) {
            entry.callbacks.push(callback);
        }
        else {
            entry.promise.then(callback);
        }
        return entry;
    };
    CustomAppDelegate.ObjCProtocols = [UIApplicationDelegate];
    CustomAppDelegate._queue = {};
    return CustomAppDelegate;
}(UIResponder));
exports.CustomAppDelegate = CustomAppDelegate;
var handler = function restorationHandler() {
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWFwcC1kZWxlZ2F0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbS1hcHAtZGVsZWdhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUF1QyxxQ0FBVztJQUFsRDs7SUFtRUEsQ0FBQztJQS9EVSx5REFBNkIsR0FBcEMsVUFBcUMsV0FBMEI7UUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSxvRUFBd0MsR0FBL0MsVUFBZ0QsV0FBMEIsRUFBRSxhQUFrQjtRQUMxRixPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQywwQ0FBMEMsRUFBRSxFQUFFLFdBQVcsYUFBQSxFQUFFLGFBQWEsZUFBQSxFQUFFLENBQUMsQ0FBQztJQUNsSCxDQUFDO0lBRUoscURBQXlCLEdBQXpCLFVBQTBCLFdBQWlDLEVBQUUsR0FBVyxFQUFFLE9BQTRCO1FBQy9GLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEVBQUUsV0FBVyxhQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFFRSw2RUFBaUQsR0FBakQsVUFBa0QsV0FBaUMsRUFBRSxZQUFZLEVBQUUsa0JBQWtCO1FBQ2pILE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLG1EQUFtRCxFQUFFLEVBQUUsV0FBVyxhQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsa0JBQWtCLG9CQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQzNJLENBQUM7SUFFbUIsMEJBQVEsR0FBekIsVUFBMEIsRUFBVSxFQUFFLElBQVM7UUFDakQsSUFBSSxTQUFTLEdBQUc7WUFFZixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0I7U0FDeEMsQ0FBQztRQUVGLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDcEMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksS0FBSyxDQUFDO1FBRVYsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEtBQUssR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZCxDQUFDO1FBRUQsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFeEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFTLFFBQVE7Z0JBQ3hDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRWEsdUJBQUssR0FBbkIsVUFBb0IsRUFBVSxFQUFFLFFBQWE7UUFDNUMsSUFBSSxLQUFLLENBQUM7UUFFVixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUM3RCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNwQixLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNkLENBQUM7SUFqRWdCLCtCQUFhLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3JDLHdCQUFNLEdBQVcsRUFBRSxDQUFDO0lBaUV6Qyx3QkFBQztDQUFBLEFBbkVELENBQXVDLFdBQVcsR0FtRWpEO0FBbkVZLDhDQUFpQjtBQXFFOUIsSUFBSSxPQUFPLEdBQUc7QUFFZCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ3VzdG9tQXBwRGVsZWdhdGUgZXh0ZW5kcyBVSVJlc3BvbmRlciBpbXBsZW1lbnRzIFVJQXBwbGljYXRpb25EZWxlZ2F0ZSB7XG4gICAgcHVibGljIHN0YXRpYyBPYmpDUHJvdG9jb2xzID0gW1VJQXBwbGljYXRpb25EZWxlZ2F0ZV07XG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfcXVldWU6IE9iamVjdCA9IHt9O1xuXG4gICAgcHVibGljIGFwcGxpY2F0aW9uRGlkRW50ZXJCYWNrZ3JvdW5kKGFwcGxpY2F0aW9uOiBVSUFwcGxpY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXBwbGljYXRpb25EaWRFbnRlckJhY2tncm91bmRcIik7XG4gICAgfVxuXG4gICAgcHVibGljIGFwcGxpY2F0aW9uRGlkRmluaXNoTGF1bmNoaW5nV2l0aE9wdGlvbnMoYXBwbGljYXRpb246IFVJQXBwbGljYXRpb24sIGxhdW5jaE9wdGlvbnM6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFwcGxpY2F0aW9uRGlkRmluaXNoTGF1bmNoaW5nV2l0aE9wdGlvbnNcIik7XG4gICAgICAgIHJldHVybiBDdXN0b21BcHBEZWxlZ2F0ZS5fcHJvbWlzZShcImFwcGxpY2F0aW9uRGlkRmluaXNoTGF1bmNoaW5nV2l0aE9wdGlvbnNcIiwgeyBhcHBsaWNhdGlvbiwgbGF1bmNoT3B0aW9ucyB9KTtcbiAgICB9XG5cblx0YXBwbGljYXRpb25PcGVuVVJMT3B0aW9ucyhhcHBsaWNhdGlvbjogdHlwZW9mIFVJQXBwbGljYXRpb24sIHVybDogc3RyaW5nLCBvcHRpb25zOiB0eXBlb2YgTlNEaWN0aW9uYXJ5KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXBwbGljYXRpb25PcGVuVVJMT3B0aW9uc1wiKTtcblx0XHRyZXR1cm4gQ3VzdG9tQXBwRGVsZWdhdGUuX3Byb21pc2UoXCJhcHBsaWNhdGlvbk9wZW5VUkxPcHRpb25zXCIsIHsgYXBwbGljYXRpb24sIHVybCwgb3B0aW9ucyB9KTtcblx0fVxuXG4gICAgYXBwbGljYXRpb25Db250aW51ZVVzZXJBY3Rpdml0eVJlc3RvcmF0aW9uSGFuZGxlcihhcHBsaWNhdGlvbjogdHlwZW9mIFVJQXBwbGljYXRpb24sIHVzZXJBY3Rpdml0eSwgcmVzdG9yYXRpb25IYW5kbGVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXBwbGljYXRpb25Db250aW51ZVVzZXJBY3Rpdml0eVJlc3RvcmF0aW9uSGFuZGxlclwiKTtcblx0XHRyZXR1cm4gQ3VzdG9tQXBwRGVsZWdhdGUuX3Byb21pc2UoXCJhcHBsaWNhdGlvbkNvbnRpbnVlVXNlckFjdGl2aXR5UmVzdG9yYXRpb25IYW5kbGVyXCIsIHsgYXBwbGljYXRpb24sIHVzZXJBY3Rpdml0eSwgcmVzdG9yYXRpb25IYW5kbGVyIH0pO1xuXHR9XG5cbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9wcm9taXNlKGZuOiBzdHJpbmcsIGFyZ3M6IGFueSkge1xuXHRcdGxldCBjb25zdGFudHMgPSB7XG5cdFx0XHQvLyBrZWVwIGEgY29weSBvZiB0aGUgY2FsbC10aW1lIGFwcGxpY2F0aW9uIHN0YXRlXG5cdFx0XHRzdGF0ZTogYXJncy5hcHBsaWNhdGlvbi5hcHBsaWNhdGlvblN0YXRlXG5cdFx0fTtcblxuXHRcdGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG5cdFx0XHRyZXR1cm4geyBmbjogZm4sIGFyZ3M6IGFyZ3MsIGNvbnN0YW50czogY29uc3RhbnRzIH07XG5cdFx0fSk7XG5cblx0XHRsZXQgZW50cnk7XG5cblx0XHRpZiAoIShlbnRyeSA9IHRoaXMuX3F1ZXVlW2ZuXSkpIHtcblx0XHRcdGVudHJ5ID0geyBjYWxsYmFja3M6IFtdLCBwcm9taXNlOiBwcm9taXNlIH07XG5cdFx0XHR0aGlzLl9xdWV1ZVtmbl0gPSBlbnRyeTtcblx0XHRcdHJldHVybiBlbnRyeTtcblx0XHR9XG5cblx0XHRlbnRyeS5wcm9taXNlID0gcHJvbWlzZTtcblxuXHRcdGlmIChlbnRyeS5jYWxsYmFja3MubGVuZ3RoID4gMCkge1xuXHRcdFx0ZW50cnkuY2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHRcdFx0ZW50cnkucHJvbWlzZS50aGVuKGNhbGxiYWNrKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBlbnRyeTtcblx0fVxuXG5cdHB1YmxpYyBzdGF0aWMgYXBwbHkoZm46IHN0cmluZywgY2FsbGJhY2s6IGFueSkge1xuXHRcdGxldCBlbnRyeTtcblxuXHRcdGlmICghKGVudHJ5ID0gdGhpcy5fcXVldWVbZm5dKSkge1xuXHRcdFx0ZW50cnkgPSB0aGlzLl9xdWV1ZVtmbl0gPSB7IGNhbGxiYWNrczogW10sIHByb21pc2U6IGZhbHNlIH07XG5cdFx0fVxuXG5cdFx0aWYgKCFlbnRyeS5wcm9taXNlKSB7XG5cdFx0XHRlbnRyeS5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVudHJ5LnByb21pc2UudGhlbihjYWxsYmFjayk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVudHJ5O1xuXHR9XG59XG5cbnZhciBoYW5kbGVyID0gZnVuY3Rpb24gcmVzdG9yYXRpb25IYW5kbGVyKCl7XG5cbn0iXX0=