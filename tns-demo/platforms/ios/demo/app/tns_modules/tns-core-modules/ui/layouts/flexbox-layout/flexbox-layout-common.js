var layout_base_1 = require("ui/layouts/layout-base");
var proxy_1 = require("ui/core/proxy");
var dependency_observable_1 = require("ui/core/dependency-observable");
var special_properties_1 = require("ui/builder/special-properties");
var platform_1 = require("platform");
var types_1 = require("utils/types");
var styleProperty = require("ui/styling/style-property");
var style = require("ui/styling/style");
var flexbox = require("ui/layouts/flexbox-layout");
var ORDER_DEFAULT = 1;
var FLEX_GROW_DEFAULT = 0.0;
var FLEX_SHRINK_DEFAULT = 1.0;
function makeValidator() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i - 0] = arguments[_i];
    }
    var set = new Set(values);
    return function (value) { return set.has(value); };
}
function makeParser(isValid, def) {
    return function (value) {
        var lower = value && value.toLowerCase();
        return isValid(lower) ? lower : def;
    };
}
var FlexDirection;
(function (FlexDirection) {
    FlexDirection.ROW = "row";
    FlexDirection.ROW_REVERSE = "row-reverse";
    FlexDirection.COLUMN = "column";
    FlexDirection.COLUMN_REVERSE = "column-reverse";
    FlexDirection.isValid = makeValidator(FlexDirection.ROW, FlexDirection.ROW_REVERSE, FlexDirection.COLUMN, FlexDirection.COLUMN_REVERSE);
    FlexDirection.parse = makeParser(FlexDirection.isValid, FlexDirection.ROW);
})(FlexDirection = exports.FlexDirection || (exports.FlexDirection = {}));
var FlexWrap;
(function (FlexWrap) {
    FlexWrap.NOWRAP = "nowrap";
    FlexWrap.WRAP = "wrap";
    FlexWrap.WRAP_REVERSE = "wrap-reverse";
    FlexWrap.isValid = makeValidator(FlexWrap.NOWRAP, FlexWrap.WRAP, FlexWrap.WRAP_REVERSE);
    FlexWrap.parse = makeParser(FlexWrap.isValid, FlexWrap.NOWRAP);
})(FlexWrap = exports.FlexWrap || (exports.FlexWrap = {}));
var JustifyContent;
(function (JustifyContent) {
    JustifyContent.FLEX_START = "flex-start";
    JustifyContent.FLEX_END = "flex-end";
    JustifyContent.CENTER = "center";
    JustifyContent.SPACE_BETWEEN = "space-between";
    JustifyContent.SPACE_AROUND = "space-around";
    JustifyContent.isValid = makeValidator(JustifyContent.FLEX_START, JustifyContent.FLEX_END, JustifyContent.CENTER, JustifyContent.SPACE_BETWEEN, JustifyContent.SPACE_AROUND);
    JustifyContent.parse = makeParser(JustifyContent.isValid, JustifyContent.FLEX_START);
})(JustifyContent = exports.JustifyContent || (exports.JustifyContent = {}));
var FlexBasisPercent;
(function (FlexBasisPercent) {
    FlexBasisPercent.DEFAULT = -1;
})(FlexBasisPercent = exports.FlexBasisPercent || (exports.FlexBasisPercent = {}));
var AlignItems;
(function (AlignItems) {
    AlignItems.FLEX_START = "flex-start";
    AlignItems.FLEX_END = "flex-end";
    AlignItems.CENTER = "center";
    AlignItems.BASELINE = "baseline";
    AlignItems.STRETCH = "stretch";
    AlignItems.isValid = makeValidator(AlignItems.FLEX_START, AlignItems.FLEX_END, AlignItems.CENTER, AlignItems.BASELINE, AlignItems.STRETCH);
    AlignItems.parse = makeParser(AlignItems.isValid, AlignItems.FLEX_START);
})(AlignItems = exports.AlignItems || (exports.AlignItems = {}));
var AlignContent;
(function (AlignContent) {
    AlignContent.FLEX_START = "flex-start";
    AlignContent.FLEX_END = "flex-end";
    AlignContent.CENTER = "center";
    AlignContent.SPACE_BETWEEN = "space-between";
    AlignContent.SPACE_AROUND = "space-around";
    AlignContent.STRETCH = "stretch";
    AlignContent.isValid = makeValidator(AlignContent.FLEX_START, AlignContent.FLEX_END, AlignContent.CENTER, AlignContent.SPACE_BETWEEN, AlignContent.SPACE_AROUND, AlignContent.STRETCH);
    AlignContent.parse = makeParser(AlignContent.isValid, AlignContent.FLEX_START);
})(AlignContent = exports.AlignContent || (exports.AlignContent = {}));
var Order;
(function (Order) {
    function isValid(value) {
        return isFinite(parseInt(value));
    }
    Order.isValid = isValid;
    Order.parse = parseInt;
})(Order = exports.Order || (exports.Order = {}));
var FlexGrow;
(function (FlexGrow) {
    function isValid(value) {
        var parsed = parseInt(value);
        return isFinite(parsed) && value >= 0;
    }
    FlexGrow.isValid = isValid;
    FlexGrow.parse = parseFloat;
})(FlexGrow = exports.FlexGrow || (exports.FlexGrow = {}));
var FlexShrink;
(function (FlexShrink) {
    function isValid(value) {
        var parsed = parseInt(value);
        return isFinite(parsed) && value >= 0;
    }
    FlexShrink.isValid = isValid;
    FlexShrink.parse = parseFloat;
})(FlexShrink = exports.FlexShrink || (exports.FlexShrink = {}));
var FlexWrapBefore;
(function (FlexWrapBefore) {
    function isValid(value) {
        if (types_1.isBoolean(value)) {
            return true;
        }
        if (types_1.isString(value)) {
            var str = value.trim().toLowerCase();
            return str === "true" || str === "false";
        }
        return false;
    }
    FlexWrapBefore.isValid = isValid;
    function parse(value) {
        return value && value.toString().trim().toLowerCase() === "true";
    }
    FlexWrapBefore.parse = parse;
})(FlexWrapBefore = exports.FlexWrapBefore || (exports.FlexWrapBefore = {}));
var AlignSelf;
(function (AlignSelf) {
    AlignSelf.AUTO = "auto";
    AlignSelf.FLEX_START = "flex-start";
    AlignSelf.FLEX_END = "flex-end";
    AlignSelf.CENTER = "center";
    AlignSelf.BASELINE = "baseline";
    AlignSelf.STRETCH = "stretch";
    AlignSelf.isValid = makeValidator(AlignSelf.AUTO, AlignSelf.FLEX_START, AlignSelf.FLEX_END, AlignSelf.CENTER, AlignSelf.BASELINE, AlignSelf.STRETCH);
    AlignSelf.parse = makeParser(AlignSelf.isValid, AlignSelf.AUTO);
})(AlignSelf = exports.AlignSelf || (exports.AlignSelf = {}));
function validateArgs(element) {
    if (!element) {
        throw new Error("element cannot be null or undefinied.");
    }
    return element;
}
var FlexboxLayoutBase = (function (_super) {
    __extends(FlexboxLayoutBase, _super);
    function FlexboxLayoutBase() {
        _super.call(this);
    }
    Object.defineProperty(FlexboxLayoutBase.prototype, "flexDirection", {
        get: function () {
            return this.style._getValue(exports.flexDirectionProperty);
        },
        set: function (value) {
            this.style._setValue(exports.flexDirectionProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexboxLayoutBase.prototype, "flexWrap", {
        get: function () {
            return this.style._getValue(exports.flexWrapProperty);
        },
        set: function (value) {
            this.style._setValue(exports.flexWrapProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexboxLayoutBase.prototype, "justifyContent", {
        get: function () {
            return this.style._getValue(exports.justifyContentProperty);
        },
        set: function (value) {
            this.style._setValue(exports.justifyContentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexboxLayoutBase.prototype, "alignItems", {
        get: function () {
            return this.style._getValue(exports.alignItemsProperty);
        },
        set: function (value) {
            this.style._setValue(exports.alignItemsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexboxLayoutBase.prototype, "alignContent", {
        get: function () {
            return this.style._getValue(exports.alignContentProperty);
        },
        set: function (value) {
            this.style._setValue(exports.alignContentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    FlexboxLayoutBase.setOrder = function (view, order) {
        validateArgs(view).style._setValue(exports.orderProperty, order);
    };
    FlexboxLayoutBase.getOrder = function (view) {
        return validateArgs(view).style._getValue(exports.orderProperty);
    };
    FlexboxLayoutBase.setFlexGrow = function (view, grow) {
        validateArgs(view).style._setValue(exports.flexGrowProperty, grow);
    };
    FlexboxLayoutBase.getFlexGrow = function (view) {
        return validateArgs(view).style._getValue(exports.flexGrowProperty);
    };
    FlexboxLayoutBase.setFlexShrink = function (view, shrink) {
        validateArgs(view).style._setValue(exports.flexShrinkProperty, shrink);
    };
    FlexboxLayoutBase.getFlexShrink = function (view) {
        return validateArgs(view).style._getValue(exports.flexShrinkProperty);
    };
    FlexboxLayoutBase.setAlignSelf = function (view, align) {
        validateArgs(view).style._setValue(exports.alignSelfProperty, align);
    };
    FlexboxLayoutBase.getAlignSelf = function (view) {
        return validateArgs(view).style._getValue(exports.alignSelfProperty);
    };
    FlexboxLayoutBase.setFlexWrapBefore = function (view, wrap) {
        validateArgs(view).style._setValue(exports.flexWrapBeforeProperty, wrap);
    };
    FlexboxLayoutBase.getFlexWrapBefore = function (view) {
        return validateArgs(view).style._getValue(exports.flexWrapBeforeProperty);
    };
    return FlexboxLayoutBase;
}(layout_base_1.LayoutBase));
exports.FlexboxLayoutBase = FlexboxLayoutBase;
var flexboxAffectsLayout = platform_1.isAndroid ? dependency_observable_1.PropertyMetadataSettings.None : dependency_observable_1.PropertyMetadataSettings.AffectsLayout;
exports.flexDirectionProperty = new styleProperty.Property("flexDirection", "flex-direction", new proxy_1.PropertyMetadata(FlexDirection.ROW, flexboxAffectsLayout, undefined, FlexDirection.isValid), FlexDirection.parse);
exports.flexWrapProperty = new styleProperty.Property("flexWrap", "flex-wrap", new proxy_1.PropertyMetadata(FlexWrap.NOWRAP, flexboxAffectsLayout, undefined, FlexWrap.isValid), FlexWrap.parse);
exports.justifyContentProperty = new styleProperty.Property("justifyContent", "justify-content", new proxy_1.PropertyMetadata(JustifyContent.FLEX_START, flexboxAffectsLayout, undefined, JustifyContent.isValid), JustifyContent.parse);
exports.alignItemsProperty = new styleProperty.Property("alignItems", "align-items", new proxy_1.PropertyMetadata(AlignItems.STRETCH, flexboxAffectsLayout, undefined, AlignItems.isValid), AlignItems.parse);
exports.alignContentProperty = new styleProperty.Property("alignContent", "align-content", new proxy_1.PropertyMetadata(AlignContent.STRETCH, flexboxAffectsLayout, undefined, AlignContent.isValid), AlignContent.parse);
exports.orderProperty = new styleProperty.Property("order", "order", new proxy_1.PropertyMetadata(ORDER_DEFAULT, dependency_observable_1.PropertyMetadataSettings.None, undefined, Order.isValid), Order.parse);
exports.flexGrowProperty = new styleProperty.Property("flexGrow", "flex-grow", new proxy_1.PropertyMetadata(FLEX_GROW_DEFAULT, dependency_observable_1.PropertyMetadataSettings.None, undefined, FlexGrow.isValid), FlexGrow.parse);
exports.flexShrinkProperty = new styleProperty.Property("flexShrink", "flex-shrink", new proxy_1.PropertyMetadata(FLEX_SHRINK_DEFAULT, dependency_observable_1.PropertyMetadataSettings.None, undefined, FlexShrink.isValid), FlexShrink.parse);
exports.flexWrapBeforeProperty = new styleProperty.Property("flexWrapBefore", "flex-wrap-before", new proxy_1.PropertyMetadata(false, dependency_observable_1.PropertyMetadataSettings.None, undefined, FlexWrapBefore.isValid), FlexWrapBefore.parse);
exports.alignSelfProperty = new styleProperty.Property("alignSelf", "align-self", new proxy_1.PropertyMetadata(AlignSelf.AUTO, dependency_observable_1.PropertyMetadataSettings.None, undefined, AlignSelf.isValid), AlignSelf.parse);
special_properties_1.registerSpecialProperty("order", function (instance, propertyValue) {
    FlexboxLayoutBase.setOrder(instance, !isNaN(+propertyValue) && +propertyValue);
});
special_properties_1.registerSpecialProperty("flexGrow", function (instance, propertyValue) {
    FlexboxLayoutBase.setFlexGrow(instance, !isNaN(+propertyValue) && +propertyValue);
});
special_properties_1.registerSpecialProperty("flexShrink", function (instance, propertyValue) {
    FlexboxLayoutBase.setFlexShrink(instance, !isNaN(+propertyValue) && +propertyValue);
});
special_properties_1.registerSpecialProperty("alignSelf", function (instance, propertyValue) {
    FlexboxLayoutBase.setAlignSelf(instance, propertyValue);
});
special_properties_1.registerSpecialProperty("flexWrapBefore", function (instance, propertyValue) {
    FlexboxLayoutBase.setFlexWrapBefore(instance, types_1.isString(propertyValue) ? FlexWrapBefore.parse(propertyValue) : propertyValue);
});
var flexboxGuard = function (handler) { return function (view, newValue) { return view instanceof FlexboxLayoutBase ? handler(view, newValue) : void 0; }; };
style.registerHandler(exports.flexDirectionProperty, new style.StylePropertyChangedHandler(flexboxGuard(function (flexbox, newValue) { return flexbox._setNativeFlexDirection(newValue); }), flexboxGuard(function (flexbox, newValue) { return flexbox._setNativeFlexDirection(FlexDirection.ROW); })), "FlexboxLayout");
style.registerHandler(exports.flexWrapProperty, new style.StylePropertyChangedHandler(flexboxGuard(function (flexbox, newValue) { return flexbox._setNativeFlexWrap(newValue); }), flexboxGuard(function (flexbox, newValue) { return flexbox._setNativeFlexWrap(FlexWrap.NOWRAP); })), "FlexboxLayout");
style.registerHandler(exports.justifyContentProperty, new style.StylePropertyChangedHandler(flexboxGuard(function (flexbox, newValue) { return flexbox._setNativeJustifyContent(newValue); }), flexboxGuard(function (flexbox, newValue) { return flexbox._setNativeJustifyContent(JustifyContent.FLEX_START); })), "FlexboxLayout");
style.registerHandler(exports.alignItemsProperty, new style.StylePropertyChangedHandler(flexboxGuard(function (flexbox, newValue) { return flexbox._setNativeAlignItems(newValue); }), flexboxGuard(function (flexbox, newValue) { return flexbox._setNativeAlignItems(AlignItems.STRETCH); })), "FlexboxLayout");
style.registerHandler(exports.alignContentProperty, new style.StylePropertyChangedHandler(flexboxGuard(function (flexbox, newValue) { return flexbox._setNativeAlignContent(newValue); }), flexboxGuard(function (flexbox, newValue) { return flexbox._setNativeAlignContent(AlignContent.STRETCH); })), "FlexboxLayout");
style.registerHandler(exports.orderProperty, new style.StylePropertyChangedHandler(function (view, value) { return flexbox._onNativeOrderPropertyChanged(view, value); }, function (view, value) { return flexbox._onNativeOrderPropertyChanged(view, 1); }), "View");
style.registerHandler(exports.flexGrowProperty, new style.StylePropertyChangedHandler(function (view, value) { return flexbox._onNativeFlexGrowPropertyChanged(view, value); }, function (view, value) { return flexbox._onNativeFlexGrowPropertyChanged(view, 0); }), "View");
style.registerHandler(exports.flexShrinkProperty, new style.StylePropertyChangedHandler(function (view, value) { return flexbox._onNativeFlexShrinkPropertyChanged(view, value); }, function (view, value) { return flexbox._onNativeFlexShrinkPropertyChanged(view, 1); }), "View");
style.registerHandler(exports.flexWrapBeforeProperty, new style.StylePropertyChangedHandler(function (view, value) { return flexbox._onNativeFlexWrapBeforePropertyChanged(view, value); }, function (view, value) { return flexbox._onNativeFlexWrapBeforePropertyChanged(view, false); }), "View");
style.registerHandler(exports.alignSelfProperty, new style.StylePropertyChangedHandler(function (view, value) { return flexbox._onNativeAlignSelfPropertyChanged(view, value); }, function (view, value) { return flexbox._onNativeAlignSelfPropertyChanged(view, AlignSelf.AUTO); }), "View");
styleProperty.registerShorthandCallback("flex-flow", function (value) {
    var properties = [];
    var trimmed = value && value.trim();
    if (trimmed) {
        var values = trimmed.split(/\s+/);
        if (values.length >= 1 && FlexDirection.isValid(values[0])) {
            properties.push({ property: exports.flexDirectionProperty, value: FlexDirection.parse(values[0]) });
        }
        if (value.length >= 2 && FlexWrap.isValid(values[1])) {
            properties.push({ property: exports.flexWrapProperty, value: FlexWrap.parse(values[1]) });
        }
    }
    return properties;
});
styleProperty.registerShorthandCallback("flex", function (value) {
    var properties = [];
    var trimmed = value && value.trim();
    if (trimmed) {
        var values = trimmed.split(/\s+/);
        if (values.length === 1) {
            switch (values[0]) {
                case "inital":
                    properties.push({ property: exports.flexGrowProperty, value: 0 });
                    properties.push({ property: exports.flexShrinkProperty, value: 1 });
                    break;
                case "auto":
                    properties.push({ property: exports.flexGrowProperty, value: 1 });
                    properties.push({ property: exports.flexShrinkProperty, value: 1 });
                    break;
                case "none":
                    properties.push({ property: exports.flexGrowProperty, value: 0 });
                    properties.push({ property: exports.flexShrinkProperty, value: 0 });
                    break;
                default:
                    if (FlexGrow.isValid(values[0])) {
                        properties.push({ property: exports.flexGrowProperty, value: FlexGrow.parse(values[0]) });
                        properties.push({ property: exports.flexShrinkProperty, value: 1 });
                    }
            }
        }
        if (values.length >= 2) {
            if (FlexGrow.isValid(values[0]) && FlexShrink.isValid(values[1])) {
                properties.push({ property: exports.flexGrowProperty, value: FlexGrow.parse(values[0]) });
                properties.push({ property: exports.flexShrinkProperty, value: FlexShrink.parse(values[1]) });
            }
        }
    }
    return properties;
});
//# sourceMappingURL=flexbox-layout-common.js.map