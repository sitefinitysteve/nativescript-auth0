var application = require("application");
var types = require("utils/types");
var trace = require("trace");
var dependency_observable_1 = require("ui/core/dependency-observable");
var color_1 = require("color");
var styleProperty = require("ui/styling/style-property");
var converters = require("./converters");
var enums = require("ui/enums");
var utils = require("utils/utils");
var font = require("ui/styling/font");
var background = require("ui/styling/background");
var platform = require("platform");
var imageSource;
function ensureImageSource() {
    if (!imageSource) {
        imageSource = require("image-source");
    }
}
var _registeredHandlers = Array();
var _handlersCache = {};
var noStylingClasses = {};
var AffectsLayout = platform.device.os === platform.platformNames.android ? dependency_observable_1.PropertyMetadataSettings.None : dependency_observable_1.PropertyMetadataSettings.AffectsLayout;
function parseMargin(value) {
    if (types.isString(value)) {
        var arr = value.split(/[ ,]+/);
        var top = void 0;
        var right = void 0;
        var bottom = void 0;
        var left = void 0;
        if (arr.length === 1) {
            top = right = bottom = left = arr[0];
        }
        else if (arr.length === 2) {
            top = bottom = arr[0];
            right = left = arr[1];
        }
        else if (arr.length === 3) {
            top = arr[0];
            right = left = arr[1];
            bottom = arr[2];
        }
        else if (arr.length === 4) {
            top = arr[0];
            right = arr[1];
            bottom = arr[2];
            left = arr[3];
        }
        else {
            throw new Error("Invalid value for margin: " + value);
        }
        return {
            top: top,
            right: right,
            bottom: bottom,
            left: left
        };
    }
    else if (types.isNumber(value)) {
        return {
            top: value,
            right: value,
            bottom: value,
            left: value
        };
    }
    else {
        return value;
    }
}
function layoutParamsComparer(x, y) {
    return x.width === y.width
        && x.height === y.height
        && x.leftMargin === y.leftMargin
        && x.topMargin === y.topMargin
        && x.rightMargin === y.rightMargin
        && x.bottomMargin === y.bottomMargin
        && x.horizontalAlignment === y.horizontalAlignment
        && x.verticalAlignment === y.verticalAlignment
        && x.widthPercent === y.widthPercent
        && x.heightPercent === y.heightPercent
        && x.leftMarginPercent === y.leftMarginPercent
        && x.topMarginPercent === y.topMarginPercent
        && x.rightMarginPercent === y.rightMarginPercent
        && x.bottomMarginPercent === y.bottomMarginPercent;
}
function onLayoutParamsChanged(data) {
    var style = data.object;
    var widthValue = convertToPercentHelper(style.width);
    var width;
    var widthPercent;
    if (widthValue.isPercent) {
        width = style.horizontalAlignment === enums.HorizontalAlignment.stretch ? -1 : -2;
        widthPercent = widthValue.value / 100;
    }
    else {
        width = isNaN(widthValue.value) ? -1 : widthValue.value;
        widthPercent = -1;
    }
    var heightValue = convertToPercentHelper(style.height);
    var height;
    var heightPercent;
    if (heightValue.isPercent) {
        height = style.verticalAlignment === enums.VerticalAlignment.stretch ? -1 : -2;
        heightPercent = heightValue.value / 100;
    }
    else {
        height = isNaN(heightValue.value) ? -1 : heightValue.value;
        heightPercent = -1;
    }
    var marginLeftValue = convertToPercentHelper(style.marginLeft);
    var marginTopValue = convertToPercentHelper(style.marginTop);
    var marginRightValue = convertToPercentHelper(style.marginRight);
    var marginBottomValue = convertToPercentHelper(style.marginBottom);
    var layoutParams = {
        width: width,
        height: height,
        widthPercent: widthPercent,
        heightPercent: heightPercent,
        leftMargin: marginLeftValue.isPercent ? 0 : marginLeftValue.value,
        leftMarginPercent: marginLeftValue.isPercent ? marginLeftValue.value / 100 : -1,
        topMargin: marginTopValue.isPercent ? 0 : marginTopValue.value,
        topMarginPercent: marginTopValue.isPercent ? marginTopValue.value / 100 : -1,
        rightMargin: marginRightValue.isPercent ? 0 : marginRightValue.value,
        rightMarginPercent: marginRightValue.isPercent ? marginRightValue.value / 100 : -1,
        bottomMargin: marginBottomValue.isPercent ? 0 : marginBottomValue.value,
        bottomMarginPercent: marginBottomValue.isPercent ? marginBottomValue.value / 100 : -1,
        horizontalAlignment: style.horizontalAlignment,
        verticalAlignment: style.verticalAlignment
    };
    style._setValue(exports.nativeLayoutParamsProperty, layoutParams);
}
function onPaddingValueChanged(data) {
    var style = data.object;
    var thickness = {
        top: style.paddingTop,
        right: style.paddingRight,
        bottom: style.paddingBottom,
        left: style.paddingLeft
    };
    style._setValue(exports.nativePaddingsProperty, thickness);
}
function thicknessComparer(x, y) {
    if (x && y) {
        return x.left === y.left && x.top === y.top && x.right === y.right && x.bottom === y.bottom;
    }
    return !x === !y;
}
function convertToPercentHelper(value) {
    var numberValue = 0;
    var isPercent = false;
    var isError = true;
    if (types.isString(value)) {
        var stringValue = value.trim();
        var percentIndex = stringValue.indexOf("%");
        if (percentIndex !== -1) {
            if (percentIndex !== (stringValue.length - 1) || percentIndex === 0) {
                numberValue = 0;
            }
            else {
                isPercent = true;
                numberValue = converters.numberConverter(stringValue.substring(0, stringValue.length - 1).trim());
                isError = numberValue === 0;
            }
        }
        else {
            isError = false;
            isPercent = false;
            numberValue = converters.numberConverter(stringValue);
        }
    }
    else if (types.isNumber(value)) {
        isError = false;
        isPercent = false;
        numberValue = value;
    }
    return {
        isError: isError,
        isPercent: isPercent,
        value: numberValue
    };
}
function numberOrPercentConverter(value) {
    var result = convertToPercentHelper(value);
    if (result.isError) {
        throw new Error("Invalid value: " + value);
    }
    return result.isPercent ? value : result.value;
}
function isWidthHeightValid(value) {
    var result = convertToPercentHelper(value);
    if (result.isError) {
        return false;
    }
    return isNaN(result.value) || (result.value >= 0.0 && isFinite(result.value));
}
function isMinWidthHeightValid(value) {
    return !isNaN(value) && value >= 0.0 && isFinite(value);
}
function getHandlerInternal(propertyId, classInfo) {
    var className = classInfo ? classInfo.name : "default";
    var handlerKey = className + propertyId;
    var result = _handlersCache[handlerKey];
    if (types.isDefined(result)) {
        return result;
    }
    var propertyHandlers = _registeredHandlers[propertyId];
    if (noStylingClasses.hasOwnProperty(className) || !propertyHandlers) {
        result = null;
    }
    else if (propertyHandlers.hasOwnProperty(className)) {
        result = propertyHandlers[className];
    }
    else if (classInfo) {
        result = getHandlerInternal(propertyId, classInfo.baseClassInfo);
    }
    else {
        result = null;
    }
    _handlersCache[handlerKey] = result;
    return result;
}
function isVisibilityValid(value) {
    return value === enums.Visibility.visible || value === enums.Visibility.collapse || value === enums.Visibility.collapsed;
}
function isTextDecorationValid(value) {
    var values = (value + "").split(" ");
    return values.indexOf(enums.TextDecoration.none) !== -1 || values.indexOf(enums.TextDecoration.underline) !== -1 || values.indexOf(enums.TextDecoration.lineThrough) !== -1;
}
function isTextTransformValid(value) {
    return value === enums.TextTransform.none || value === enums.TextTransform.uppercase || value === enums.TextTransform.lowercase || value === enums.TextTransform.capitalize;
}
function isWhiteSpaceValid(value) {
    return value === enums.WhiteSpace.nowrap || value === enums.WhiteSpace.normal;
}
function isNonNegativeFiniteNumber(value) {
    return isFinite(value) && !isNaN(value) && value >= 0;
}
var supportedPaths = ["rect", "circle", "ellipse", "polygon", "inset"];
function isClipPathValid(value) {
    if (!value) {
        return true;
    }
    var functionName = value.substring(0, value.indexOf("(")).trim();
    return supportedPaths.indexOf(functionName) !== -1;
}
function isMarginValid(value) {
    var result = convertToPercentHelper(value);
    if (result.isError) {
        return false;
    }
    return isFinite(result.value) && !isNaN(result.value);
}
function isOpacityValid(value) {
    var parsedValue = parseFloat(value);
    return !isNaN(parsedValue) && 0 <= parsedValue && parsedValue <= 1;
}
function isFloatValueValid(value) {
    var parsedValue = parseFloat(value);
    return !isNaN(parsedValue);
}
function isFontWeightValid(value) {
    if (!value) {
        console.trace();
    }
    return value === enums.FontWeight.thin
        || value === enums.FontWeight.extraLight
        || value === enums.FontWeight.light
        || value === enums.FontWeight.normal || value === "400"
        || value === enums.FontWeight.medium
        || value === enums.FontWeight.semiBold
        || value === enums.FontWeight.bold || value === "700"
        || value === enums.FontWeight.extraBold
        || value === enums.FontWeight.black;
}
function isFontStyleValid(value) {
    return value === enums.FontStyle.normal || value === enums.FontStyle.italic;
}
function onVisibilityChanged(data) {
    data.object._view._isVisibleCache = data.newValue === enums.Visibility.visible;
}
function onFontFamilyChanged(data) {
    var style = data.object;
    var currentFont = style._getValue(exports.fontInternalProperty);
    if (currentFont.fontFamily !== data.newValue) {
        style._setValue(exports.fontInternalProperty, currentFont.withFontFamily(data.newValue));
    }
}
function onFontStyleChanged(data) {
    var style = data.object;
    var currentFont = style._getValue(exports.fontInternalProperty);
    if (currentFont.fontStyle !== data.newValue) {
        style._setValue(exports.fontInternalProperty, currentFont.withFontStyle(data.newValue));
    }
}
function onFontWeightChanged(data) {
    var style = data.object;
    var currentFont = style._getValue(exports.fontInternalProperty);
    if (currentFont.fontWeight !== data.newValue) {
        style._setValue(exports.fontInternalProperty, currentFont.withFontWeight(data.newValue));
    }
}
function onFontSizeChanged(data) {
    var style = data.object;
    var currentFont = style._getValue(exports.fontInternalProperty);
    if (currentFont.fontSize !== data.newValue) {
        style._setValue(exports.fontInternalProperty, currentFont.withFontSize(data.newValue));
    }
}
var Style = (function (_super) {
    __extends(Style, _super);
    function Style(parentView) {
        _super.call(this);
        this._updateCounter = 0;
        this._nativeSetters = new Map();
        this._view = parentView;
    }
    Object.defineProperty(Style.prototype, "rotate", {
        get: function () {
            return this._getValue(exports.rotateProperty);
        },
        set: function (value) {
            this._setValue(exports.rotateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "scaleX", {
        get: function () {
            return this._getValue(exports.scaleXProperty);
        },
        set: function (value) {
            this._setValue(exports.scaleXProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "scaleY", {
        get: function () {
            return this._getValue(exports.scaleYProperty);
        },
        set: function (value) {
            this._setValue(exports.scaleYProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "translateX", {
        get: function () {
            return this._getValue(exports.translateXProperty);
        },
        set: function (value) {
            this._setValue(exports.translateXProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "translateY", {
        get: function () {
            return this._getValue(exports.translateYProperty);
        },
        set: function (value) {
            this._setValue(exports.translateYProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "color", {
        get: function () {
            return this._getValue(exports.colorProperty);
        },
        set: function (value) {
            this._setValue(exports.colorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "tintColor", {
        get: function () {
            return this._getValue(exports.tintColorProperty);
        },
        set: function (value) {
            this._setValue(exports.tintColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "placeholderColor", {
        get: function () {
            return this._getValue(exports.placeholderColorProperty);
        },
        set: function (value) {
            this._setValue(exports.placeholderColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "backgroundColor", {
        get: function () {
            return this._getValue(exports.backgroundColorProperty);
        },
        set: function (value) {
            this._setValue(exports.backgroundColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "backgroundImage", {
        get: function () {
            return this._getValue(exports.backgroundImageProperty);
        },
        set: function (value) {
            this._setValue(exports.backgroundImageProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "backgroundRepeat", {
        get: function () {
            return this._getValue(exports.backgroundRepeatProperty);
        },
        set: function (value) {
            this._setValue(exports.backgroundRepeatProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "backgroundSize", {
        get: function () {
            return this._getValue(exports.backgroundSizeProperty);
        },
        set: function (value) {
            this._setValue(exports.backgroundSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "backgroundPosition", {
        get: function () {
            return this._getValue(exports.backgroundPositionProperty);
        },
        set: function (value) {
            this._setValue(exports.backgroundPositionProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderColor", {
        get: function () {
            if (color_1.Color.equals(this.borderTopColor, this.borderRightColor) &&
                color_1.Color.equals(this.borderTopColor, this.borderBottomColor) &&
                color_1.Color.equals(this.borderTopColor, this.borderLeftColor)) {
                return this.borderTopColor;
            }
            else {
                return this.borderTopColor + " " + this.borderRightColor + " " + this.borderBottomColor + " " + this.borderLeftColor;
            }
        },
        set: function (value) {
            if (value instanceof color_1.Color) {
                value = value.hex;
            }
            this._setShorthandProperty("border-color", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderTopColor", {
        get: function () {
            return this._getValue(exports.borderTopColorProperty);
        },
        set: function (value) {
            this._setValue(exports.borderTopColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderRightColor", {
        get: function () {
            return this._getValue(exports.borderRightColorProperty);
        },
        set: function (value) {
            this._setValue(exports.borderRightColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderBottomColor", {
        get: function () {
            return this._getValue(exports.borderBottomColorProperty);
        },
        set: function (value) {
            this._setValue(exports.borderBottomColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderLeftColor", {
        get: function () {
            return this._getValue(exports.borderLeftColorProperty);
        },
        set: function (value) {
            this._setValue(exports.borderLeftColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderWidth", {
        get: function () {
            if (this.borderTopWidth === this.borderRightWidth &&
                this.borderTopWidth === this.borderBottomWidth &&
                this.borderTopWidth === this.borderLeftWidth) {
                return this.borderTopWidth;
            }
            else {
                return this.borderTopWidth + " " + this.borderRightWidth + " " + this.borderBottomWidth + " " + this.borderLeftWidth;
            }
        },
        set: function (value) {
            this._setShorthandProperty("border-width", value.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderTopWidth", {
        get: function () {
            return this._getValue(exports.borderTopWidthProperty);
        },
        set: function (value) {
            this._setValue(exports.borderTopWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderRightWidth", {
        get: function () {
            return this._getValue(exports.borderRightWidthProperty);
        },
        set: function (value) {
            this._setValue(exports.borderRightWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderBottomWidth", {
        get: function () {
            return this._getValue(exports.borderBottomWidthProperty);
        },
        set: function (value) {
            this._setValue(exports.borderBottomWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderLeftWidth", {
        get: function () {
            return this._getValue(exports.borderLeftWidthProperty);
        },
        set: function (value) {
            this._setValue(exports.borderLeftWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderRadius", {
        get: function () {
            if (this.borderTopLeftRadius === this.borderTopRightRadius &&
                this.borderTopLeftRadius === this.borderBottomRightRadius &&
                this.borderTopLeftRadius === this.borderBottomLeftRadius) {
                return this.borderTopLeftRadius;
            }
            else {
                return this.borderTopLeftRadius + " " + this.borderTopRightRadius + " " + this.borderBottomRightRadius + " " + this.borderBottomLeftRadius;
            }
        },
        set: function (value) {
            this._setShorthandProperty("border-radius", value.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderTopLeftRadius", {
        get: function () {
            return this._getValue(exports.borderTopLeftRadiusProperty);
        },
        set: function (value) {
            this._setValue(exports.borderTopLeftRadiusProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderTopRightRadius", {
        get: function () {
            return this._getValue(exports.borderTopRightRadiusProperty);
        },
        set: function (value) {
            this._setValue(exports.borderTopRightRadiusProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderBottomRightRadius", {
        get: function () {
            return this._getValue(exports.borderBottomRightRadiusProperty);
        },
        set: function (value) {
            this._setValue(exports.borderBottomRightRadiusProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "borderBottomLeftRadius", {
        get: function () {
            return this._getValue(exports.borderBottomLeftRadiusProperty);
        },
        set: function (value) {
            this._setValue(exports.borderBottomLeftRadiusProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "clipPath", {
        get: function () {
            return this._getValue(exports.clipPathProperty);
        },
        set: function (value) {
            this._setValue(exports.clipPathProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "fontSize", {
        get: function () {
            return this._getValue(exports.fontSizeProperty);
        },
        set: function (value) {
            this._setValue(exports.fontSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "fontFamily", {
        get: function () {
            return this._getValue(exports.fontFamilyProperty);
        },
        set: function (value) {
            this._setValue(exports.fontFamilyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "fontStyle", {
        get: function () {
            return this._getValue(exports.fontStyleProperty);
        },
        set: function (value) {
            this._setValue(exports.fontStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "fontWeight", {
        get: function () {
            return this._getValue(exports.fontWeightProperty);
        },
        set: function (value) {
            var stringValue = value ? value.toString() : undefined;
            this._setValue(exports.fontWeightProperty, stringValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "font", {
        get: function () {
            return this.fontStyle + " " + this.fontWeight + " " + this.fontSize + " " + this.fontFamily;
        },
        set: function (value) {
            this._setShorthandProperty("font", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "_fontInternal", {
        get: function () {
            return this._getValue(exports.fontInternalProperty);
        },
        set: function (value) {
            this._setValue(exports.fontInternalProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "textAlignment", {
        get: function () {
            return this._getValue(exports.textAlignmentProperty);
        },
        set: function (value) {
            this._setValue(exports.textAlignmentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "minWidth", {
        get: function () {
            return this._getValue(exports.minWidthProperty);
        },
        set: function (value) {
            this._setValue(exports.minWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "minHeight", {
        get: function () {
            return this._getValue(exports.minHeightProperty);
        },
        set: function (value) {
            this._setValue(exports.minHeightProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "width", {
        get: function () {
            return this._getValue(exports.widthProperty);
        },
        set: function (value) {
            this._setValue(exports.widthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "height", {
        get: function () {
            return this._getValue(exports.heightProperty);
        },
        set: function (value) {
            this._setValue(exports.heightProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "margin", {
        get: function () {
            return this.marginTop + " " + this.marginRight + " " + this.marginBottom + " " + this.marginLeft;
        },
        set: function (value) {
            this._setShorthandProperty("margin", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "marginLeft", {
        get: function () {
            return this._getValue(exports.marginLeftProperty);
        },
        set: function (value) {
            this._setValue(exports.marginLeftProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "marginTop", {
        get: function () {
            return this._getValue(exports.marginTopProperty);
        },
        set: function (value) {
            this._setValue(exports.marginTopProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "marginRight", {
        get: function () {
            return this._getValue(exports.marginRightProperty);
        },
        set: function (value) {
            this._setValue(exports.marginRightProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "marginBottom", {
        get: function () {
            return this._getValue(exports.marginBottomProperty);
        },
        set: function (value) {
            this._setValue(exports.marginBottomProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "padding", {
        get: function () {
            return this.paddingTop + " " + this.paddingRight + " " + this.paddingBottom + " " + this.paddingLeft;
        },
        set: function (value) {
            this._setShorthandProperty("padding", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "paddingLeft", {
        get: function () {
            return this._getValue(exports.paddingLeftProperty);
        },
        set: function (value) {
            this._setValue(exports.paddingLeftProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "paddingTop", {
        get: function () {
            return this._getValue(exports.paddingTopProperty);
        },
        set: function (value) {
            this._setValue(exports.paddingTopProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "paddingRight", {
        get: function () {
            return this._getValue(exports.paddingRightProperty);
        },
        set: function (value) {
            this._setValue(exports.paddingRightProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "paddingBottom", {
        get: function () {
            return this._getValue(exports.paddingBottomProperty);
        },
        set: function (value) {
            this._setValue(exports.paddingBottomProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "horizontalAlignment", {
        get: function () {
            return this._getValue(exports.horizontalAlignmentProperty);
        },
        set: function (value) {
            this._setValue(exports.horizontalAlignmentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "verticalAlignment", {
        get: function () {
            return this._getValue(exports.verticalAlignmentProperty);
        },
        set: function (value) {
            this._setValue(exports.verticalAlignmentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "visibility", {
        get: function () {
            return this._getValue(exports.visibilityProperty);
        },
        set: function (value) {
            this._setValue(exports.visibilityProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "opacity", {
        get: function () {
            return this._getValue(exports.opacityProperty);
        },
        set: function (value) {
            this._setValue(exports.opacityProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "textDecoration", {
        get: function () {
            return this._getValue(exports.textDecorationProperty);
        },
        set: function (value) {
            this._setValue(exports.textDecorationProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "textTransform", {
        get: function () {
            return this._getValue(exports.textTransformProperty);
        },
        set: function (value) {
            this._setValue(exports.textTransformProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "whiteSpace", {
        get: function () {
            return this._getValue(exports.whiteSpaceProperty);
        },
        set: function (value) {
            this._setValue(exports.whiteSpaceProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "letterSpacing", {
        get: function () {
            return this._getValue(exports.letterSpacingProperty);
        },
        set: function (value) {
            this._setValue(exports.letterSpacingProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "zIndex", {
        get: function () {
            return this._getValue(exports.zIndexProperty);
        },
        set: function (value) {
            this._setValue(exports.zIndexProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "statusBarStyle", {
        get: function () {
            return this._getValue(exports.statusBarStyleProperty);
        },
        set: function (value) {
            this._setValue(exports.statusBarStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "androidStatusBarBackground", {
        get: function () {
            return this._getValue(exports.androidStatusBarBackgroundProperty);
        },
        set: function (value) {
            this._setValue(exports.androidStatusBarBackgroundProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "tabTextColor", {
        get: function () {
            return this._getValue(exports.tabTextColorProperty);
        },
        set: function (value) {
            this._setValue(exports.tabTextColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "tabBackgroundColor", {
        get: function () {
            return this._getValue(exports.tabBackgroundColorProperty);
        },
        set: function (value) {
            this._setValue(exports.tabBackgroundColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "selectedTabTextColor", {
        get: function () {
            return this._getValue(exports.selectedTabTextColorProperty);
        },
        set: function (value) {
            this._setValue(exports.selectedTabTextColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "androidSelectedTabHighlightColor", {
        get: function () {
            return this._getValue(exports.androidSelectedTabHighlightColorProperty);
        },
        set: function (value) {
            this._setValue(exports.androidSelectedTabHighlightColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "selectedBackgroundColor", {
        get: function () {
            return this._getValue(exports.selectedBackgroundColorProperty);
        },
        set: function (value) {
            this._setValue(exports.selectedBackgroundColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "separatorColor", {
        get: function () {
            return this._getValue(exports.separatorColorProperty);
        },
        set: function (value) {
            this._setValue(exports.separatorColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Style.prototype._updateTextDecoration = function () {
        if (this._getValue(exports.textDecorationProperty) !== enums.TextDecoration.none) {
            this._applyProperty(exports.textDecorationProperty, this._getValue(exports.textDecorationProperty));
        }
    };
    Style.prototype._updateTextTransform = function () {
        if (this._getValue(exports.textTransformProperty) !== enums.TextTransform.none) {
            this._applyProperty(exports.textTransformProperty, this._getValue(exports.textTransformProperty));
        }
    };
    Style.prototype._beginUpdate = function () {
        this._updateCounter++;
    };
    Style.prototype._endUpdate = function () {
        var _this = this;
        this._updateCounter--;
        if (this._updateCounter < 0) {
            throw new Error("style._endUpdate() called, but no update is in progress.");
        }
        if (this._updateCounter === 0) {
            this._nativeSetters.forEach(function (newValue, property, map) { _this._applyStyleProperty(property, newValue); });
            this._nativeSetters.clear();
        }
    };
    Style.prototype._resetCssValues = function () {
        this._view._unregisterAllAnimations();
        this._resetValues(dependency_observable_1.ValueSource.Css);
    };
    Style.prototype._resetLocalValues = function () {
        this._resetValues(dependency_observable_1.ValueSource.Local);
    };
    Style.prototype._inheritStyleProperties = function (parent) {
        var _this = this;
        parent.style._eachSetPropertyValue(function (property, value) {
            if (property.inheritable) {
                _this._setValue(property, value, dependency_observable_1.ValueSource.Inherited);
            }
            return true;
        });
    };
    Style.prototype._onPropertyChanged = function (property, oldValue, newValue) {
        if (trace.enabled) {
            trace.write("Style._onPropertyChanged view:" + this._view +
                ", property: " + property.name +
                ", oldValue: " + oldValue +
                ", newValue: " + newValue, trace.categories.Style);
        }
        _super.prototype._onPropertyChanged.call(this, property, oldValue, newValue);
        this._view._checkMetadataOnPropertyChanged(property.metadata);
        this._applyProperty(property, newValue);
    };
    Style.prototype._sizeChanged = function () {
        if (!this._getValue(exports.backgroundInternalProperty).isEmpty()) {
            this._applyStyleProperty(exports.backgroundInternalProperty, this._getValue(exports.backgroundInternalProperty));
        }
        var clipPathPropertyValue = this._getValue(exports.clipPathProperty);
        if (types.isString(clipPathPropertyValue) && clipPathPropertyValue !== "") {
            this._applyStyleProperty(exports.clipPathProperty, clipPathPropertyValue);
        }
    };
    Style.prototype._syncNativeProperties = function () {
        var _this = this;
        this._eachSetPropertyValue(function (property, value) {
            _this._applyStyleProperty(property, value);
            return true;
        });
    };
    Style.prototype._applyProperty = function (property, newValue) {
        this._applyStyleProperty(property, newValue);
        if (property.inheritable && this._view._childrenCount > 0) {
            this._view._eachChildView(function (child) {
                child.style._setValue(property, newValue, dependency_observable_1.ValueSource.Inherited);
                return true;
            });
        }
    };
    Style.prototype._applyStyleProperty = function (property, newValue) {
        if (!this._view._shouldApplyStyleHandlers()) {
            return;
        }
        if (this._updateCounter > 0) {
            this._nativeSetters.set(property, newValue);
            return;
        }
        var handler = getHandler(property, this._view);
        if (!handler) {
            if (trace.enabled) {
                trace.write("No handler for property: " + property.name + " with id: " + property.id + ", view:" + this._view, trace.categories.Style);
            }
        }
        else {
            if (trace.enabled) {
                trace.write("Found handler for property: " + property.name + ", view:" + this._view, trace.categories.Style);
            }
            var shouldReset = false;
            if (property.equalityComparer) {
                shouldReset = property.equalityComparer(newValue, property.defaultValue);
            }
            else {
                shouldReset = (newValue === property.defaultValue);
            }
            if (shouldReset) {
                handler.resetProperty(property, this._view);
            }
            else {
                handler.applyProperty(property, this._view, newValue);
            }
            this._view._onStylePropertyChanged(property);
        }
    };
    Object.defineProperty(Style.prototype, "_nativeView", {
        get: function () {
            return this._view._nativeView;
        },
        enumerable: true,
        configurable: true
    });
    Style.prototype._setShorthandProperty = function (name, value) {
        var pairs = styleProperty.getShorthandPairs(name, value);
        if (pairs) {
            this._beginUpdate();
            for (var j = 0; j < pairs.length; j++) {
                var pair = pairs[j];
                this._setValue(pair.property, pair.value, dependency_observable_1.ValueSource.Local);
            }
            this._endUpdate();
        }
    };
    return Style;
}(dependency_observable_1.DependencyObservable));
exports.Style = Style;
function registerHandler(property, handler, className) {
    var realClassName = className ? className : "default";
    var handlerRecord = _registeredHandlers[property.id];
    if (!handlerRecord) {
        handlerRecord = {};
        _registeredHandlers[property.id] = handlerRecord;
    }
    handlerRecord[realClassName] = handler;
}
exports.registerHandler = registerHandler;
function registerNoStylingClass(className) {
    noStylingClasses[className] = 1;
}
exports.registerNoStylingClass = registerNoStylingClass;
function getHandler(property, view) {
    return getHandlerInternal(property.id, types.getClassInfo(view));
}
exports.getHandler = getHandler;
exports.rotateProperty = new styleProperty.Property("rotate", "rotate", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, null));
exports.scaleXProperty = new styleProperty.Property("scaleX", "scaleX", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, null));
exports.scaleYProperty = new styleProperty.Property("scaleY", "scaleY", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, null));
exports.translateXProperty = new styleProperty.Property("translateX", "translateX", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, null));
exports.translateYProperty = new styleProperty.Property("translateY", "translateY", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, null));
exports.colorProperty = new styleProperty.Property("color", "color", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.Inheritable, undefined, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.tintColorProperty = new styleProperty.Property("tintColor", "tint-color", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.Inheritable, undefined, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.placeholderColorProperty = new styleProperty.Property("placeholderColor", "placeholder-color", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, undefined, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.fontSizeProperty = new styleProperty.Property("fontSize", "font-size", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.Inheritable, onFontSizeChanged), converters.fontSizeConverter);
exports.fontFamilyProperty = new styleProperty.Property("fontFamily", "font-family", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.Inheritable, onFontFamilyChanged));
exports.fontStyleProperty = new styleProperty.Property("fontStyle", "font-style", new dependency_observable_1.PropertyMetadata(enums.FontStyle.normal, dependency_observable_1.PropertyMetadataSettings.Inheritable, onFontStyleChanged, isFontStyleValid));
exports.fontWeightProperty = new styleProperty.Property("fontWeight", "font-weight", new dependency_observable_1.PropertyMetadata(enums.FontWeight.normal, dependency_observable_1.PropertyMetadataSettings.Inheritable, onFontWeightChanged, isFontWeightValid));
exports.fontInternalProperty = new styleProperty.Property("_fontInternal", "_fontInternal", new dependency_observable_1.PropertyMetadata(font.Font.default, AffectsLayout, null, null, font.Font.equals), font.Font.parse);
exports.textAlignmentProperty = new styleProperty.Property("textAlignment", "text-align", new dependency_observable_1.PropertyMetadata(undefined, AffectsLayout | dependency_observable_1.PropertyMetadataSettings.Inheritable), converters.textAlignConverter);
exports.minWidthProperty = new styleProperty.Property("minWidth", "min-width", new dependency_observable_1.PropertyMetadata(0, AffectsLayout, null, isMinWidthHeightValid), converters.numberConverter);
exports.minHeightProperty = new styleProperty.Property("minHeight", "min-height", new dependency_observable_1.PropertyMetadata(0, AffectsLayout, null, isMinWidthHeightValid), converters.numberConverter);
exports.visibilityProperty = new styleProperty.Property("visibility", "visibility", new dependency_observable_1.PropertyMetadata(enums.Visibility.visible, AffectsLayout, onVisibilityChanged, isVisibilityValid), converters.visibilityConverter);
exports.opacityProperty = new styleProperty.Property("opacity", "opacity", new dependency_observable_1.PropertyMetadata(1.0, dependency_observable_1.PropertyMetadataSettings.None, undefined, isOpacityValid), converters.opacityConverter);
exports.textDecorationProperty = new styleProperty.Property("textDecoration", "text-decoration", new dependency_observable_1.PropertyMetadata(enums.TextDecoration.none, dependency_observable_1.PropertyMetadataSettings.None, undefined, isTextDecorationValid), converters.textDecorationConverter);
exports.textTransformProperty = new styleProperty.Property("textTransform", "text-transform", new dependency_observable_1.PropertyMetadata(enums.TextTransform.none, dependency_observable_1.PropertyMetadataSettings.None, undefined, isTextTransformValid), converters.textTransformConverter);
exports.whiteSpaceProperty = new styleProperty.Property("whiteSpace", "white-space", new dependency_observable_1.PropertyMetadata(undefined, AffectsLayout, undefined, isWhiteSpaceValid), converters.whiteSpaceConverter);
exports.letterSpacingProperty = new styleProperty.Property("letterSpacing", "letter-spacing", new dependency_observable_1.PropertyMetadata(Number.NaN, AffectsLayout, undefined, isFloatValueValid), converters.floatConverter);
exports.zIndexProperty = new styleProperty.Property("zIndex", "z-index", new dependency_observable_1.PropertyMetadata(Number.NaN, AffectsLayout, undefined, isFloatValueValid), converters.floatConverter);
exports.tabTextColorProperty = new styleProperty.Property("tabTextColor", "tab-text-color", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, undefined, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.tabBackgroundColorProperty = new styleProperty.Property("tabBackgroundColor", "tab-background-color", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, undefined, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.selectedTabTextColorProperty = new styleProperty.Property("selectedTabTextColor", "selected-tab-text-color", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, undefined, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.androidSelectedTabHighlightColorProperty = new styleProperty.Property("androidSelectedTabHighlightColor", "android-selected-tab-highlight-color", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, undefined, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.statusBarStyleProperty = new styleProperty.Property("statusBarStyle", "status-bar-style", new dependency_observable_1.PropertyMetadata(undefined));
exports.androidStatusBarBackgroundProperty = new styleProperty.Property("androidStatusBarBackground", "android-status-bar-background", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, undefined, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.selectedBackgroundColorProperty = new styleProperty.Property("selectedBackgroundColor", "selected-background-color", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, undefined, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.separatorColorProperty = new styleProperty.Property("separatorColor", "separator-color", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, undefined, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.nativeLayoutParamsProperty = new styleProperty.Property("nativeLayoutParams", "nativeLayoutParams", new dependency_observable_1.PropertyMetadata({
    width: -1,
    widthPercent: -1,
    height: -1,
    heightPercent: -1,
    leftMargin: 0,
    leftMarginPercent: -1,
    topMargin: 0,
    topMarginPercent: -1,
    rightMargin: 0,
    rightMarginPercent: -1,
    bottomMargin: 0,
    bottomMarginPercent: -1,
    horizontalAlignment: enums.HorizontalAlignment.stretch,
    verticalAlignment: enums.VerticalAlignment.stretch
}, null, null, null, layoutParamsComparer));
exports.widthProperty = new styleProperty.Property("width", "width", new dependency_observable_1.PropertyMetadata(Number.NaN, AffectsLayout, onLayoutParamsChanged, isWidthHeightValid), numberOrPercentConverter);
exports.heightProperty = new styleProperty.Property("height", "height", new dependency_observable_1.PropertyMetadata(Number.NaN, AffectsLayout, onLayoutParamsChanged, isWidthHeightValid), numberOrPercentConverter);
exports.marginLeftProperty = new styleProperty.Property("marginLeft", "margin-left", new dependency_observable_1.PropertyMetadata(0, AffectsLayout, onLayoutParamsChanged, isMarginValid), numberOrPercentConverter);
exports.marginRightProperty = new styleProperty.Property("marginRight", "margin-right", new dependency_observable_1.PropertyMetadata(0, AffectsLayout, onLayoutParamsChanged, isMarginValid), numberOrPercentConverter);
exports.marginTopProperty = new styleProperty.Property("marginTop", "margin-top", new dependency_observable_1.PropertyMetadata(0, AffectsLayout, onLayoutParamsChanged, isMarginValid), numberOrPercentConverter);
exports.marginBottomProperty = new styleProperty.Property("marginBottom", "margin-bottom", new dependency_observable_1.PropertyMetadata(0, AffectsLayout, onLayoutParamsChanged, isMarginValid), numberOrPercentConverter);
exports.verticalAlignmentProperty = new styleProperty.Property("verticalAlignment", "vertical-align", new dependency_observable_1.PropertyMetadata(enums.VerticalAlignment.stretch, AffectsLayout, onLayoutParamsChanged));
exports.horizontalAlignmentProperty = new styleProperty.Property("horizontalAlignment", "horizontal-align", new dependency_observable_1.PropertyMetadata(enums.HorizontalAlignment.stretch, AffectsLayout, onLayoutParamsChanged));
function getNativePadding(nativeView, callback) {
    return {
        result: nativeView ? callback(nativeView) / utils.layout.getDisplayDensity() : 0,
        cacheable: !!nativeView
    };
}
function getNativePaddingLeft(instance) {
    var nativeView = instance._nativeView;
    return getNativePadding(nativeView, function (view) { return view.getPaddingLeft(); });
}
function getNativePaddingTop(instance) {
    var nativeView = instance._nativeView;
    return getNativePadding(nativeView, function (view) { return view.getPaddingTop(); });
}
function getNativePaddingRight(instance) {
    var nativeView = instance._nativeView;
    return getNativePadding(nativeView, function (view) { return view.getPaddingRight(); });
}
function getNativePaddingBottom(instance) {
    var nativeView = instance._nativeView;
    return getNativePadding(nativeView, function (view) { return view.getPaddingBottom(); });
}
exports.nativePaddingsProperty = new styleProperty.Property("paddingNative", "paddingNative", new dependency_observable_1.PropertyMetadata(undefined, null, null, null, thicknessComparer));
var defaultPadding = platform.isAndroid ? undefined : 0;
exports.paddingLeftProperty = new styleProperty.Property("paddingLeft", "padding-left", new dependency_observable_1.PropertyMetadata(defaultPadding, AffectsLayout, onPaddingValueChanged, isNonNegativeFiniteNumber), converters.numberConverter);
exports.paddingRightProperty = new styleProperty.Property("paddingRight", "padding-right", new dependency_observable_1.PropertyMetadata(defaultPadding, AffectsLayout, onPaddingValueChanged, isNonNegativeFiniteNumber), converters.numberConverter);
exports.paddingTopProperty = new styleProperty.Property("paddingTop", "padding-top", new dependency_observable_1.PropertyMetadata(defaultPadding, AffectsLayout, onPaddingValueChanged, isNonNegativeFiniteNumber), converters.numberConverter);
exports.paddingBottomProperty = new styleProperty.Property("paddingBottom", "padding-bottom", new dependency_observable_1.PropertyMetadata(defaultPadding, AffectsLayout, onPaddingValueChanged, isNonNegativeFiniteNumber), converters.numberConverter);
if (platform.device.os === platform.platformNames.android) {
    exports.paddingTopProperty.defaultValueGetter = getNativePaddingTop;
    exports.paddingLeftProperty.defaultValueGetter = getNativePaddingLeft;
    exports.paddingRightProperty.defaultValueGetter = getNativePaddingRight;
    exports.paddingBottomProperty.defaultValueGetter = getNativePaddingBottom;
}
function onPaddingChanged(value) {
    var thickness = parseThickness(value);
    var array = new Array();
    array.push({ property: exports.paddingTopProperty, value: thickness.top });
    array.push({ property: exports.paddingRightProperty, value: thickness.right });
    array.push({ property: exports.paddingBottomProperty, value: thickness.bottom });
    array.push({ property: exports.paddingLeftProperty, value: thickness.left });
    return array;
}
function onMarginChanged(value) {
    var thickness = parseMargin(value);
    var array = new Array();
    array.push({ property: exports.marginTopProperty, value: thickness.top });
    array.push({ property: exports.marginRightProperty, value: thickness.right });
    array.push({ property: exports.marginBottomProperty, value: thickness.bottom });
    array.push({ property: exports.marginLeftProperty, value: thickness.left });
    return array;
}
function onFontChanged(value) {
    var newFont = font.Font.parse(value);
    var array = new Array();
    array.push({ property: exports.fontFamilyProperty, value: newFont.fontFamily });
    array.push({ property: exports.fontStyleProperty, value: newFont.fontStyle });
    array.push({ property: exports.fontWeightProperty, value: newFont.fontWeight });
    array.push({ property: exports.fontSizeProperty, value: newFont.fontSize });
    return array;
}
function onTransformChanged(value) {
    var newTransform = converters.transformConverter(value);
    var array = new Array();
    var values = undefined;
    for (var transform in newTransform) {
        switch (transform) {
            case "scaleX":
                array.push({ property: exports.scaleXProperty, value: parseFloat(newTransform[transform]) });
                break;
            case "scaleY":
                array.push({ property: exports.scaleYProperty, value: parseFloat(newTransform[transform]) });
                break;
            case "scale":
            case "scale3d":
                values = newTransform[transform].split(",");
                if (values.length >= 2) {
                    array.push({ property: exports.scaleXProperty, value: parseFloat(values[0]) });
                    array.push({ property: exports.scaleYProperty, value: parseFloat(values[1]) });
                }
                else if (values.length === 1) {
                    array.push({ property: exports.scaleXProperty, value: parseFloat(values[0]) });
                    array.push({ property: exports.scaleYProperty, value: parseFloat(values[0]) });
                }
                break;
            case "translateX":
                array.push({ property: exports.translateXProperty, value: parseFloat(newTransform[transform]) });
                break;
            case "translateY":
                array.push({ property: exports.translateYProperty, value: parseFloat(newTransform[transform]) });
                break;
            case "translate":
            case "translate3d":
                values = newTransform[transform].split(",");
                if (values.length >= 2) {
                    array.push({ property: exports.translateXProperty, value: parseFloat(values[0]) });
                    array.push({ property: exports.translateYProperty, value: parseFloat(values[1]) });
                }
                else if (values.length === 1) {
                    array.push({ property: exports.translateXProperty, value: parseFloat(values[0]) });
                    array.push({ property: exports.translateYProperty, value: parseFloat(values[0]) });
                }
                break;
            case "rotate":
                var text = newTransform[transform];
                var val = parseFloat(text);
                if (text.slice(-3) === "rad") {
                    val = val * (180.0 / Math.PI);
                }
                array.push({ property: exports.rotateProperty, value: val });
                break;
            case "none":
                array.push({ property: exports.scaleXProperty, value: 1 });
                array.push({ property: exports.scaleYProperty, value: 1 });
                array.push({ property: exports.translateXProperty, value: 0 });
                array.push({ property: exports.translateYProperty, value: 0 });
                array.push({ property: exports.rotateProperty, value: 0 });
                break;
        }
    }
    return array;
}
styleProperty.registerShorthandCallback("font", onFontChanged);
styleProperty.registerShorthandCallback("margin", onMarginChanged);
styleProperty.registerShorthandCallback("padding", onPaddingChanged);
styleProperty.registerShorthandCallback("transform", onTransformChanged);
var _defaultNativeValuesCache = {};
var StylePropertyChangedHandler = (function () {
    function StylePropertyChangedHandler(applyCallback, resetCallback, getNativeValue) {
        this._applyProperty = applyCallback;
        this._resetProperty = resetCallback;
        this._getNativeValue = getNativeValue;
    }
    StylePropertyChangedHandler.prototype.applyProperty = function (property, view, newValue) {
        var className = types.getClass(view);
        if (!_defaultNativeValuesCache.hasOwnProperty(className + property.id) && this._getNativeValue) {
            _defaultNativeValuesCache[className + property.id] = this._getNativeValue(view);
        }
        if (application.android) {
            newValue = types.isDefined(newValue.android) ? newValue.android : newValue;
        }
        else if (application.ios) {
            newValue = types.isDefined(newValue.ios) ? newValue.ios : newValue;
        }
        this._applyProperty(view, newValue, _defaultNativeValuesCache[className + property.id]);
    };
    StylePropertyChangedHandler.prototype.resetProperty = function (property, view) {
        var className = types.getClass(view);
        this._resetProperty(view, _defaultNativeValuesCache[className + property.id]);
    };
    return StylePropertyChangedHandler;
}());
exports.StylePropertyChangedHandler = StylePropertyChangedHandler;
exports.ignorePropertyHandler = new StylePropertyChangedHandler(function (view, val) {
}, function (view, val) {
});
registerNoStylingClass("Frame");
function onBackgroundColorPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (!color_1.Color.equals(currentBackground.color, data.newValue)) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withColor(data.newValue));
    }
}
function onBackgroundImagePropertyChanged(data) {
    var style = data.object;
    var url = data.newValue;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    var isValid = false;
    if (types.isString(data.newValue)) {
        var pattern = /url\(('|")(.*?)\1\)/;
        var match = url.match(pattern);
        if (match && match[2]) {
            url = match[2];
        }
        ensureImageSource();
        if (utils.isDataURI(url)) {
            var base64Data = url.split(",")[1];
            if (types.isDefined(base64Data)) {
                style._setValue(exports.backgroundInternalProperty, currentBackground.withImage(imageSource.fromBase64(base64Data)));
                isValid = true;
            }
        }
        else if (utils.isFileOrResourcePath(url)) {
            style._setValue(exports.backgroundInternalProperty, currentBackground.withImage(imageSource.fromFileOrResource(url)));
            isValid = true;
        }
        else if (url.indexOf("http") !== -1) {
            style["_url"] = url;
            style._setValue(exports.backgroundInternalProperty, currentBackground.withImage(undefined));
            imageSource.fromUrl(url).then(function (r) {
                if (style && style["_url"] === url) {
                    currentBackground = style._getValue(exports.backgroundInternalProperty);
                    style._setValue(exports.backgroundInternalProperty, currentBackground.withImage(r));
                }
            });
            isValid = true;
        }
    }
    if (!isValid) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withImage(undefined));
    }
}
function onBackgroundRepeatPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.repeat) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withRepeat(data.newValue));
    }
}
function onBackgroundPositionPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.position) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withPosition(data.newValue));
    }
}
function onBackgroundSizePropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.size) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withSize(data.newValue));
    }
}
function onBorderTopColorPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.borderTopColor) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withBorderTopColor(data.newValue));
    }
}
function onBorderRightColorPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.borderRightColor) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withBorderRightColor(data.newValue));
    }
}
function onBorderBottomColorPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.borderBottomColor) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withBorderBottomColor(data.newValue));
    }
}
function onBorderLeftColorPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.borderLeftColor) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withBorderLeftColor(data.newValue));
    }
}
function onBorderTopWidthPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.borderTopWidth) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withBorderTopWidth(data.newValue));
    }
}
function onBorderRightWidthPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.borderRightWidth) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withBorderRightWidth(data.newValue));
    }
}
function onBorderBottomWidthPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.borderBottomWidth) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withBorderBottomWidth(data.newValue));
    }
}
function onBorderLeftWidthPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.borderLeftWidth) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withBorderLeftWidth(data.newValue));
    }
}
function onBorderTopLeftRadiusPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.borderTopLeftRadius) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withBorderTopLeftRadius(data.newValue));
    }
}
function onBorderTopRightRadiusPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.borderTopRightRadius) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withBorderTopRightRadius(data.newValue));
    }
}
function onBorderBottomRightRadiusPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.borderBottomRightRadius) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withBorderBottomRightRadius(data.newValue));
    }
}
function onBorderBottomLeftRadiusPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.borderBottomLeftRadius) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withBorderBottomLeftRadius(data.newValue));
    }
}
function onClipPathPropertyChanged(data) {
    var style = data.object;
    var currentBackground = style._getValue(exports.backgroundInternalProperty);
    if (data.newValue !== currentBackground.clipPath) {
        style._setValue(exports.backgroundInternalProperty, currentBackground.withClipPath(data.newValue));
    }
}
exports.backgroundInternalProperty = new styleProperty.Property("_backgroundInternal", "_backgroundInternal", new dependency_observable_1.PropertyMetadata(background.Background.default, dependency_observable_1.PropertyMetadataSettings.None, undefined, undefined, background.Background.equals));
exports.backgroundImageProperty = new styleProperty.Property("backgroundImage", "background-image", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, onBackgroundImagePropertyChanged));
exports.backgroundColorProperty = new styleProperty.Property("backgroundColor", "background-color", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, onBackgroundColorPropertyChanged, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.backgroundRepeatProperty = new styleProperty.Property("backgroundRepeat", "background-repeat", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, onBackgroundRepeatPropertyChanged));
exports.backgroundSizeProperty = new styleProperty.Property("backgroundSize", "background-size", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, onBackgroundSizePropertyChanged));
exports.backgroundPositionProperty = new styleProperty.Property("backgroundPosition", "background-position", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, onBackgroundPositionPropertyChanged));
exports.borderTopColorProperty = new styleProperty.Property("borderTopColor", "border-top-color", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, onBorderTopColorPropertyChanged, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.borderRightColorProperty = new styleProperty.Property("borderRightColor", "border-right-color", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, onBorderRightColorPropertyChanged, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.borderBottomColorProperty = new styleProperty.Property("borderBottomColor", "border-bottom-color", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, onBorderBottomColorPropertyChanged, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.borderLeftColorProperty = new styleProperty.Property("borderLeftColor", "border-left-color", new dependency_observable_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None, onBorderLeftColorPropertyChanged, color_1.Color.isValid, color_1.Color.equals), converters.colorConverter);
exports.borderTopWidthProperty = new styleProperty.Property("borderTopWidth", "border-top-width", new dependency_observable_1.PropertyMetadata(0, AffectsLayout, onBorderTopWidthPropertyChanged, isNonNegativeFiniteNumber), converters.numberConverter);
exports.borderRightWidthProperty = new styleProperty.Property("borderRightWidth", "border-right-width", new dependency_observable_1.PropertyMetadata(0, AffectsLayout, onBorderRightWidthPropertyChanged, isNonNegativeFiniteNumber), converters.numberConverter);
exports.borderBottomWidthProperty = new styleProperty.Property("borderBottomWidth", "border-bottom-width", new dependency_observable_1.PropertyMetadata(0, AffectsLayout, onBorderBottomWidthPropertyChanged, isNonNegativeFiniteNumber), converters.numberConverter);
exports.borderLeftWidthProperty = new styleProperty.Property("borderLeftWidth", "border-left-width", new dependency_observable_1.PropertyMetadata(0, AffectsLayout, onBorderLeftWidthPropertyChanged, isNonNegativeFiniteNumber), converters.numberConverter);
exports.borderTopLeftRadiusProperty = new styleProperty.Property("borderTopLeftRadius", "border-top-left-radius", new dependency_observable_1.PropertyMetadata(0, AffectsLayout, onBorderTopLeftRadiusPropertyChanged, isNonNegativeFiniteNumber), converters.numberConverter);
exports.borderTopRightRadiusProperty = new styleProperty.Property("borderTopRightRadius", "border-top-right-radius", new dependency_observable_1.PropertyMetadata(0, AffectsLayout, onBorderTopRightRadiusPropertyChanged, isNonNegativeFiniteNumber), converters.numberConverter);
exports.borderBottomRightRadiusProperty = new styleProperty.Property("borderBottomRightRadius", "border-bottom-right-radius", new dependency_observable_1.PropertyMetadata(0, AffectsLayout, onBorderBottomRightRadiusPropertyChanged, isNonNegativeFiniteNumber), converters.numberConverter);
exports.borderBottomLeftRadiusProperty = new styleProperty.Property("borderBottomLeftRadius", "border-bottom-left-radius", new dependency_observable_1.PropertyMetadata(0, AffectsLayout, onBorderBottomLeftRadiusPropertyChanged, isNonNegativeFiniteNumber), converters.numberConverter);
exports.clipPathProperty = new styleProperty.Property("clipPath", "clip-path", new dependency_observable_1.PropertyMetadata(undefined, AffectsLayout, onClipPathPropertyChanged, isClipPathValid));
function parseThickness(value) {
    var result = { top: 0, right: 0, bottom: 0, left: 0 };
    if (types.isString(value)) {
        var arr = value.split(/[ ,]+/);
        if (arr.length === 1) {
            var arr0 = parseInt(arr[0]);
            result.top = arr0;
            result.right = arr0;
            result.bottom = arr0;
            result.left = arr0;
        }
        else if (arr.length === 2) {
            var arr0 = parseInt(arr[0]);
            var arr1 = parseInt(arr[1]);
            result.top = arr0;
            result.right = arr1;
            result.bottom = arr0;
            result.left = arr1;
        }
        else if (arr.length === 3) {
            var arr0 = parseInt(arr[0]);
            var arr1 = parseInt(arr[1]);
            var arr2 = parseInt(arr[2]);
            result.top = arr0;
            result.right = arr1;
            result.bottom = arr2;
            result.left = arr1;
        }
        else if (arr.length === 4) {
            var arr0 = parseInt(arr[0]);
            var arr1 = parseInt(arr[1]);
            var arr2 = parseInt(arr[2]);
            var arr3 = parseInt(arr[3]);
            result.top = arr0;
            result.right = arr1;
            result.bottom = arr2;
            result.left = arr3;
        }
    }
    else if (types.isNumber(value)) {
        result.top = result.right = result.bottom = result.left = value;
    }
    else {
        result = value;
    }
    return result;
}
function parseBorderColor(value) {
    var result = { top: undefined, right: undefined, bottom: undefined, left: undefined };
    try {
        if (types.isString(value)) {
            if (value.indexOf("rgb") === 0) {
                result.top = result.right = result.bottom = result.left = new color_1.Color(value);
                return result;
            }
            var arr = value.split(/[ ,]+/);
            if (arr.length === 1) {
                var arr0 = new color_1.Color(arr[0]);
                result.top = arr0;
                result.right = arr0;
                result.bottom = arr0;
                result.left = arr0;
            }
            else if (arr.length === 2) {
                var arr0 = new color_1.Color(arr[0]);
                var arr1 = new color_1.Color(arr[1]);
                result.top = arr0;
                result.right = arr1;
                result.bottom = arr0;
                result.left = arr1;
            }
            else if (arr.length === 3) {
                var arr0 = new color_1.Color(arr[0]);
                var arr1 = new color_1.Color(arr[1]);
                var arr2 = new color_1.Color(arr[2]);
                result.top = arr0;
                result.right = arr1;
                result.bottom = arr2;
                result.left = arr1;
            }
            else if (arr.length === 4) {
                var arr0 = new color_1.Color(arr[0]);
                var arr1 = new color_1.Color(arr[1]);
                var arr2 = new color_1.Color(arr[2]);
                var arr3 = new color_1.Color(arr[3]);
                result.top = arr0;
                result.right = arr1;
                result.bottom = arr2;
                result.left = arr3;
            }
        }
        else if (value instanceof color_1.Color) {
            result.top = result.right = result.bottom = result.left = value;
        }
        else {
            result = value;
        }
    }
    catch (ex) {
        if (trace.enabled) {
            trace.write("Error parsing border color " + value + ": " + ex + "'", trace.categories.Style, trace.messageType.error);
        }
    }
    return result;
}
function onBorderColorChanged(value) {
    var fourColors = parseBorderColor(value);
    var array = new Array();
    array.push({ property: exports.borderTopColorProperty, value: fourColors.top });
    array.push({ property: exports.borderRightColorProperty, value: fourColors.right });
    array.push({ property: exports.borderBottomColorProperty, value: fourColors.bottom });
    array.push({ property: exports.borderLeftColorProperty, value: fourColors.left });
    return array;
}
function onBorderWidthChanged(value) {
    var thickness = parseThickness(value);
    var array = new Array();
    array.push({ property: exports.borderTopWidthProperty, value: thickness.top });
    array.push({ property: exports.borderRightWidthProperty, value: thickness.right });
    array.push({ property: exports.borderBottomWidthProperty, value: thickness.bottom });
    array.push({ property: exports.borderLeftWidthProperty, value: thickness.left });
    return array;
}
function onBorderRadiusChanged(value) {
    var thickness = parseThickness(value);
    var array = new Array();
    array.push({ property: exports.borderTopLeftRadiusProperty, value: thickness.top });
    array.push({ property: exports.borderTopRightRadiusProperty, value: thickness.right });
    array.push({ property: exports.borderBottomRightRadiusProperty, value: thickness.bottom });
    array.push({ property: exports.borderBottomLeftRadiusProperty, value: thickness.left });
    return array;
}
styleProperty.registerShorthandCallback("border-color", onBorderColorChanged);
styleProperty.registerShorthandCallback("border-width", onBorderWidthChanged);
styleProperty.registerShorthandCallback("border-radius", onBorderRadiusChanged);
//# sourceMappingURL=style.js.map