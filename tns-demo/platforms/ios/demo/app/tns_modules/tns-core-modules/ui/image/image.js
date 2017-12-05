var imageCommon = require("./image-common");
var enums = require("ui/enums");
var style = require("ui/styling/style");
var trace = require("trace");
var utils = require("utils/utils");
global.moduleMerge(imageCommon, exports);
function onStretchPropertyChanged(data) {
    var image = data.object;
    switch (data.newValue) {
        case enums.Stretch.aspectFit:
            image.ios.contentMode = 1;
            break;
        case enums.Stretch.aspectFill:
            image.ios.contentMode = 2;
            break;
        case enums.Stretch.fill:
            image.ios.contentMode = 0;
            break;
        case enums.Stretch.none:
        default:
            image.ios.contentMode = 9;
            break;
    }
}
function onImageSourcePropertyChanged(data) {
    var image = data.object;
    image._setNativeImage(data.newValue ? data.newValue.ios : null);
}
imageCommon.Image.imageSourceProperty.metadata.onSetNativeValue = onImageSourcePropertyChanged;
imageCommon.Image.stretchProperty.metadata.onSetNativeValue = onStretchPropertyChanged;
var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        _super.call(this);
        this._imageSourceAffectsLayout = true;
        this._templateImageWasCreated = false;
        this._ios = UIImageView.new();
        this._ios.contentMode = 1;
        this._ios.clipsToBounds = true;
        this._ios.userInteractionEnabled = true;
    }
    Object.defineProperty(Image.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Image.prototype._setTintColor = function (value) {
        if (value !== null && this._ios.image && !this._templateImageWasCreated) {
            this._ios.image = this._ios.image.imageWithRenderingMode(2);
            this._templateImageWasCreated = true;
        }
        this._ios.tintColor = value;
    };
    Image.prototype._setNativeImage = function (nativeImage) {
        if (this.style.tintColor && nativeImage) {
            nativeImage = nativeImage.imageWithRenderingMode(2);
            this._templateImageWasCreated = true;
        }
        else {
            this._templateImageWasCreated = false;
        }
        this.ios.image = nativeImage;
        if (this._imageSourceAffectsLayout) {
            this.requestLayout();
        }
    };
    Image.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var width = utils.layout.getMeasureSpecSize(widthMeasureSpec);
        var widthMode = utils.layout.getMeasureSpecMode(widthMeasureSpec);
        var height = utils.layout.getMeasureSpecSize(heightMeasureSpec);
        var heightMode = utils.layout.getMeasureSpecMode(heightMeasureSpec);
        var nativeWidth = this.imageSource ? this.imageSource.width : 0;
        var nativeHeight = this.imageSource ? this.imageSource.height : 0;
        var measureWidth = Math.max(nativeWidth, this.minWidth);
        var measureHeight = Math.max(nativeHeight, this.minHeight);
        var finiteWidth = widthMode !== utils.layout.UNSPECIFIED;
        var finiteHeight = heightMode !== utils.layout.UNSPECIFIED;
        this._imageSourceAffectsLayout = widthMode !== utils.layout.EXACTLY || heightMode !== utils.layout.EXACTLY;
        if (nativeWidth !== 0 && nativeHeight !== 0 && (finiteWidth || finiteHeight)) {
            var scale = Image.computeScaleFactor(width, height, finiteWidth, finiteHeight, nativeWidth, nativeHeight, this.stretch);
            var resultW = Math.round(nativeWidth * scale.width);
            var resultH = Math.round(nativeHeight * scale.height);
            measureWidth = finiteWidth ? Math.min(resultW, width) : resultW;
            measureHeight = finiteHeight ? Math.min(resultH, height) : resultH;
            if (trace.enabled) {
                trace.write("Image stretch: " + this.stretch +
                    ", nativeWidth: " + nativeWidth +
                    ", nativeHeight: " + nativeHeight, trace.categories.Layout);
            }
        }
        var widthAndState = Image.resolveSizeAndState(measureWidth, width, widthMode, 0);
        var heightAndState = Image.resolveSizeAndState(measureHeight, height, heightMode, 0);
        this.setMeasuredDimension(widthAndState, heightAndState);
    };
    Image.computeScaleFactor = function (measureWidth, measureHeight, widthIsFinite, heightIsFinite, nativeWidth, nativeHeight, imageStretch) {
        var scaleW = 1;
        var scaleH = 1;
        if ((imageStretch === enums.Stretch.aspectFill || imageStretch === enums.Stretch.aspectFit || imageStretch === enums.Stretch.fill) &&
            (widthIsFinite || heightIsFinite)) {
            scaleW = (nativeWidth > 0) ? measureWidth / nativeWidth : 0;
            scaleH = (nativeHeight > 0) ? measureHeight / nativeHeight : 0;
            if (!widthIsFinite) {
                scaleW = scaleH;
            }
            else if (!heightIsFinite) {
                scaleH = scaleW;
            }
            else {
                switch (imageStretch) {
                    case enums.Stretch.aspectFit:
                        scaleH = scaleW < scaleH ? scaleW : scaleH;
                        scaleW = scaleH;
                        break;
                    case enums.Stretch.aspectFill:
                        scaleH = scaleW > scaleH ? scaleW : scaleH;
                        scaleW = scaleH;
                        break;
                }
            }
        }
        return { width: scaleW, height: scaleH };
    };
    return Image;
}(imageCommon.Image));
exports.Image = Image;
var ImageStyler = (function () {
    function ImageStyler() {
    }
    ImageStyler.setTintColorProperty = function (view, newValue) {
        var image = view;
        image._setTintColor(newValue);
    };
    ImageStyler.resetTintColorProperty = function (view, nativeValue) {
        view.ios.tintColor = null;
    };
    ImageStyler.registerHandlers = function () {
        style.registerHandler(style.tintColorProperty, new style.StylePropertyChangedHandler(ImageStyler.setTintColorProperty, ImageStyler.resetTintColorProperty), "Image");
    };
    return ImageStyler;
}());
exports.ImageStyler = ImageStyler;
ImageStyler.registerHandlers();
//# sourceMappingURL=image.js.map