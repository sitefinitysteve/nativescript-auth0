var utils = require("utils/utils");
var style = require("ui/styling/style");
var enums = require("ui/enums");
var types = require("utils/types");
var TextBaseStyler = (function () {
    function TextBaseStyler() {
    }
    TextBaseStyler.setFontInternalProperty = function (textBase, newValue, nativeValue) {
        var ios = textBase._nativeView;
        ios.font = newValue.getUIFont(nativeValue);
    };
    TextBaseStyler.resetFontInternalProperty = function (textBase, nativeValue) {
        var ios = textBase._nativeView;
        ios.font = nativeValue;
    };
    TextBaseStyler.getNativeFontInternalValue = function (textBase) {
        var ios = textBase._nativeView;
        return ios.font;
    };
    TextBaseStyler.setTextAlignmentProperty = function (textBase, newValue) {
        utils.ios.setTextAlignment(textBase._nativeView, newValue);
    };
    TextBaseStyler.resetTextAlignmentProperty = function (textBase, nativeValue) {
        var ios = textBase._nativeView;
        ios.textAlignment = nativeValue;
    };
    TextBaseStyler.getNativeTextAlignmentValue = function (textBase) {
        var ios = textBase._nativeView;
        return ios.textAlignment;
    };
    TextBaseStyler.setTextDecorationProperty = function (textBase, newValue) {
        TextBaseStyler._setTextBaseTextDecorationAndTransform(textBase, newValue, textBase.style.textTransform, textBase.style.letterSpacing);
    };
    TextBaseStyler.resetTextDecorationProperty = function (textBase, nativeValue) {
        TextBaseStyler._setTextBaseTextDecorationAndTransform(textBase, enums.TextDecoration.none, textBase.style.textTransform, textBase.style.letterSpacing);
    };
    TextBaseStyler.setTextTransformProperty = function (textBase, newValue) {
        TextBaseStyler._setTextBaseTextDecorationAndTransform(textBase, textBase.style.textDecoration, newValue, textBase.style.letterSpacing);
    };
    TextBaseStyler.resetTextTransformProperty = function (textBase, nativeValue) {
        TextBaseStyler._setTextBaseTextDecorationAndTransform(textBase, textBase.style.textDecoration, enums.TextTransform.none, textBase.style.letterSpacing);
    };
    TextBaseStyler.setLetterSpacingProperty = function (textBase, newValue) {
        TextBaseStyler._setTextBaseTextDecorationAndTransform(textBase, textBase.style.textDecoration, textBase.style.textTransform, newValue);
    };
    TextBaseStyler.resetLetterSpacingProperty = function (textBase, nativeValue) {
        TextBaseStyler._setTextBaseTextDecorationAndTransform(textBase, textBase.style.textDecoration, textBase.style.textTransform, 0);
    };
    TextBaseStyler.setWhiteSpaceProperty = function (textBase, newValue) {
        utils.ios.setWhiteSpace(textBase._nativeView, newValue);
    };
    TextBaseStyler.resetWhiteSpaceProperty = function (textBase, nativeValue) {
        utils.ios.setWhiteSpace(textBase._nativeView, enums.WhiteSpace.normal);
    };
    TextBaseStyler.setColorProperty = function (textBase, newValue) {
        var ios = textBase._nativeView;
        ios.textColor = newValue;
    };
    TextBaseStyler.resetColorProperty = function (textBase, nativeValue) {
        var ios = textBase._nativeView;
        ios.textColor = nativeValue;
    };
    TextBaseStyler.getNativeColorValue = function (textBase) {
        var ios = textBase._nativeView;
        return ios.textColor;
    };
    TextBaseStyler.registerHandlers = function () {
        style.registerHandler(style.fontInternalProperty, new style.StylePropertyChangedHandler(TextBaseStyler.setFontInternalProperty, TextBaseStyler.resetFontInternalProperty, TextBaseStyler.getNativeFontInternalValue), "TextBase");
        style.registerHandler(style.textAlignmentProperty, new style.StylePropertyChangedHandler(TextBaseStyler.setTextAlignmentProperty, TextBaseStyler.resetTextAlignmentProperty, TextBaseStyler.getNativeTextAlignmentValue), "TextBase");
        style.registerHandler(style.colorProperty, new style.StylePropertyChangedHandler(TextBaseStyler.setColorProperty, TextBaseStyler.resetColorProperty, TextBaseStyler.getNativeColorValue), "TextBase");
        style.registerHandler(style.textDecorationProperty, new style.StylePropertyChangedHandler(TextBaseStyler.setTextDecorationProperty, TextBaseStyler.resetTextDecorationProperty), "TextBase");
        style.registerHandler(style.textTransformProperty, new style.StylePropertyChangedHandler(TextBaseStyler.setTextTransformProperty, TextBaseStyler.resetTextTransformProperty), "TextBase");
        style.registerHandler(style.whiteSpaceProperty, new style.StylePropertyChangedHandler(TextBaseStyler.setWhiteSpaceProperty, TextBaseStyler.resetWhiteSpaceProperty), "TextBase");
        style.registerHandler(style.letterSpacingProperty, new style.StylePropertyChangedHandler(TextBaseStyler.setLetterSpacingProperty, TextBaseStyler.resetLetterSpacingProperty), "TextBase");
    };
    TextBaseStyler._setTextBaseTextDecorationAndTransform = function (textBase, decoration, transform, letterSpacing) {
        var hasLetterSpacing = types.isNumber(letterSpacing) && !isNaN(letterSpacing);
        var nativeView = textBase._nativeView;
        if (textBase.formattedText) {
            if (textBase.style.textDecoration.indexOf(enums.TextDecoration.none) === -1) {
                if (textBase.style.textDecoration.indexOf(enums.TextDecoration.underline) !== -1) {
                    textBase.formattedText.underline = 1;
                }
                if (textBase.style.textDecoration.indexOf(enums.TextDecoration.lineThrough) !== -1) {
                    textBase.formattedText.strikethrough = 1;
                }
            }
            else {
                textBase.formattedText.underline = 1;
            }
            for (var i = 0; i < textBase.formattedText.spans.length; i++) {
                var span = textBase.formattedText.spans.getItem(i);
                span.text = utils.ios.getTransformedText(textBase, span.text, transform);
            }
            if (hasLetterSpacing) {
                var attrText = NSMutableAttributedString.alloc().initWithAttributedString(nativeView.attributedText);
                attrText.addAttributeValueRange(NSKernAttributeName, letterSpacing * nativeView.font.pointSize, { location: 0, length: attrText.length });
                nativeView.attributedText = attrText;
            }
        }
        else {
            var source = textBase.text;
            var attributes = new Array();
            var range = { location: 0, length: source.length };
            var decorationValues = (decoration + "").split(" ");
            if (decorationValues.indexOf(enums.TextDecoration.none) === -1 || hasLetterSpacing) {
                var dict = new Map();
                if (decorationValues.indexOf(enums.TextDecoration.underline) !== -1) {
                    dict.set(NSUnderlineStyleAttributeName, 1);
                }
                if (decorationValues.indexOf(enums.TextDecoration.lineThrough) !== -1) {
                    dict.set(NSStrikethroughStyleAttributeName, 1);
                }
                if (hasLetterSpacing) {
                    dict.set(NSKernAttributeName, letterSpacing * nativeView.font.pointSize);
                }
                attributes.push({ attrs: dict, range: NSValue.valueWithRange(range) });
            }
            source = utils.ios.getTransformedText(textBase, source, transform);
            if (attributes.length > 0) {
                var result = NSMutableAttributedString.alloc().initWithString(source);
                for (var i = 0; i < attributes.length; i++) {
                    result.setAttributesRange(attributes[i]["attrs"], attributes[i]["range"].rangeValue);
                }
                nativeView.attributedText = result;
            }
            else {
                nativeView.text = source;
            }
        }
    };
    return TextBaseStyler;
}());
exports.TextBaseStyler = TextBaseStyler;
//# sourceMappingURL=text-base-styler.js.map