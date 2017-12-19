var common = require("./text-field-common");
var text_base_1 = require("ui/text-base");
var enums_1 = require("ui/enums");
var style = require("ui/styling/style");
function onSecurePropertyChanged(data) {
    var textField = data.object;
    textField.ios.secureTextEntry = data.newValue;
}
common.secureProperty.metadata.onSetNativeValue = onSecurePropertyChanged;
global.moduleMerge(common, exports);
var UITextFieldDelegateImpl = (function (_super) {
    __extends(UITextFieldDelegateImpl, _super);
    function UITextFieldDelegateImpl() {
        _super.apply(this, arguments);
    }
    UITextFieldDelegateImpl.initWithOwner = function (owner) {
        var delegate = UITextFieldDelegateImpl.new();
        delegate._owner = owner;
        return delegate;
    };
    UITextFieldDelegateImpl.prototype.textFieldShouldBeginEditing = function (textField) {
        this.firstEdit = true;
        var owner = this._owner.get();
        if (owner) {
            return owner.editable;
        }
        return true;
    };
    UITextFieldDelegateImpl.prototype.textFieldDidEndEditing = function (textField) {
        var owner = this._owner.get();
        if (owner) {
            if (owner.updateTextTrigger === enums_1.UpdateTextTrigger.focusLost) {
                owner._onPropertyChangedFromNative(text_base_1.TextBase.textProperty, textField.text);
            }
            owner.dismissSoftInput();
            if (owner.formattedText) {
                owner.formattedText.createFormattedStringCore();
            }
        }
    };
    UITextFieldDelegateImpl.prototype.textFieldShouldClear = function (textField) {
        this.firstEdit = false;
        var owner = this._owner.get();
        if (owner) {
            owner._onPropertyChangedFromNative(text_base_1.TextBase.textProperty, "");
        }
        return true;
    };
    UITextFieldDelegateImpl.prototype.textFieldShouldReturn = function (textField) {
        var owner = this._owner.get();
        if (owner) {
            owner.dismissSoftInput();
            owner.notify({ eventName: TextField.returnPressEvent, object: owner });
        }
        return true;
    };
    UITextFieldDelegateImpl.prototype.textFieldShouldChangeCharactersInRangeReplacementString = function (textField, range, replacementString) {
        var owner = this._owner.get();
        if (owner) {
            if (owner.updateTextTrigger === enums_1.UpdateTextTrigger.textChanged) {
                if (textField.secureTextEntry && this.firstEdit) {
                    owner._onPropertyChangedFromNative(text_base_1.TextBase.textProperty, replacementString);
                }
                else {
                    if (range.location <= textField.text.length) {
                        var newText = NSString.stringWithString(textField.text).stringByReplacingCharactersInRangeWithString(range, replacementString);
                        owner._onPropertyChangedFromNative(text_base_1.TextBase.textProperty, newText);
                    }
                }
            }
            if (owner.formattedText) {
                owner.formattedText._updateCharactersInRangeReplacementString(range.location, range.length, replacementString);
            }
        }
        this.firstEdit = false;
        return true;
    };
    UITextFieldDelegateImpl.ObjCProtocols = [UITextFieldDelegate];
    return UITextFieldDelegateImpl;
}(NSObject));
var UITextFieldImpl = (function (_super) {
    __extends(UITextFieldImpl, _super);
    function UITextFieldImpl() {
        _super.apply(this, arguments);
    }
    UITextFieldImpl.initWithOwner = function (owner) {
        var handler = UITextFieldImpl.new();
        handler._owner = owner;
        return handler;
    };
    UITextFieldImpl.prototype._getTextRectForBounds = function (bounds) {
        var owner = this._owner ? this._owner.get() : null;
        if (!owner) {
            return bounds;
        }
        var size = bounds.size;
        return CGRectMake(owner.borderLeftWidth + owner.style.paddingLeft, owner.borderTopWidth + owner.style.paddingTop, size.width - (owner.borderLeftWidth + owner.style.paddingLeft + owner.style.paddingRight + owner.borderRightWidth), size.height - (owner.borderTopWidth + owner.style.paddingTop + owner.style.paddingBottom + owner.borderBottomWidth));
    };
    UITextFieldImpl.prototype.textRectForBounds = function (bounds) {
        return this._getTextRectForBounds(bounds);
    };
    UITextFieldImpl.prototype.editingRectForBounds = function (bounds) {
        return this._getTextRectForBounds(bounds);
    };
    return UITextFieldImpl;
}(UITextField));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.call(this);
        this._ios = UITextFieldImpl.initWithOwner(new WeakRef(this));
        this._delegate = UITextFieldDelegateImpl.initWithOwner(new WeakRef(this));
    }
    TextField.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this._ios.delegate = this._delegate;
    };
    TextField.prototype.onUnloaded = function () {
        this._ios.delegate = null;
        _super.prototype.onUnloaded.call(this);
    };
    Object.defineProperty(TextField.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    TextField.prototype._onHintPropertyChanged = function (data) {
        var textField = data.object;
        textField.ios.placeholder = data.newValue + "";
    };
    return TextField;
}(common.TextField));
exports.TextField = TextField;
;
var TextFieldStyler = (function () {
    function TextFieldStyler() {
    }
    TextFieldStyler.setColorProperty = function (view, newValue) {
        var tf = view._nativeView;
        TextFieldStyler._setTextFieldColor(tf, newValue);
    };
    TextFieldStyler.resetColorProperty = function (view, nativeValue) {
        var tf = view._nativeView;
        TextFieldStyler._setTextFieldColor(tf, nativeValue);
    };
    TextFieldStyler._setTextFieldColor = function (tf, newValue) {
        var color = newValue;
        if (tf.isShowingHint && color) {
            tf.textColor = color.colorWithAlphaComponent(0.22);
        }
        else {
            tf.textColor = color;
            tf.tintColor = color;
        }
    };
    TextFieldStyler.getNativeColorValue = function (view) {
        var tf = view._nativeView;
        return tf.tintColor;
    };
    TextFieldStyler.setPlaceholderColorProperty = function (textBase, newValue) {
        var ios = textBase._nativeView;
        var text = ios.placeholder + "";
        var colorAttributes = NSMutableDictionary.alloc().init();
        colorAttributes.setValueForKey(newValue, NSForegroundColorAttributeName);
        ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes(text, colorAttributes.copy());
    };
    TextFieldStyler.resetPlaceholderColorProperty = function (textBase, nativeValue) {
        var ios = textBase._nativeView;
        var text = ios.placeholder + "";
        var colorAttributes = NSMutableDictionary.alloc().init();
        colorAttributes.setValueForKey(nativeValue, NSForegroundColorAttributeName);
        ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes(text, colorAttributes.copy());
    };
    TextFieldStyler.getNativePlaceholderColorValue = function (textBase) {
        var ios = textBase._nativeView;
        if (!ios.attributedPlaceholder) {
            return null;
        }
        return ios.attributedPlaceholder.attributeAtIndexEffectiveRange(NSForegroundColorAttributeName, 0, null);
    };
    TextFieldStyler.registerHandlers = function () {
        style.registerHandler(style.colorProperty, new style.StylePropertyChangedHandler(TextFieldStyler.setColorProperty, TextFieldStyler.resetColorProperty, TextFieldStyler.getNativeColorValue), "TextField");
        style.registerHandler(style.placeholderColorProperty, new style.StylePropertyChangedHandler(TextFieldStyler.setPlaceholderColorProperty, TextFieldStyler.resetPlaceholderColorProperty, TextFieldStyler.getNativePlaceholderColorValue), "TextField");
    };
    return TextFieldStyler;
}());
exports.TextFieldStyler = TextFieldStyler;
TextFieldStyler.registerHandlers();
//# sourceMappingURL=text-field.js.map