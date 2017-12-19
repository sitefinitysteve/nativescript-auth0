var application = require("application");
var pageCommon = require("./page-common");
var view_1 = require("ui/core/view");
var trace = require("trace");
var uiUtils = require("ui/utils");
var platform_1 = require("platform");
var enums_1 = require("ui/enums");
var style = require("ui/styling/style");
var utils = require("utils/utils");
var getter = utils.ios.getter;
global.moduleMerge(pageCommon, exports);
var ENTRY = "_entry";
var DELEGATE = "_delegate";
function isBackNavigationTo(page, entry) {
    var frame = page.frame;
    if (!frame) {
        return false;
    }
    if (frame.navigationQueueIsEmpty()) {
        return true;
    }
    else {
        var navigationQueue = frame._navigationQueue;
        for (var i = 0; i < navigationQueue.length; i++) {
            if (navigationQueue[i].entry === entry) {
                return navigationQueue[i].isBackNavigation;
            }
        }
    }
    return false;
}
function isBackNavigationFrom(controller, page) {
    if (!page.frame) {
        return false;
    }
    if (controller.isBackstackCleared || controller.isBackstackSkipped) {
        return false;
    }
    if (controller.navigationController && controller.navigationController.viewControllers.containsObject(controller)) {
        return false;
    }
    return true;
}
var UIViewControllerImpl = (function (_super) {
    __extends(UIViewControllerImpl, _super);
    function UIViewControllerImpl() {
        _super.apply(this, arguments);
    }
    UIViewControllerImpl.initWithOwner = function (owner) {
        var controller = UIViewControllerImpl.new();
        controller._owner = owner;
        controller.automaticallyAdjustsScrollViewInsets = false;
        controller.shown = false;
        return controller;
    };
    UIViewControllerImpl.prototype.viewDidLayoutSubviews = function () {
        var owner = this._owner.get();
        if (!owner) {
            return;
        }
        if (trace.enabled) {
            trace.write(owner + " viewDidLayoutSubviews, isLoaded = " + owner.isLoaded, trace.categories.ViewHierarchy);
        }
        if (!owner.isLoaded) {
            return;
        }
        if (owner._modalParent) {
            var isTablet = platform_1.device.deviceType === enums_1.DeviceType.Tablet;
            var isFullScreen = !owner._UIModalPresentationFormSheet || !isTablet;
            var frame = isFullScreen ? getter(UIScreen, UIScreen.mainScreen).bounds : this.view.frame;
            var size = frame.size;
            var width = size.width;
            var height = size.height;
            var mode = utils.layout.EXACTLY;
            var superViewRotationRadians = void 0;
            if (this.view.superview) {
                var transform = this.view.superview.transform;
                superViewRotationRadians = atan2f(transform.b, transform.a);
            }
            if (utils.ios.MajorVersion < 8 && utils.ios.isLandscape() && !superViewRotationRadians) {
                width = size.height;
                height = size.width;
            }
            var bottom = height;
            var statusBarHeight = uiUtils.ios.getStatusBarHeight();
            var statusBarVisible = !getter(UIApplication, UIApplication.sharedApplication).statusBarHidden;
            var backgroundSpanUnderStatusBar = owner.backgroundSpanUnderStatusBar;
            if (statusBarVisible && !backgroundSpanUnderStatusBar) {
                height -= statusBarHeight;
            }
            var widthSpec = utils.layout.makeMeasureSpec(width, mode);
            var heightSpec = utils.layout.makeMeasureSpec(height, mode);
            view_1.View.measureChild(null, owner, widthSpec, heightSpec);
            var top = ((backgroundSpanUnderStatusBar && isFullScreen) || utils.ios.MajorVersion < 8 || !isFullScreen) ? 0 : statusBarHeight;
            view_1.View.layoutChild(null, owner, 0, top, width, bottom);
            if (utils.ios.MajorVersion < 8) {
                if (!backgroundSpanUnderStatusBar && (!isTablet || isFullScreen)) {
                    if (utils.ios.isLandscape() && !superViewRotationRadians) {
                        this.view.center = CGPointMake(this.view.center.x - statusBarHeight, this.view.center.y);
                    }
                    else {
                        this.view.center = CGPointMake(this.view.center.x, this.view.center.y + statusBarHeight);
                    }
                }
            }
            if (trace.enabled) {
                trace.write(owner + ", native frame = " + NSStringFromCGRect(this.view.frame), trace.categories.Layout);
            }
        }
        else {
            if (!application.ios.window) {
                uiUtils.ios._layoutRootView(owner, utils.ios.getter(UIScreen, UIScreen.mainScreen).bounds);
            }
            owner._updateLayout();
        }
    };
    UIViewControllerImpl.prototype.viewWillAppear = function (animated) {
        _super.prototype.viewWillAppear.call(this, animated);
        this.shown = false;
        var page = this._owner.get();
        if (trace.enabled) {
            trace.write(page + " viewWillAppear", trace.categories.Navigation);
        }
        if (!page) {
            return;
        }
        var frame = this.navigationController ? this.navigationController.owner : null;
        var newEntry = this[ENTRY];
        if (!page._presentedViewController && newEntry && (!frame || frame.currentPage !== page)) {
            var isBack = isBackNavigationTo(page, newEntry);
            page.onNavigatingTo(newEntry.entry.context, isBack, newEntry.entry.bindingContext);
        }
        page._enableLoadedEvents = true;
        if (frame) {
            if (!page.parent) {
                if (!frame._currentEntry) {
                    frame._currentEntry = newEntry;
                }
                else {
                    frame._navigateToEntry = newEntry;
                }
                frame._addView(page);
                frame.remeasureFrame();
            }
            else if (page.parent !== frame) {
                throw new Error("Page is already shown on another frame.");
            }
            page.actionBar.update();
        }
        page._viewWillDisappear = false;
        if (!page.isLoaded) {
            page.onLoaded();
        }
        page._enableLoadedEvents = false;
    };
    UIViewControllerImpl.prototype.viewDidAppear = function (animated) {
        _super.prototype.viewDidAppear.call(this, animated);
        this.shown = true;
        var page = this._owner.get();
        if (trace.enabled) {
            trace.write(page + " viewDidAppear", trace.categories.Navigation);
        }
        if (!page) {
            return;
        }
        page._viewWillDisappear = false;
        var frame = this.navigationController ? this.navigationController.owner : null;
        if (!page._presentedViewController && frame) {
            var newEntry = this[ENTRY];
            var isBack = isBackNavigationTo(page, newEntry);
            if (frame.currentPage === page && frame._navigationQueue.length === 0) {
                isBack = false;
            }
            frame._navigateToEntry = null;
            frame._currentEntry = newEntry;
            frame.remeasureFrame();
            frame._updateActionBar(page);
            page.onNavigatedTo(isBack);
            frame.ios.controller.delegate = this[DELEGATE];
            if (frame.canGoBack()) {
                this.navigationController.interactivePopGestureRecognizer.delegate = this.navigationController;
                this.navigationController.interactivePopGestureRecognizer.enabled = page.enableSwipeBackNavigation;
            }
            else {
                this.navigationController.interactivePopGestureRecognizer.enabled = false;
            }
            frame._processNavigationQueue(page);
        }
        if (!this.presentedViewController) {
            page._presentedViewController = null;
        }
    };
    ;
    UIViewControllerImpl.prototype.viewWillDisappear = function (animated) {
        var page = this._owner.get();
        if (trace.enabled) {
            trace.write(page + " viewWillDisappear", trace.categories.Navigation);
        }
        if (!page) {
            return;
        }
        if (!page._presentedViewController) {
            page._presentedViewController = this.presentedViewController;
        }
        var frame = page.frame;
        if (!page._presentedViewController && frame && frame.currentPage === page) {
            var isBack = isBackNavigationFrom(this, page);
            page.onNavigatingFrom(isBack);
        }
        page._viewWillDisappear = true;
    };
    UIViewControllerImpl.prototype.viewDidDisappear = function (animated) {
        var page = this._owner.get();
        if (trace.enabled) {
            trace.write(page + " viewDidDisappear", trace.categories.Navigation);
        }
        if (!page || page.modal || page._presentedViewController) {
            return;
        }
        var modalParent = page._modalParent;
        page._modalParent = undefined;
        page._UIModalPresentationFormSheet = false;
        if (modalParent) {
            modalParent._modal = undefined;
        }
        var frame = page.frame;
        if (!modalParent && frame && frame.backStack.length > 0 && frame.navigationQueueIsEmpty() && frame.currentPage === page) {
            frame._backStack.pop();
        }
        page._enableLoadedEvents = true;
        var isBack = isBackNavigationFrom(this, page);
        if (isBack) {
            frame._removeView(page);
        }
        if (page.isLoaded) {
            page.onUnloaded();
        }
        page._enableLoadedEvents = false;
        if (!modalParent) {
            page.onNavigatedFrom(isBack);
        }
    };
    return UIViewControllerImpl;
}(UIViewController));
var Page = (function (_super) {
    __extends(Page, _super);
    function Page() {
        _super.apply(this, arguments);
        this._ios = UIViewControllerImpl.initWithOwner(new WeakRef(this));
    }
    Page.prototype.requestLayout = function () {
        _super.prototype.requestLayout.call(this);
        if (!this.parent && this.ios && this._nativeView) {
            this._nativeView.setNeedsLayout();
        }
    };
    Page.prototype._onContentChanged = function (oldView, newView) {
        _super.prototype._onContentChanged.call(this, oldView, newView);
        this._removeNativeView(oldView);
        this._addNativeView(newView);
    };
    Page.prototype.onLoaded = function () {
        if (this._enableLoadedEvents) {
            _super.prototype.onLoaded.call(this);
        }
        this._updateActionBar();
    };
    Page.prototype.onUnloaded = function () {
        if (this._enableLoadedEvents) {
            _super.prototype.onUnloaded.call(this);
        }
    };
    Page.prototype._addNativeView = function (view) {
        if (view) {
            if (trace.enabled) {
                trace.write("Native: Adding " + view + " to " + this, trace.categories.ViewHierarchy);
            }
            if (view.ios instanceof UIView) {
                this._ios.view.addSubview(view.ios);
            }
            else if (view.ios instanceof UIViewController) {
                this._ios.addChildViewController(view.ios);
                this._ios.view.addSubview(view.ios.view);
            }
        }
    };
    Page.prototype._removeNativeView = function (view) {
        if (view) {
            if (trace.enabled) {
                trace.write("Native: Removing " + view + " from " + this, trace.categories.ViewHierarchy);
            }
            if (view.ios instanceof UIView) {
                view.ios.removeFromSuperview();
            }
            else if (view.ios instanceof UIViewController) {
                view.ios.removeFromParentViewController();
                view.ios.view.removeFromSuperview();
            }
        }
    };
    Object.defineProperty(Page.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "_nativeView", {
        get: function () {
            return this.ios.view;
        },
        enumerable: true,
        configurable: true
    });
    Page.prototype._showNativeModalView = function (parent, context, closeCallback, fullscreen) {
        var _this = this;
        _super.prototype._showNativeModalView.call(this, parent, context, closeCallback, fullscreen);
        this._modalParent = parent;
        if (!parent.ios.view.window) {
            throw new Error("Parent page is not part of the window hierarchy. Close the current modal page before showing another one!");
        }
        if (fullscreen) {
            this._ios.modalPresentationStyle = 0;
        }
        else {
            this._ios.modalPresentationStyle = 2;
            this._UIModalPresentationFormSheet = true;
        }
        _super.prototype._raiseShowingModallyEvent.call(this);
        parent.ios.presentViewControllerAnimatedCompletion(this._ios, utils.ios.MajorVersion >= 7, null);
        var transitionCoordinator = getter(parent.ios, parent.ios.transitionCoordinator);
        if (transitionCoordinator) {
            UIViewControllerTransitionCoordinator.prototype.animateAlongsideTransitionCompletion.call(transitionCoordinator, null, function () { return _this._raiseShownModallyEvent(); });
        }
        else {
            this._raiseShownModallyEvent();
        }
    };
    Page.prototype._hideNativeModalView = function (parent) {
        parent.requestLayout();
        parent._ios.dismissModalViewControllerAnimated(utils.ios.MajorVersion >= 7);
        _super.prototype._hideNativeModalView.call(this, parent);
    };
    Page.prototype._updateActionBar = function (disableNavBarAnimation) {
        if (disableNavBarAnimation === void 0) { disableNavBarAnimation = false; }
        var frame = this.frame;
        if (frame) {
            frame._updateActionBar(this, disableNavBarAnimation);
        }
    };
    Page.prototype.updateStatusBar = function () {
        this._updateStatusBarStyle(this.statusBarStyle);
    };
    Page.prototype._updateStatusBarStyle = function (value) {
        var frame = this.frame;
        if (this.frame && value) {
            var navigationController = frame.ios.controller;
            var navigationBar = navigationController.navigationBar;
            navigationBar.barStyle = value === "dark" ? 1 : 0;
        }
    };
    Page.prototype._updateEnableSwipeBackNavigation = function (enabled) {
        var navController = this._ios.navigationController;
        if (this.frame && navController && navController.interactivePopGestureRecognizer) {
            enabled = enabled && this.frame.canGoBack();
            navController.interactivePopGestureRecognizer.enabled = enabled;
        }
    };
    Page.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        view_1.View.adjustChildLayoutParams(this.layoutView, widthMeasureSpec, heightMeasureSpec);
        var width = utils.layout.getMeasureSpecSize(widthMeasureSpec);
        var widthMode = utils.layout.getMeasureSpecMode(widthMeasureSpec);
        var height = utils.layout.getMeasureSpecSize(heightMeasureSpec);
        var heightMode = utils.layout.getMeasureSpecMode(heightMeasureSpec);
        var actionBarWidth = 0;
        var actionBarHeight = 0;
        var statusBarHeight = this.backgroundSpanUnderStatusBar ? uiUtils.ios.getStatusBarHeight() : 0;
        if (this.frame && this.frame.parent) {
            statusBarHeight = 0;
        }
        if (this._modalParent && this._UIModalPresentationFormSheet && platform_1.device.deviceType === enums_1.DeviceType.Tablet) {
            statusBarHeight = 0;
        }
        if (this.frame && this.frame._getNavBarVisible(this)) {
            var actionBarSize = view_1.View.measureChild(this, this.actionBar, widthMeasureSpec, heightMeasureSpec);
            actionBarWidth = actionBarSize.measuredWidth;
            actionBarHeight = actionBarSize.measuredHeight;
        }
        var heightSpec = utils.layout.makeMeasureSpec(height - actionBarHeight - statusBarHeight, heightMode);
        var result = view_1.View.measureChild(this, this.layoutView, widthMeasureSpec, heightSpec);
        var measureWidth = Math.max(actionBarWidth, result.measuredWidth, this.minWidth);
        var measureHeight = Math.max(result.measuredHeight + actionBarHeight, this.minHeight);
        var widthAndState = view_1.View.resolveSizeAndState(measureWidth, width, widthMode, 0);
        var heightAndState = view_1.View.resolveSizeAndState(measureHeight, height, heightMode, 0);
        this.setMeasuredDimension(widthAndState, heightAndState);
    };
    Page.prototype.onLayout = function (left, top, right, bottom) {
        view_1.View.layoutChild(this, this.actionBar, 0, 0, right - left, bottom - top);
        var navigationBarHeight = 0;
        if (this.frame && this.frame._getNavBarVisible(this)) {
            navigationBarHeight = this.actionBar.getMeasuredHeight();
        }
        if (this.frame && this.frame.ios &&
            this.frame.ios.controller.navigationBar &&
            !this.frame.ios.controller.navigationBar.translucent &&
            !this._ios.shown) {
            navigationBarHeight = 0;
        }
        var statusBarHeight = this.backgroundSpanUnderStatusBar ? uiUtils.ios.getStatusBarHeight() : 0;
        if (this.frame && this.frame.parent) {
            statusBarHeight = 0;
        }
        if (this._modalParent && this._UIModalPresentationFormSheet && platform_1.device.deviceType === enums_1.DeviceType.Tablet) {
            statusBarHeight = 0;
        }
        view_1.View.layoutChild(this, this.layoutView, 0, navigationBarHeight + statusBarHeight, right - left, bottom - top);
        view_1.View.restoreChildOriginalParams(this.layoutView);
    };
    Page.prototype._addViewToNativeVisualTree = function (view) {
        if (view === this.actionBar) {
            return true;
        }
        return _super.prototype._addViewToNativeVisualTree.call(this, view);
    };
    return Page;
}(pageCommon.Page));
exports.Page = Page;
var PageStyler = (function () {
    function PageStyler() {
    }
    PageStyler.setStatusBarStyleProperty = function (v, newValue) {
        var page = v;
        page._updateStatusBarStyle(newValue);
    };
    PageStyler.resetStatusBarStyleProperty = function (v, nativeValue) {
        var page = v;
        page._updateStatusBarStyle(nativeValue);
    };
    PageStyler.getStatusBarStyleProperty = function (v) {
        var page = v;
        return page.statusBarStyle;
    };
    PageStyler.registerHandlers = function () {
        style.registerHandler(style.statusBarStyleProperty, new style.StylePropertyChangedHandler(PageStyler.setStatusBarStyleProperty, PageStyler.resetStatusBarStyleProperty, PageStyler.getStatusBarStyleProperty), "Page");
    };
    return PageStyler;
}());
exports.PageStyler = PageStyler;
PageStyler.registerHandlers();
//# sourceMappingURL=page.js.map