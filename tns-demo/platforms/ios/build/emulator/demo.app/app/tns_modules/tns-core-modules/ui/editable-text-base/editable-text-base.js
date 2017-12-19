var common = require("./editable-text-base-common");
var enums = require("ui/enums");
var EditableTextBase = (function (_super) {
    __extends(EditableTextBase, _super);
    function EditableTextBase() {
        _super.apply(this, arguments);
    }
    EditableTextBase.prototype.dismissSoftInput = function () {
        this.ios.resignFirstResponder();
    };
    EditableTextBase.prototype._onKeyboardTypePropertyChanged = function (data) {
        var newKeyboardType;
        switch (data.newValue) {
            case enums.KeyboardType.datetime:
                newKeyboardType = 2;
                break;
            case enums.KeyboardType.phone:
                newKeyboardType = 5;
                break;
            case enums.KeyboardType.number:
                newKeyboardType = 2;
                break;
            case enums.KeyboardType.url:
                newKeyboardType = 3;
                break;
            case enums.KeyboardType.email:
                newKeyboardType = 7;
                break;
            default:
                newKeyboardType = 0;
                break;
        }
        this.ios.keyboardType = newKeyboardType;
    };
    EditableTextBase.prototype._onReturnKeyTypePropertyChanged = function (data) {
        var newValue;
        switch (data.newValue) {
            case enums.ReturnKeyType.done:
                newValue = 9;
                break;
            case enums.ReturnKeyType.go:
                newValue = 1;
                break;
            case enums.ReturnKeyType.next:
                newValue = 4;
                break;
            case enums.ReturnKeyType.search:
                newValue = 6;
                break;
            case enums.ReturnKeyType.send:
                newValue = 7;
                break;
            default:
                newValue = 0;
                break;
        }
        this.ios.returnKeyType = newValue;
    };
    EditableTextBase.prototype._onAutocapitalizationTypePropertyChanged = function (data) {
        var newValue;
        switch (data.newValue) {
            case enums.AutocapitalizationType.none:
                newValue = 0;
                break;
            case enums.AutocapitalizationType.words:
                newValue = 1;
                break;
            case enums.AutocapitalizationType.sentences:
                newValue = 2;
                break;
            case enums.AutocapitalizationType.allCharacters:
                newValue = 3;
                break;
            default:
                newValue = 2;
                break;
        }
        this.ios.autocapitalizationType = newValue;
    };
    EditableTextBase.prototype._onAutocorrectPropertyChanged = function (data) {
        var newValue;
        switch (data.newValue) {
            case true:
                newValue = 2;
                break;
            case false:
                newValue = 1;
                break;
            default:
                newValue = 0;
                break;
        }
        this.ios.autocorrectionType = newValue;
    };
    return EditableTextBase;
}(common.EditableTextBase));
exports.EditableTextBase = EditableTextBase;
//# sourceMappingURL=editable-text-base.js.map