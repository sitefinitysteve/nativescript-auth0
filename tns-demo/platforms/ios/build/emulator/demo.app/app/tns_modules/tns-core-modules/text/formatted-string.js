var formattedStringCommon = require("./formatted-string-common");
var types = require("utils/types");
global.moduleMerge(formattedStringCommon, exports);
var FormattedString = (function (_super) {
    __extends(FormattedString, _super);
    function FormattedString() {
        _super.apply(this, arguments);
    }
    FormattedString.prototype.createFormattedStringCore = function () {
        var mas = NSMutableAttributedString.alloc().init();
        var spanStart = 0;
        var spanLength = 0;
        var spanText = "";
        for (var i = 0; i < this.spans.length; i++) {
            var span = this.spans.getItem(i);
            spanText = types.toUIString(span.text);
            spanLength = spanText.length;
            span.updateSpanModifiers(this);
            var attrDict = NSMutableDictionary.alloc().init();
            for (var p = 0; p < span.spanModifiers.length; p++) {
                attrDict.setObjectForKey(span.spanModifiers[p].value, span.spanModifiers[p].key);
            }
            var nsAttributedString = NSMutableAttributedString.alloc().initWithStringAttributes(String(spanText), attrDict);
            mas.insertAttributedStringAtIndex(nsAttributedString, spanStart);
            spanStart += spanLength;
        }
        this._formattedText = mas;
    };
    FormattedString.prototype._updateCharactersInRangeReplacementString = function (rangeLocation, rangeLength, replacementString) {
        var deletingText = !replacementString;
        var currentLocation = 0;
        for (var i = 0; i < this.spans.length; i++) {
            var span = this.spans.getItem(i);
            if (currentLocation <= rangeLocation && rangeLocation < (currentLocation + span.text.length)) {
                var newText = splice(span.text, rangeLocation - currentLocation, deletingText ? rangeLength : 0, replacementString);
                span._setTextInternal(newText);
                return;
            }
            currentLocation += span.text.length;
        }
    };
    return FormattedString;
}(formattedStringCommon.FormattedString));
exports.FormattedString = FormattedString;
function splice(value, start, delCount, newSubStr) {
    return value.slice(0, start) + newSubStr + value.slice(start + Math.abs(delCount));
}
;
//# sourceMappingURL=formatted-string.js.map