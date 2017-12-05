var common = require("./utils-common");
var color_1 = require("color");
var enums = require("ui/enums");
global.moduleMerge(common, exports);
var trace;
function ensureTrace() {
    if (!trace) {
        trace = require("trace");
    }
}
function isOrientationLandscape(orientation) {
    return orientation === 3 || orientation === 4;
}
var layout;
(function (layout) {
    var MODE_SHIFT = 30;
    var MODE_MASK = 0x3 << MODE_SHIFT;
    function makeMeasureSpec(size, mode) {
        return (Math.round(size) & ~MODE_MASK) | (mode & MODE_MASK);
    }
    layout.makeMeasureSpec = makeMeasureSpec;
    function getDisplayDensity() {
        return 1;
    }
    layout.getDisplayDensity = getDisplayDensity;
    function toDevicePixels(value) {
        return value * getDisplayDensity();
    }
    layout.toDevicePixels = toDevicePixels;
    function toDeviceIndependentPixels(value) {
        return value / getDisplayDensity();
    }
    layout.toDeviceIndependentPixels = toDeviceIndependentPixels;
})(layout = exports.layout || (exports.layout = {}));
var ios;
(function (ios) {
    function setTextAlignment(view, value) {
        switch (value) {
            case enums.TextAlignment.left:
                view.textAlignment = 0;
                break;
            case enums.TextAlignment.center:
                view.textAlignment = 1;
                break;
            case enums.TextAlignment.right:
                view.textAlignment = 2;
                break;
            default:
                break;
        }
    }
    ios.setTextAlignment = setTextAlignment;
    function getter(_this, property) {
        if (typeof property === "function") {
            return property.call(_this);
        }
        else {
            return property;
        }
    }
    ios.getter = getter;
    function getTransformedText(view, source, transform) {
        var result = source;
        switch (transform) {
            case enums.TextTransform.none:
            default:
                result = view.text;
                break;
            case enums.TextTransform.uppercase:
                result = NSStringFromNSAttributedString(source).uppercaseString;
                break;
            case enums.TextTransform.lowercase:
                result = NSStringFromNSAttributedString(source).lowercaseString;
                break;
            case enums.TextTransform.capitalize:
                result = NSStringFromNSAttributedString(source).capitalizedString;
                break;
        }
        return result;
    }
    ios.getTransformedText = getTransformedText;
    function NSStringFromNSAttributedString(source) {
        return NSString.stringWithString(source instanceof NSAttributedString && source.string || source);
    }
    function setWhiteSpace(view, value, parentView) {
        if (value === enums.WhiteSpace.normal) {
            view.lineBreakMode = 0;
            view.numberOfLines = 0;
        }
        else {
            if (parentView) {
                view.lineBreakMode = 5;
            }
            else {
                view.lineBreakMode = 4;
            }
            view.numberOfLines = 1;
        }
    }
    ios.setWhiteSpace = setWhiteSpace;
    var collections;
    (function (collections) {
        function jsArrayToNSArray(str) {
            return NSArray.arrayWithArray(str);
        }
        collections.jsArrayToNSArray = jsArrayToNSArray;
        function nsArrayToJSArray(a) {
            var arr = [];
            if ("undefined" !== typeof a) {
                var count = a.count;
                for (var i = 0; i < count; i++) {
                    arr.push(a.objectAtIndex(i));
                }
            }
            return arr;
        }
        collections.nsArrayToJSArray = nsArrayToJSArray;
    })(collections = ios.collections || (ios.collections = {}));
    function getColor(uiColor) {
        var redRef = new interop.Reference();
        var greenRef = new interop.Reference();
        var blueRef = new interop.Reference();
        var alphaRef = new interop.Reference();
        uiColor.getRedGreenBlueAlpha(redRef, greenRef, blueRef, alphaRef);
        var red = redRef.value * 255;
        var green = greenRef.value * 255;
        var blue = blueRef.value * 255;
        var alpha = alphaRef.value * 255;
        return new color_1.Color(alpha, red, green, blue);
    }
    ios.getColor = getColor;
    function isLandscape() {
        var device = getter(UIDevice, UIDevice.currentDevice);
        var statusBarOrientation = getter(UIApplication, UIApplication.sharedApplication).statusBarOrientation;
        var isStatusBarOrientationLandscape = isOrientationLandscape(statusBarOrientation);
        return isOrientationLandscape(device.orientation) || isStatusBarOrientationLandscape;
    }
    ios.isLandscape = isLandscape;
    ios.MajorVersion = NSString.stringWithString(getter(UIDevice, UIDevice.currentDevice).systemVersion).intValue;
    function openFile(filePath) {
        try {
            var fs = require("file-system");
            var path = filePath.replace("~", fs.knownFolders.currentApp().path);
            var controller = UIDocumentInteractionController.interactionControllerWithURL(NSURL.fileURLWithPath(path));
            controller.delegate = new UIDocumentInteractionControllerDelegateImpl();
            return controller.presentPreviewAnimated(true);
        }
        catch (e) {
            ensureTrace();
            trace.write("Error in openFile", trace.categories.Error, trace.messageType.error);
        }
        return false;
    }
    ios.openFile = openFile;
})(ios = exports.ios || (exports.ios = {}));
function GC() {
    __collect();
}
exports.GC = GC;
function openUrl(location) {
    try {
        var url = NSURL.URLWithString(location.trim());
        if (ios.getter(UIApplication, UIApplication.sharedApplication).canOpenURL(url)) {
            return ios.getter(UIApplication, UIApplication.sharedApplication).openURL(url);
        }
    }
    catch (e) {
        ensureTrace();
        trace.write("Error in OpenURL", trace.categories.Error, trace.messageType.error);
    }
    return false;
}
exports.openUrl = openUrl;
var UIDocumentInteractionControllerDelegateImpl = (function (_super) {
    __extends(UIDocumentInteractionControllerDelegateImpl, _super);
    function UIDocumentInteractionControllerDelegateImpl() {
        _super.apply(this, arguments);
    }
    UIDocumentInteractionControllerDelegateImpl.prototype.getViewController = function () {
        var frame = require("ui/frame");
        return frame.topmost().currentPage.ios;
    };
    UIDocumentInteractionControllerDelegateImpl.prototype.documentInteractionControllerViewControllerForPreview = function (controller) {
        return this.getViewController();
    };
    UIDocumentInteractionControllerDelegateImpl.prototype.documentInteractionControllerViewForPreview = function (controller) {
        return this.getViewController().view;
    };
    UIDocumentInteractionControllerDelegateImpl.prototype.documentInteractionControllerRectForPreview = function (controller) {
        return this.getViewController().view.frame;
    };
    UIDocumentInteractionControllerDelegateImpl.ObjCProtocols = [UIDocumentInteractionControllerDelegate];
    return UIDocumentInteractionControllerDelegateImpl;
}(NSObject));
//# sourceMappingURL=utils.js.map