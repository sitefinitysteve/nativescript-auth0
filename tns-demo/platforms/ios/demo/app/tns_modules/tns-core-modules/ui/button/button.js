var common = require("./button-common");
var stateChanged = require("ui/core/control-state-change");
var style = require("ui/styling/style");
var utils = require("utils/utils");
var enums = require("ui/enums");
var types = require("utils/types");
var view_1 = require("ui/core/view");
var TapHandlerImpl = (function (_super) {
    __extends(TapHandlerImpl, _super);
    function TapHandlerImpl() {
        _super.apply(this, arguments);
    }
    TapHandlerImpl.initWithOwner = function (owner) {
        var handler = TapHandlerImpl.new();
        handler._owner = owner;
        return handler;
    };
    TapHandlerImpl.prototype.tap = function (args) {
        var owner = this._owner.get();
        if (owner) {
            owner._emit(common.Button.tapEvent);
        }
    };
    TapHandlerImpl.ObjCExposedMethods = {
        "tap": { returns: interop.types.void, params: [interop.types.id] }
    };
    return TapHandlerImpl;
}(NSObject));
global.moduleMerge(common, exports);
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.call(this);
        this._ios = UIButton.buttonWithType(1);
        this._tapHandler = TapHandlerImpl.initWithOwner(new WeakRef(this));
        this._ios.addTargetActionForControlEvents(this._tapHandler, "tap", 64);
    }
    Object.defineProperty(Button.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype._onTextPropertyChanged = function (data) {
        this.ios.setTitleForState(data.newValue + "", 0);
        var attributedTitle = this.ios.attributedTitleForState(0);
        if (attributedTitle !== null) {
            ButtonStyler._setButtonTextDecorationAndTransform(this, this.style.textDecoration, this.style.textTransform, this.style.letterSpacing);
        }
    };
    Button.prototype._setFormattedTextPropertyToNative = function (value) {
        var newText = value ? value._formattedText : null;
        this.ios.setAttributedTitleForState(newText, 0);
        this.style._updateTextDecoration();
        this.style._updateTextTransform();
    };
    Button.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
        if (this._stateChangedHandler) {
            this._stateChangedHandler.stop();
        }
    };
    Button.prototype._updateHandler = function (subscribe) {
        var _this = this;
        if (subscribe) {
            if (!this._stateChangedHandler) {
                this._stateChangedHandler = new stateChanged.ControlStateChangeListener(this._ios, function (s) {
                    _this._goToVisualState(s);
                });
            }
            this._stateChangedHandler.start();
        }
        else {
            this._stateChangedHandler.stop();
        }
    };
    __decorate([
        view_1.PseudoClassHandler("normal", "highlighted", "pressed", "active")
    ], Button.prototype, "_updateHandler", null);
    return Button;
}(common.Button));
exports.Button = Button;
var ButtonStyler = (function () {
    function ButtonStyler() {
    }
    ButtonStyler.setColorProperty = function (view, newValue) {
        var btn = view._nativeView;
        btn.setTitleColorForState(newValue, 0);
    };
    ButtonStyler.resetColorProperty = function (view, nativeValue) {
        var btn = view._nativeView;
        btn.setTitleColorForState(nativeValue, 0);
    };
    ButtonStyler.getNativeColorValue = function (view) {
        var btn = view._nativeView;
        return btn.titleColorForState(0);
    };
    ButtonStyler.setFontInternalProperty = function (view, newValue, nativeValue) {
        var btn = view._nativeView;
        btn.titleLabel.font = newValue.getUIFont(nativeValue);
    };
    ButtonStyler.resetFontInternalProperty = function (view, nativeValue) {
        var btn = view._nativeView;
        btn.titleLabel.font = nativeValue;
    };
    ButtonStyler.getNativeFontInternalValue = function (view) {
        var btn = view._nativeView;
        return btn.titleLabel.font;
    };
    ButtonStyler.setTextAlignmentProperty = function (view, newValue) {
        var btn = view._nativeView;
        utils.ios.setTextAlignment(btn.titleLabel, newValue);
        switch (newValue) {
            case enums.TextAlignment.left:
                btn.contentHorizontalAlignment = 1;
                break;
            case enums.TextAlignment.center:
                btn.contentHorizontalAlignment = 0;
                break;
            case enums.TextAlignment.right:
                btn.contentHorizontalAlignment = 2;
                break;
            default:
                break;
        }
    };
    ButtonStyler.resetTextAlignmentProperty = function (view, nativeValue) {
        var btn = view._nativeView;
        btn.titleLabel.textAlignment = nativeValue.textAlign;
        btn.contentHorizontalAlignment = nativeValue.contentAlign;
    };
    ButtonStyler.getNativeTextAlignmentValue = function (view) {
        var btn = view._nativeView;
        return {
            textAlign: btn.titleLabel.textAlignment,
            contentAlign: btn.contentHorizontalAlignment
        };
    };
    ButtonStyler.setBorderTopWidthProperty = function (view, newValue) {
        ButtonStyler.setNativeBorderTopWidth(view, newValue);
    };
    ButtonStyler.resetBorderTopWidthProperty = function (view, nativeValue) {
        ButtonStyler.setNativeBorderTopWidth(view, nativeValue);
    };
    ButtonStyler.setNativeBorderTopWidth = function (view, newValue) {
        var nativeButton = view._nativeView;
        var top = view.style.paddingTop + newValue;
        var left = nativeButton.contentEdgeInsets.left;
        var bottom = nativeButton.contentEdgeInsets.bottom;
        var right = nativeButton.contentEdgeInsets.right;
        nativeButton.contentEdgeInsets = UIEdgeInsetsFromString("{" + top + "," + left + "," + bottom + "," + right + "}");
    };
    ButtonStyler.setBorderRightWidthProperty = function (view, newValue) {
        ButtonStyler.setNativeBorderRightWidth(view, newValue);
    };
    ButtonStyler.resetBorderRightWidthProperty = function (view, nativeValue) {
        ButtonStyler.setNativeBorderRightWidth(view, nativeValue);
    };
    ButtonStyler.setNativeBorderRightWidth = function (view, newValue) {
        var nativeButton = view._nativeView;
        var top = nativeButton.contentEdgeInsets.top;
        var left = nativeButton.contentEdgeInsets.left;
        var bottom = nativeButton.contentEdgeInsets.bottom;
        var right = view.style.paddingRight + newValue;
        nativeButton.contentEdgeInsets = UIEdgeInsetsFromString("{" + top + "," + left + "," + bottom + "," + right + "}");
    };
    ButtonStyler.setBorderBottomWidthProperty = function (view, newValue) {
        ButtonStyler.setNativeBorderBottomWidth(view, newValue);
    };
    ButtonStyler.resetBorderBottomWidthProperty = function (view, nativeValue) {
        ButtonStyler.setNativeBorderBottomWidth(view, nativeValue);
    };
    ButtonStyler.setNativeBorderBottomWidth = function (view, newValue) {
        var nativeButton = view._nativeView;
        var top = nativeButton.contentEdgeInsets.top;
        var left = nativeButton.contentEdgeInsets.left;
        var bottom = view.style.paddingBottom + newValue;
        var right = nativeButton.contentEdgeInsets.right;
        nativeButton.contentEdgeInsets = UIEdgeInsetsFromString("{" + top + "," + left + "," + bottom + "," + right + "}");
    };
    ButtonStyler.setBorderLeftWidthProperty = function (view, newValue) {
        ButtonStyler.setNativeBorderLeftWidth(view, newValue);
    };
    ButtonStyler.resetBorderLeftWidthProperty = function (view, nativeValue) {
        ButtonStyler.setNativeBorderLeftWidth(view, nativeValue);
    };
    ButtonStyler.setNativeBorderLeftWidth = function (view, newValue) {
        var nativeButton = view._nativeView;
        var top = nativeButton.contentEdgeInsets.top;
        var left = view.style.paddingLeft + newValue;
        var bottom = nativeButton.contentEdgeInsets.bottom;
        var right = nativeButton.contentEdgeInsets.right;
        nativeButton.contentEdgeInsets = UIEdgeInsetsFromString("{" + top + "," + left + "," + bottom + "," + right + "}");
    };
    ButtonStyler.setPaddingProperty = function (view, newValue) {
        var top = newValue.top + view.borderTopWidth;
        var left = newValue.left + view.borderLeftWidth;
        var bottom = newValue.bottom + view.borderBottomWidth;
        var right = newValue.right + view.borderRightWidth;
        view._nativeView.contentEdgeInsets = UIEdgeInsetsFromString("{" + top + "," + left + "," + bottom + "," + right + "}");
    };
    ButtonStyler.resetPaddingProperty = function (view, nativeValue) {
        view._nativeView.contentEdgeInsets = UIEdgeInsetsFromString("{0,0,0,0}");
    };
    ButtonStyler.setTextDecorationProperty = function (view, newValue) {
        ButtonStyler._setButtonTextDecorationAndTransform(view, newValue, view.style.textTransform, view.style.letterSpacing);
    };
    ButtonStyler.resetTextDecorationProperty = function (view, nativeValue) {
        ButtonStyler._setButtonTextDecorationAndTransform(view, enums.TextDecoration.none, view.style.textTransform, view.style.letterSpacing);
    };
    ButtonStyler.setTextTransformProperty = function (view, newValue) {
        ButtonStyler._setButtonTextDecorationAndTransform(view, view.style.textDecoration, newValue, view.style.letterSpacing);
    };
    ButtonStyler.resetTextTransformProperty = function (view, nativeValue) {
        ButtonStyler._setButtonTextDecorationAndTransform(view, view.style.textDecoration, enums.TextTransform.none, view.style.letterSpacing);
    };
    ButtonStyler.setLetterSpacingProperty = function (view, newValue) {
        ButtonStyler._setButtonTextDecorationAndTransform(view, view.style.textDecoration, view.style.textTransform, newValue);
    };
    ButtonStyler.resetLetterSpacingProperty = function (view, nativeValue) {
        ButtonStyler._setButtonTextDecorationAndTransform(view, view.style.textDecoration, view.style.textTransform, 0);
    };
    ButtonStyler.setWhiteSpaceProperty = function (view, newValue) {
        utils.ios.setWhiteSpace(view.ios.titleLabel, newValue, view.ios);
    };
    ButtonStyler.resetWhiteSpaceProperty = function (view, nativeValue) {
        utils.ios.setWhiteSpace(view.ios.titleLabel, enums.WhiteSpace.normal, view.ios);
    };
    ButtonStyler.registerHandlers = function () {
        style.registerHandler(style.colorProperty, new style.StylePropertyChangedHandler(ButtonStyler.setColorProperty, ButtonStyler.resetColorProperty, ButtonStyler.getNativeColorValue), "Button");
        style.registerHandler(style.fontInternalProperty, new style.StylePropertyChangedHandler(ButtonStyler.setFontInternalProperty, ButtonStyler.resetFontInternalProperty, ButtonStyler.getNativeFontInternalValue), "Button");
        style.registerHandler(style.textAlignmentProperty, new style.StylePropertyChangedHandler(ButtonStyler.setTextAlignmentProperty, ButtonStyler.resetTextAlignmentProperty, ButtonStyler.getNativeTextAlignmentValue), "Button");
        style.registerHandler(style.borderTopWidthProperty, new style.StylePropertyChangedHandler(ButtonStyler.setBorderTopWidthProperty, ButtonStyler.resetBorderTopWidthProperty), "Button");
        style.registerHandler(style.borderRightWidthProperty, new style.StylePropertyChangedHandler(ButtonStyler.setBorderRightWidthProperty, ButtonStyler.resetBorderRightWidthProperty), "Button");
        style.registerHandler(style.borderBottomWidthProperty, new style.StylePropertyChangedHandler(ButtonStyler.setBorderBottomWidthProperty, ButtonStyler.resetBorderBottomWidthProperty), "Button");
        style.registerHandler(style.borderLeftWidthProperty, new style.StylePropertyChangedHandler(ButtonStyler.setBorderLeftWidthProperty, ButtonStyler.resetBorderLeftWidthProperty), "Button");
        style.registerHandler(style.nativePaddingsProperty, new style.StylePropertyChangedHandler(ButtonStyler.setPaddingProperty, ButtonStyler.resetPaddingProperty), "Button");
        style.registerHandler(style.textDecorationProperty, new style.StylePropertyChangedHandler(ButtonStyler.setTextDecorationProperty, ButtonStyler.resetTextDecorationProperty), "Button");
        style.registerHandler(style.textTransformProperty, new style.StylePropertyChangedHandler(ButtonStyler.setTextTransformProperty, ButtonStyler.resetTextTransformProperty), "Button");
        style.registerHandler(style.letterSpacingProperty, new style.StylePropertyChangedHandler(ButtonStyler.setLetterSpacingProperty, ButtonStyler.resetLetterSpacingProperty), "Button");
        style.registerHandler(style.whiteSpaceProperty, new style.StylePropertyChangedHandler(ButtonStyler.setWhiteSpaceProperty, ButtonStyler.resetWhiteSpaceProperty), "Button");
    };
    ButtonStyler._setButtonTextDecorationAndTransform = function (button, decoration, transform, letterSpacing) {
        var hasLetterSpacing = types.isNumber(letterSpacing) && !isNaN(letterSpacing);
        if (button.formattedText) {
            if (button.style.textDecoration.indexOf(enums.TextDecoration.none) === -1) {
                if (button.style.textDecoration.indexOf(enums.TextDecoration.underline) !== -1) {
                    button.formattedText.underline = 1;
                }
                if (button.style.textDecoration.indexOf(enums.TextDecoration.lineThrough) !== -1) {
                    button.formattedText.strikethrough = 1;
                }
            }
            else {
                button.formattedText.underline = 0;
            }
            for (var i = 0; i < button.formattedText.spans.length; i++) {
                var span = button.formattedText.spans.getItem(i);
                span.text = utils.ios.getTransformedText(button, span.text, transform);
            }
            if (hasLetterSpacing) {
                var attrText = NSMutableAttributedString.alloc().initWithAttributedString(button.ios.attributedTitleForState(0));
                attrText.addAttributeValueRange(NSKernAttributeName, letterSpacing * button.ios.font.pointSize, { location: 0, length: attrText.length });
                button.ios.setAttributedTitleForState(attrText, 0);
            }
        }
        else {
            var source = button.text;
            var decorationValues = (decoration + "").split(" ");
            var dict = new Map();
            if (decorationValues.indexOf(enums.TextDecoration.none) === -1 || hasLetterSpacing) {
                if (decorationValues.indexOf(enums.TextDecoration.underline) !== -1) {
                    dict.set(NSUnderlineStyleAttributeName, 1);
                }
                if (decorationValues.indexOf(enums.TextDecoration.lineThrough) !== -1) {
                    dict.set(NSStrikethroughStyleAttributeName, 1);
                }
                if (hasLetterSpacing) {
                    dict.set(NSKernAttributeName, letterSpacing * button.ios.font.pointSize);
                }
            }
            var buttonColor = button.style.color;
            if (buttonColor) {
                dict.set(NSForegroundColorAttributeName, buttonColor.ios);
            }
            source = utils.ios.getTransformedText(button, source, transform);
            var result = NSMutableAttributedString.alloc().initWithString(source);
            if (dict.size > 0) {
                result.setAttributesRange(dict, NSValue.valueWithRange({ location: 0, length: source.length }).rangeValue);
            }
            button.ios.setAttributedTitleForState(result, 0);
            if (dict.size === 0) {
                button.ios.setTitleForState(source, 0);
            }
        }
    };
    return ButtonStyler;
}());
exports.ButtonStyler = ButtonStyler;
ButtonStyler.registerHandlers();
//# sourceMappingURL=button.js.map