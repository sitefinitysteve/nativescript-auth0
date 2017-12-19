var common = require("./image-asset-common");
global.moduleMerge(common, exports);
var ImageAsset = (function (_super) {
    __extends(ImageAsset, _super);
    function ImageAsset(asset) {
        _super.call(this);
        if (asset instanceof UIImage) {
            this.nativeImage = asset;
        }
        else {
            this.ios = asset;
        }
    }
    ImageAsset.prototype.getImageAsync = function (callback) {
        var _this = this;
        var srcWidth = this.nativeImage ? this.nativeImage.size.width : this.ios.pixelWidth;
        var srcHeight = this.nativeImage ? this.nativeImage.size.height : this.ios.pixelHeight;
        var requestedSize = common.getRequestedImageSize({ width: srcWidth, height: srcHeight }, this.options);
        if (this.nativeImage) {
            var newSize = CGSizeMake(requestedSize.width, requestedSize.height);
            var resizedImage = this.scaleImage(this.nativeImage, newSize);
            callback(resizedImage, null);
            return;
        }
        var imageRequestOptions = PHImageRequestOptions.alloc().init();
        imageRequestOptions.deliveryMode = 1;
        PHImageManager.defaultManager().requestImageForAssetTargetSizeContentModeOptionsResultHandler(this.ios, requestedSize, 0, imageRequestOptions, function (image, imageResultInfo) {
            if (image) {
                var resultImage = _this.scaleImage(image, requestedSize);
                callback(resultImage, null);
            }
            else {
                callback(null, imageResultInfo.valueForKey(PHImageErrorKey));
            }
        });
    };
    ImageAsset.prototype.scaleImage = function (image, requestedSize) {
        UIGraphicsBeginImageContextWithOptions(requestedSize, false, 0.0);
        image.drawInRect(CGRectMake(0, 0, requestedSize.width, requestedSize.height));
        var resultImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        return resultImage;
    };
    return ImageAsset;
}(common.ImageAsset));
exports.ImageAsset = ImageAsset;
//# sourceMappingURL=image-asset.js.map