var common = require("./tab-view-common");
var trace = require("trace");
var view = require("ui/core/view");
var types = require("utils/types");
var color = require("color");
var style = require("ui/styling/style");
var utils = require("utils/utils");
var getter = utils.ios.getter;
global.moduleMerge(common, exports);
var imageSource;
function ensureImageSource() {
    if (!imageSource) {
        imageSource = require("image-source");
    }
}
var UITabBarControllerImpl = (function (_super) {
    __extends(UITabBarControllerImpl, _super);
    function UITabBarControllerImpl() {
        _super.apply(this, arguments);
    }
    UITabBarControllerImpl.initWithOwner = function (owner) {
        var handler = UITabBarControllerImpl.new();
        handler._owner = owner;
        return handler;
    };
    UITabBarControllerImpl.prototype.viewDidLayoutSubviews = function () {
        if (trace.enabled) {
            trace.write("TabView.UITabBarControllerClass.viewDidLayoutSubviews();", trace.categories.Debug);
        }
        _super.prototype.viewDidLayoutSubviews.call(this);
        var owner = this._owner.get();
        if (owner && owner.isLoaded) {
            owner._updateLayout();
        }
    };
    return UITabBarControllerImpl;
}(UITabBarController));
var UITabBarControllerDelegateImpl = (function (_super) {
    __extends(UITabBarControllerDelegateImpl, _super);
    function UITabBarControllerDelegateImpl() {
        _super.apply(this, arguments);
    }
    UITabBarControllerDelegateImpl.initWithOwner = function (owner) {
        var delegate = UITabBarControllerDelegateImpl.new();
        delegate._owner = owner;
        return delegate;
    };
    UITabBarControllerDelegateImpl.prototype.tabBarControllerShouldSelectViewController = function (tabBarController, viewController) {
        if (trace.enabled) {
            trace.write("TabView.delegate.SHOULD_select(" + tabBarController + ", " + viewController + ");", trace.categories.Debug);
        }
        var owner = this._owner.get();
        if (owner) {
            var backToMoreWillBeVisible = false;
            owner._handleTwoNavigationBars(backToMoreWillBeVisible);
        }
        return true;
    };
    UITabBarControllerDelegateImpl.prototype.tabBarControllerDidSelectViewController = function (tabBarController, viewController) {
        if (trace.enabled) {
            trace.write("TabView.delegate.DID_select(" + tabBarController + ", " + viewController + ");", trace.categories.Debug);
        }
        var owner = this._owner.get();
        if (owner) {
            owner._onViewControllerShown(viewController);
        }
    };
    UITabBarControllerDelegateImpl.ObjCProtocols = [UITabBarControllerDelegate];
    return UITabBarControllerDelegateImpl;
}(NSObject));
var UINavigationControllerDelegateImpl = (function (_super) {
    __extends(UINavigationControllerDelegateImpl, _super);
    function UINavigationControllerDelegateImpl() {
        _super.apply(this, arguments);
    }
    UINavigationControllerDelegateImpl.initWithOwner = function (owner) {
        var delegate = UINavigationControllerDelegateImpl.new();
        delegate._owner = owner;
        return delegate;
    };
    UINavigationControllerDelegateImpl.prototype.navigationControllerWillShowViewControllerAnimated = function (navigationController, viewController, animated) {
        if (trace.enabled) {
            trace.write("TabView.moreNavigationController.WILL_show(" + navigationController + ", " + viewController + ", " + animated + ");", trace.categories.Debug);
        }
        var owner = this._owner.get();
        if (owner) {
            var backToMoreWillBeVisible = owner._ios.viewControllers.containsObject(viewController);
            owner._handleTwoNavigationBars(backToMoreWillBeVisible);
        }
    };
    UINavigationControllerDelegateImpl.prototype.navigationControllerDidShowViewControllerAnimated = function (navigationController, viewController, animated) {
        if (trace.enabled) {
            trace.write("TabView.moreNavigationController.DID_show(" + navigationController + ", " + viewController + ", " + animated + ");", trace.categories.Debug);
        }
        navigationController.navigationBar.topItem.rightBarButtonItem = null;
        var owner = this._owner.get();
        if (owner) {
            owner._onViewControllerShown(viewController);
        }
    };
    UINavigationControllerDelegateImpl.ObjCProtocols = [UINavigationControllerDelegate];
    return UINavigationControllerDelegateImpl;
}(NSObject));
var TabViewItem = (function (_super) {
    __extends(TabViewItem, _super);
    function TabViewItem() {
        _super.apply(this, arguments);
    }
    TabViewItem.prototype._update = function () {
        if (this._parent && this._controller) {
            var icon = this._parent._getIcon(this.iconSource);
            var tabBarItem = UITabBarItem.alloc().initWithTitleImageTag((this.title || ""), icon, this._parent.items.indexOf(this));
            if (!icon) {
                if (types.isFunction(tabBarItem.setTitlePositionAdjustment)) {
                    tabBarItem.setTitlePositionAdjustment({ horizontal: 0, vertical: -20 });
                }
                else {
                    tabBarItem.titlePositionAdjustment = { horizontal: 0, vertical: -20 };
                }
            }
            var states = getTitleAttributesForStates(this._parent);
            tabBarItem.setTitleTextAttributesForState(states.normalState, 0);
            tabBarItem.setTitleTextAttributesForState(states.selectedState, 4);
            this._controller.tabBarItem = tabBarItem;
        }
    };
    return TabViewItem;
}(common.TabViewItem));
exports.TabViewItem = TabViewItem;
var TabView = (function (_super) {
    __extends(TabView, _super);
    function TabView() {
        _super.call(this);
        this._tabBarHeight = 0;
        this._navBarHeight = 0;
        this._iconsCache = {};
        this._ios = UITabBarControllerImpl.initWithOwner(new WeakRef(this));
        this._delegate = UITabBarControllerDelegateImpl.initWithOwner(new WeakRef(this));
        this._moreNavigationControllerDelegate = UINavigationControllerDelegateImpl.initWithOwner(new WeakRef(this));
    }
    TabView.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this._ios.delegate = this._delegate;
    };
    TabView.prototype.onUnloaded = function () {
        this._ios.delegate = null;
        this._ios.moreNavigationController.delegate = null;
        _super.prototype.onUnloaded.call(this);
    };
    Object.defineProperty(TabView.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabView.prototype, "_nativeView", {
        get: function () {
            return this._ios.view;
        },
        enumerable: true,
        configurable: true
    });
    TabView.prototype._onViewControllerShown = function (viewController) {
        if (trace.enabled) {
            trace.write("TabView._onViewControllerShown(" + viewController + ");", trace.categories.Debug);
        }
        if (this._ios.viewControllers.containsObject(viewController)) {
            this.selectedIndex = this._ios.viewControllers.indexOfObject(viewController);
        }
        else {
            if (trace.enabled) {
                trace.write("TabView._onViewControllerShown: viewController is not one of our viewControllers", trace.categories.Debug);
            }
        }
    };
    TabView.prototype._handleTwoNavigationBars = function (backToMoreWillBeVisible) {
        if (trace.enabled) {
            trace.write("TabView._handleTwoNavigationBars(backToMoreWillBeVisible: " + backToMoreWillBeVisible + ")", trace.categories.Debug);
        }
        var page = this.page;
        var actionBarVisible = page.frame._getNavBarVisible(page);
        if (backToMoreWillBeVisible && actionBarVisible) {
            page.frame.ios._disableNavBarAnimation = true;
            page.actionBarHidden = true;
            page.frame.ios._disableNavBarAnimation = false;
            this._actionBarHiddenByTabView = true;
            if (trace.enabled) {
                trace.write("TabView hid action bar", trace.categories.Debug);
            }
            return;
        }
        if (!backToMoreWillBeVisible && this._actionBarHiddenByTabView) {
            page.frame.ios._disableNavBarAnimation = true;
            page.actionBarHidden = false;
            page.frame.ios._disableNavBarAnimation = false;
            this._actionBarHiddenByTabView = undefined;
            if (trace.enabled) {
                trace.write("TabView restored action bar", trace.categories.Debug);
            }
            return;
        }
    };
    TabView.prototype._removeTabs = function (oldItems) {
        if (trace.enabled) {
            trace.write("TabView._removeTabs(" + oldItems + ");", trace.categories.Debug);
        }
        _super.prototype._removeTabs.call(this, oldItems);
        var i;
        var length = oldItems.length;
        var oldItem;
        for (i = 0; i < length; i++) {
            oldItem = oldItems[i];
            oldItem._parent = null;
            oldItem._controller = null;
        }
        this._ios.viewControllers = null;
    };
    TabView.prototype._addTabs = function (newItems) {
        if (trace.enabled) {
            trace.write("TabView._addTabs(" + newItems + ");", trace.categories.Debug);
        }
        _super.prototype._addTabs.call(this, newItems);
        var i;
        var length = newItems.length;
        var item;
        var newControllers = NSMutableArray.alloc().initWithCapacity(length);
        var newController;
        var states = getTitleAttributesForStates(this);
        for (i = 0; i < length; i++) {
            item = newItems[i];
            if (item.view.ios instanceof UIViewController) {
                newController = item.view.ios;
            }
            else {
                newController = UIViewController.new();
                newController.view.addSubview(item.view.ios);
            }
            item._parent = this;
            item._controller = newController;
            var icon = this._getIcon(item.iconSource);
            var tabBarItem = UITabBarItem.alloc().initWithTitleImageTag((item.title || ""), icon, i);
            if (!icon) {
                if (types.isFunction(tabBarItem.setTitlePositionAdjustment)) {
                    tabBarItem.setTitlePositionAdjustment({ horizontal: 0, vertical: -20 });
                }
                else {
                    tabBarItem.titlePositionAdjustment = { horizontal: 0, vertical: -20 };
                }
            }
            tabBarItem.setTitleTextAttributesForState(states.normalState, 0);
            tabBarItem.setTitleTextAttributesForState(states.selectedState, 4);
            newController.tabBarItem = tabBarItem;
            newControllers.addObject(newController);
        }
        this._ios.viewControllers = newControllers;
        this._ios.customizableViewControllers = null;
        this._ios.moreNavigationController.delegate = this._moreNavigationControllerDelegate;
        if (this._ios.selectedIndex !== this.selectedIndex) {
            this._ios.selectedIndex = this.selectedIndex;
        }
    };
    Object.defineProperty(TabView.prototype, "iosIconRenderingMode", {
        get: function () {
            return this._iconRenderingMode;
        },
        set: function (value) {
            if (this._iconRenderingMode !== value) {
                this._iconRenderingMode = value;
                this._iconsCache = {};
                if (this.items && this.items.length) {
                    for (var i = 0, length = this.items.length; i < length; i++) {
                        if (this.items[i].iconSource) {
                            this.items[i]._update();
                        }
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    TabView.prototype._getIconRenderingMode = function () {
        switch (this._iconRenderingMode) {
            case "alwaysOriginal":
                return 1;
            case "alwaysTemplate":
                return 2;
            case "automatic":
            default:
                return 0;
        }
    };
    TabView.prototype._getIcon = function (iconSource) {
        if (!iconSource) {
            return null;
        }
        var image;
        image = this._iconsCache[iconSource];
        if (!image) {
            ensureImageSource();
            var is = imageSource.fromFileOrResource(iconSource);
            if (is && is.ios) {
                var originalRenderedImage = is.ios.imageWithRenderingMode(this._getIconRenderingMode());
                this._iconsCache[iconSource] = originalRenderedImage;
                image = originalRenderedImage;
            }
        }
        return image;
    };
    TabView.prototype._onSelectedIndexPropertyChangedSetNativeValue = function (data) {
        _super.prototype._onSelectedIndexPropertyChangedSetNativeValue.call(this, data);
        var newIndex = data.newValue;
        if (trace.enabled) {
            trace.write("TabView._onSelectedIndexPropertyChangedSetNativeValue(" + newIndex + ")", trace.categories.Debug);
        }
        if (types.isNullOrUndefined(newIndex)) {
            return;
        }
        this._ios.selectedIndex = data.newValue;
        this.requestLayout();
        var args = { eventName: TabView.selectedIndexChangedEvent, object: this, oldIndex: data.oldValue, newIndex: data.newValue };
        this.notify(args);
    };
    TabView.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var nativeView = this._nativeView;
        if (nativeView) {
            var width = utils.layout.getMeasureSpecSize(widthMeasureSpec);
            var widthMode = utils.layout.getMeasureSpecMode(widthMeasureSpec);
            var height = utils.layout.getMeasureSpecSize(heightMeasureSpec);
            var heightMode = utils.layout.getMeasureSpecMode(heightMeasureSpec);
            this._tabBarHeight = TabView.measureHelper(this._ios.tabBar, width, widthMode, height, heightMode).height;
            var moreNavBarVisible = !!this._ios.moreNavigationController.navigationBar.window;
            this._navBarHeight = moreNavBarVisible ? TabView.measureHelper(this._ios.moreNavigationController.navigationBar, width, widthMode, height, heightMode).height : 0;
            var density = utils.layout.getDisplayDensity();
            var measureWidth = 0;
            var measureHeight = 0;
            var child = this._selectedView;
            if (child) {
                var childHeightMeasureSpec = utils.layout.makeMeasureSpec(height - this._navBarHeight - this._tabBarHeight, heightMode);
                var childSize = view.View.measureChild(this, child, widthMeasureSpec, childHeightMeasureSpec);
                measureHeight = childSize.measuredHeight;
                measureWidth = childSize.measuredWidth;
            }
            measureWidth = Math.max(measureWidth, this.minWidth * density);
            measureHeight = Math.max(measureHeight, this.minHeight * density);
            var widthAndState = view.View.resolveSizeAndState(measureWidth, width, widthMode, 0);
            var heightAndState = view.View.resolveSizeAndState(measureHeight, height, heightMode, 0);
            this.setMeasuredDimension(widthAndState, heightAndState);
        }
    };
    TabView.prototype.onLayout = function (left, top, right, bottom) {
        _super.prototype.onLayout.call(this, left, top, right, bottom);
        var child = this._selectedView;
        if (child) {
            view.View.layoutChild(this, child, 0, this._navBarHeight, right, (bottom - this._navBarHeight - this._tabBarHeight));
        }
    };
    TabView.measureHelper = function (nativeView, width, widthMode, height, heightMode) {
        return nativeView.sizeThatFits(CGSizeMake((widthMode === utils.layout.UNSPECIFIED) ? Number.POSITIVE_INFINITY : width, (heightMode === utils.layout.UNSPECIFIED) ? Number.POSITIVE_INFINITY : height));
    };
    TabView.prototype._updateIOSTabBarColorsAndFonts = function () {
        if (!this.items) {
            return;
        }
        var tabBar = this.ios.tabBar;
        var states = getTitleAttributesForStates(this);
        for (var i = 0; i < tabBar.items.count; i++) {
            var item = tabBar.items[i];
            item.setTitleTextAttributesForState(states.normalState, 0);
            item.setTitleTextAttributesForState(states.selectedState, 4);
        }
    };
    TabView.prototype._updateIOSTabBarTextTransform = function (newValue) {
        if (!this.items) {
            return;
        }
        var tabBar = this.ios.tabBar;
        for (var i = 0; i < tabBar.items.count; i++) {
            var item = tabBar.items[i];
            if (types.isNullOrUndefined(newValue)) {
                item.title = this.items[i].title;
            }
            else {
                item.title = utils.ios.getTransformedText({ text: this.items[i].title }, this.items[i].title, newValue);
            }
        }
    };
    return TabView;
}(common.TabView));
exports.TabView = TabView;
function getTitleAttributesForStates(tabView) {
    var normalState = {};
    if (tabView.tabTextColor instanceof color.Color) {
        normalState[UITextAttributeTextColor] = tabView.tabTextColor.ios;
    }
    var selectedState = {};
    if (tabView.selectedTabTextColor instanceof color.Color) {
        selectedState[UITextAttributeTextColor] = tabView.selectedTabTextColor.ios;
    }
    else {
        selectedState[UITextAttributeTextColor] = tabView.ios.tabBar.tintColor;
    }
    var defaultFont = UIFont.systemFontOfSize(10);
    var font = tabView.style._fontInternal.getUIFont(defaultFont);
    normalState[NSFontAttributeName] = font;
    selectedState[NSFontAttributeName] = font;
    return {
        normalState: normalState,
        selectedState: selectedState
    };
}
var TabViewStyler = (function () {
    function TabViewStyler() {
    }
    TabViewStyler.setFontInternalProperty = function (v, newValue, nativeValue) {
        var tab = v;
        tab._updateIOSTabBarColorsAndFonts();
    };
    TabViewStyler.resetFontInternalProperty = function (v, nativeValue) {
        var tab = v;
        tab._updateIOSTabBarColorsAndFonts();
    };
    TabViewStyler.getNativeFontValue = function (v) {
        var tabBar = v.ios.tabBar;
        var currentFont;
        if (tabBar.items && tabBar.items.count > 0) {
            var currentAttrs = tabBar.items[0].titleTextAttributesForState(0);
            if (currentAttrs) {
                currentFont = currentAttrs.objectForKey(NSFontAttributeName);
            }
        }
        if (!currentFont) {
            currentFont = UIFont.systemFontOfSize(getter(UIFont, UIFont.labelFontSize));
        }
        return currentFont;
    };
    TabViewStyler.setTabTextColorProperty = function (v, newValue) {
        var tabView = v;
        tabView._updateIOSTabBarColorsAndFonts();
    };
    TabViewStyler.resetTabTextColorProperty = function (v, nativeValue) {
        var tabView = v;
        tabView._updateIOSTabBarColorsAndFonts();
    };
    TabViewStyler.setTabBackgroundColorProperty = function (v, newValue) {
        var tabView = v;
        tabView.ios.tabBar.barTintColor = newValue;
    };
    TabViewStyler.resetTabBackgroundColorProperty = function (v, nativeValue) {
        var tabView = v;
        tabView.ios.tabBar.barTintColor = nativeValue;
    };
    TabViewStyler.getTabBackgroundColorProperty = function (v) {
        var tabView = v;
        return tabView.ios.tabBar.barTintColor;
    };
    TabViewStyler.setSelectedTabTextColorProperty = function (v, newValue) {
        var tabView = v;
        tabView.ios.tabBar.tintColor = newValue;
        tabView._updateIOSTabBarColorsAndFonts();
    };
    TabViewStyler.resetSelectedTabTextColorProperty = function (v, nativeValue) {
        var tabView = v;
        tabView.ios.tabBar.tintColor = nativeValue;
        tabView._updateIOSTabBarColorsAndFonts();
    };
    TabViewStyler.getSelectedTabTextColorProperty = function (v) {
        var tabView = v;
        return tabView.ios.tabBar.tintColor;
    };
    TabViewStyler.setTextTransformProperty = function (v, newValue) {
        var tabView = v;
        tabView._updateIOSTabBarTextTransform(newValue);
    };
    TabViewStyler.resetTextTransformProperty = function (v, nativeValue) {
        var tabView = v;
        tabView._updateIOSTabBarTextTransform(nativeValue);
    };
    TabViewStyler.registerHandlers = function () {
        style.registerHandler(style.fontInternalProperty, new style.StylePropertyChangedHandler(TabViewStyler.setFontInternalProperty, TabViewStyler.resetFontInternalProperty, TabViewStyler.getNativeFontValue), "TabView");
        style.registerHandler(style.tabTextColorProperty, new style.StylePropertyChangedHandler(TabViewStyler.setTabTextColorProperty, TabViewStyler.resetTabTextColorProperty), "TabView");
        style.registerHandler(style.tabBackgroundColorProperty, new style.StylePropertyChangedHandler(TabViewStyler.setTabBackgroundColorProperty, TabViewStyler.resetTabBackgroundColorProperty, TabViewStyler.getTabBackgroundColorProperty), "TabView");
        style.registerHandler(style.selectedTabTextColorProperty, new style.StylePropertyChangedHandler(TabViewStyler.setSelectedTabTextColorProperty, TabViewStyler.resetSelectedTabTextColorProperty, TabViewStyler.getSelectedTabTextColorProperty), "TabView");
        style.registerHandler(style.textTransformProperty, new style.StylePropertyChangedHandler(TabViewStyler.setTextTransformProperty, TabViewStyler.resetTextTransformProperty), "TabView");
    };
    return TabViewStyler;
}());
exports.TabViewStyler = TabViewStyler;
TabViewStyler.registerHandlers();
//# sourceMappingURL=tab-view.js.map