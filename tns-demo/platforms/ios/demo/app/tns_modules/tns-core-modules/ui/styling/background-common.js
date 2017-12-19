var colorModule = require("color");
var enums = require("ui/enums");
var cssValue = require("css-value");
var utils = require("utils/utils");
var types;
function ensureTypes() {
    if (!types) {
        types = require("utils/types");
    }
}
var Background = (function () {
    function Background() {
        this.borderTopWidth = 0;
        this.borderRightWidth = 0;
        this.borderBottomWidth = 0;
        this.borderLeftWidth = 0;
        this.borderTopLeftRadius = 0;
        this.borderTopRightRadius = 0;
        this.borderBottomLeftRadius = 0;
        this.borderBottomRightRadius = 0;
    }
    Background.prototype.clone = function () {
        var clone = new Background();
        clone.color = this.color;
        clone.image = this.image;
        clone.repeat = this.repeat;
        clone.position = this.position;
        clone.size = this.size;
        clone.borderTopColor = this.borderTopColor;
        clone.borderRightColor = this.borderRightColor;
        clone.borderBottomColor = this.borderBottomColor;
        clone.borderLeftColor = this.borderLeftColor;
        clone.borderTopWidth = this.borderTopWidth;
        clone.borderRightWidth = this.borderRightWidth;
        clone.borderBottomWidth = this.borderBottomWidth;
        clone.borderLeftWidth = this.borderLeftWidth;
        clone.borderTopLeftRadius = this.borderTopLeftRadius;
        clone.borderTopRightRadius = this.borderTopRightRadius;
        clone.borderBottomRightRadius = this.borderBottomRightRadius;
        clone.borderBottomLeftRadius = this.borderBottomLeftRadius;
        clone.clipPath = this.clipPath;
        return clone;
    };
    Background.prototype.withColor = function (value) {
        var clone = this.clone();
        clone.color = value;
        return clone;
    };
    Background.prototype.withImage = function (value) {
        var clone = this.clone();
        clone.image = value;
        return clone;
    };
    Background.prototype.withRepeat = function (value) {
        var clone = this.clone();
        clone.repeat = value;
        return clone;
    };
    Background.prototype.withPosition = function (value) {
        var clone = this.clone();
        clone.position = value;
        return clone;
    };
    Background.prototype.withSize = function (value) {
        var clone = this.clone();
        clone.size = value;
        return clone;
    };
    Background.prototype.withBorderTopColor = function (value) {
        var clone = this.clone();
        clone.borderTopColor = value;
        return clone;
    };
    Background.prototype.withBorderRightColor = function (value) {
        var clone = this.clone();
        clone.borderRightColor = value;
        return clone;
    };
    Background.prototype.withBorderBottomColor = function (value) {
        var clone = this.clone();
        clone.borderBottomColor = value;
        return clone;
    };
    Background.prototype.withBorderLeftColor = function (value) {
        var clone = this.clone();
        clone.borderLeftColor = value;
        return clone;
    };
    Background.prototype.withBorderTopWidth = function (value) {
        var clone = this.clone();
        clone.borderTopWidth = value;
        return clone;
    };
    Background.prototype.withBorderRightWidth = function (value) {
        var clone = this.clone();
        clone.borderRightWidth = value;
        return clone;
    };
    Background.prototype.withBorderBottomWidth = function (value) {
        var clone = this.clone();
        clone.borderBottomWidth = value;
        return clone;
    };
    Background.prototype.withBorderLeftWidth = function (value) {
        var clone = this.clone();
        clone.borderLeftWidth = value;
        return clone;
    };
    Background.prototype.withBorderTopLeftRadius = function (value) {
        var clone = this.clone();
        clone.borderTopLeftRadius = value;
        return clone;
    };
    Background.prototype.withBorderTopRightRadius = function (value) {
        var clone = this.clone();
        clone.borderTopRightRadius = value;
        return clone;
    };
    Background.prototype.withBorderBottomRightRadius = function (value) {
        var clone = this.clone();
        clone.borderBottomRightRadius = value;
        return clone;
    };
    Background.prototype.withBorderBottomLeftRadius = function (value) {
        var clone = this.clone();
        clone.borderBottomLeftRadius = value;
        return clone;
    };
    Background.prototype.withClipPath = function (value) {
        var clone = this.clone();
        clone.clipPath = value;
        return clone;
    };
    Background.prototype.getDrawParams = function (width, height) {
        if (!this.image) {
            return null;
        }
        var res = {
            repeatX: true,
            repeatY: true,
            posX: 0,
            posY: 0,
        };
        if (this.repeat) {
            switch (this.repeat.toLowerCase()) {
                case enums.BackgroundRepeat.noRepeat:
                    res.repeatX = false;
                    res.repeatY = false;
                    break;
                case enums.BackgroundRepeat.repeatX:
                    res.repeatY = false;
                    break;
                case enums.BackgroundRepeat.repeatY:
                    res.repeatX = false;
                    break;
            }
        }
        var imageWidth = this.image.width;
        var imageHeight = this.image.height;
        if (this.size) {
            var values = cssValue(this.size);
            if (values.length === 2) {
                var vx = values[0];
                var vy = values[1];
                if (vx.unit === "%" && vy.unit === "%") {
                    imageWidth = width * vx.value / 100;
                    imageHeight = height * vy.value / 100;
                    res.sizeX = imageWidth;
                    res.sizeY = imageHeight;
                }
                else if (vx.type === "number" && vy.type === "number" &&
                    ((vx.unit === "px" && vy.unit === "px") || (vx.unit === "" && vy.unit === ""))) {
                    imageWidth = vx.value;
                    imageHeight = vy.value;
                    res.sizeX = imageWidth;
                    res.sizeY = imageHeight;
                }
            }
            else if (values.length === 1 && values[0].type === "ident") {
                var scale = 0;
                if (values[0].string === "cover") {
                    scale = Math.max(width / imageWidth, height / imageHeight);
                }
                else if (values[0].string === "contain") {
                    scale = Math.min(width / imageWidth, height / imageHeight);
                }
                if (scale > 0) {
                    imageWidth *= scale;
                    imageHeight *= scale;
                    res.sizeX = imageWidth;
                    res.sizeY = imageHeight;
                }
            }
        }
        if (this.position) {
            var v = Background.parsePosition(this.position);
            if (v) {
                var spaceX = width - imageWidth;
                var spaceY = height - imageHeight;
                if (v.x.unit === "%" && v.y.unit === "%") {
                    res.posX = spaceX * v.x.value / 100;
                    res.posY = spaceY * v.y.value / 100;
                }
                else if (v.x.type === "number" && v.y.type === "number" &&
                    ((v.x.unit === "px" && v.y.unit === "px") || (v.x.unit === "" && v.y.unit === ""))) {
                    res.posX = v.x.value;
                    res.posY = v.y.value;
                }
                else if (v.x.type === "ident" && v.y.type === "ident") {
                    if (v.x.string.toLowerCase() === "center") {
                        res.posX = spaceX / 2;
                    }
                    else if (v.x.string.toLowerCase() === "right") {
                        res.posX = spaceX;
                    }
                    if (v.y.string.toLowerCase() === "center") {
                        res.posY = spaceY / 2;
                    }
                    else if (v.y.string.toLowerCase() === "bottom") {
                        res.posY = spaceY;
                    }
                }
            }
        }
        return res;
    };
    Background.parsePosition = function (pos) {
        var values = cssValue(pos);
        if (values.length === 2) {
            return {
                x: values[0],
                y: values[1]
            };
        }
        if (values.length === 1 && values[0].type === "ident") {
            var val = values[0].string.toLocaleLowerCase();
            var center = {
                type: "ident",
                string: "center"
            };
            if (val === "left" || val === "right") {
                return {
                    x: values[0],
                    y: center
                };
            }
            else if (val === "top" || val === "bottom") {
                return {
                    x: center,
                    y: values[0]
                };
            }
            else if (val === "center") {
                return {
                    x: center,
                    y: center
                };
            }
        }
        return null;
    };
    ;
    Background.prototype.isEmpty = function () {
        ensureTypes();
        return types.isNullOrUndefined(this.color)
            && types.isNullOrUndefined(this.image)
            && !this.hasBorderWidth()
            && !this.hasBorderRadius()
            && !this.clipPath;
    };
    Background.equals = function (value1, value2) {
        if (!value1 && !value2) {
            return true;
        }
        if (!value1 || !value2) {
            return false;
        }
        return colorModule.Color.equals(value1.color, value2.color)
            && value1.image === value2.image
            && value1.position === value2.position
            && value1.repeat === value2.repeat
            && value1.size === value2.size
            && colorModule.Color.equals(value1.borderTopColor, value2.borderTopColor)
            && colorModule.Color.equals(value1.borderRightColor, value2.borderRightColor)
            && colorModule.Color.equals(value1.borderBottomColor, value2.borderBottomColor)
            && colorModule.Color.equals(value1.borderLeftColor, value2.borderLeftColor)
            && value1.borderTopWidth === value2.borderTopWidth
            && value1.borderRightWidth === value2.borderRightWidth
            && value1.borderBottomWidth === value2.borderBottomWidth
            && value1.borderLeftWidth === value2.borderLeftWidth
            && value1.borderTopLeftRadius === value2.borderTopLeftRadius
            && value1.borderTopRightRadius === value2.borderTopRightRadius
            && value1.borderBottomRightRadius === value2.borderBottomRightRadius
            && value1.borderBottomLeftRadius === value2.borderBottomLeftRadius
            && value1.clipPath === value2.clipPath;
    };
    Background.prototype.hasBorderColor = function () {
        return !types.isNullOrUndefined(this.borderTopColor)
            || !types.isNullOrUndefined(this.borderRightColor)
            || !types.isNullOrUndefined(this.borderBottomColor)
            || !types.isNullOrUndefined(this.borderLeftColor);
    };
    Background.prototype.hasBorderWidth = function () {
        return this.borderTopWidth > 0
            || this.borderRightWidth > 0
            || this.borderBottomWidth > 0
            || this.borderLeftWidth > 0;
    };
    Background.prototype.hasBorderRadius = function () {
        return this.borderTopLeftRadius > 0
            || this.borderTopRightRadius > 0
            || this.borderBottomRightRadius > 0
            || this.borderBottomLeftRadius > 0;
    };
    Background.prototype.hasUniformBorderColor = function () {
        return colorModule.Color.equals(this.borderTopColor, this.borderRightColor)
            && colorModule.Color.equals(this.borderTopColor, this.borderBottomColor)
            && colorModule.Color.equals(this.borderTopColor, this.borderLeftColor);
    };
    Background.prototype.hasUniformBorderWidth = function () {
        return this.borderTopWidth === this.borderRightWidth
            && this.borderTopWidth === this.borderBottomWidth
            && this.borderTopWidth === this.borderLeftWidth;
    };
    Background.prototype.hasUniformBorderRadius = function () {
        return this.borderTopLeftRadius === this.borderTopRightRadius
            && this.borderTopLeftRadius === this.borderBottomRightRadius
            && this.borderTopLeftRadius === this.borderBottomLeftRadius;
    };
    Background.prototype.hasUniformBorder = function () {
        return this.hasUniformBorderColor()
            && this.hasUniformBorderWidth()
            && this.hasUniformBorderRadius();
    };
    Background.prototype.getUniformBorderColor = function () {
        if (this.hasUniformBorderColor()) {
            return this.borderTopColor;
        }
        return undefined;
    };
    ;
    Background.prototype.getUniformBorderWidth = function () {
        if (this.hasUniformBorderWidth()) {
            return this.borderTopWidth;
        }
        return 0;
    };
    ;
    Background.prototype.getUniformBorderRadius = function () {
        if (this.hasUniformBorderRadius()) {
            return this.borderTopLeftRadius;
        }
        return 0;
    };
    ;
    Background.prototype.toString = function () {
        return "isEmpty: " + this.isEmpty() + "; color: " + this.color + "; image: " + this.image + "; repeat: " + this.repeat + "; position: " + this.position + "; size: " + this.size + "; borderTopColor: " + this.borderTopColor + "; borderRightColor: " + this.borderRightColor + "; borderBottomColor: " + this.borderBottomColor + "; borderLeftColor: " + this.borderLeftColor + "; borderTopWidth: " + this.borderTopWidth + "; borderRightWidth: " + this.borderRightWidth + "; borderBottomWidth: " + this.borderBottomWidth + "; borderLeftWidth: " + this.borderLeftWidth + "; borderTopLeftRadius: " + this.borderTopLeftRadius + "; borderTopRightRadius: " + this.borderTopRightRadius + "; borderBottomRightRadius: " + this.borderBottomRightRadius + "; borderBottomLeftRadius: " + this.borderBottomLeftRadius + "; clipPath: " + this.clipPath + ";";
    };
    Background.default = new Background();
    return Background;
}());
exports.Background = Background;
function cssValueToDevicePixels(source, total) {
    var result;
    source = source.trim();
    if (source.indexOf("px") !== -1) {
        result = parseFloat(source.replace("px", ""));
    }
    else if (source.indexOf("%") !== -1 && total > 0) {
        result = (parseFloat(source.replace("%", "")) / 100) * utils.layout.toDeviceIndependentPixels(total);
    }
    else {
        result = parseFloat(source);
    }
    return utils.layout.toDevicePixels(result);
}
exports.cssValueToDevicePixels = cssValueToDevicePixels;
//# sourceMappingURL=background-common.js.map