var common = require("./background-common");
var color_1 = require("color");
var utils = require("utils/utils");
global.moduleMerge(common, exports);
var style;
function ensureStyle() {
    if (!style) {
        style = require("./style");
    }
}
var ios;
(function (ios) {
    function createBackgroundUIColor(view, flip) {
        var nativeView = view._nativeView;
        if (!nativeView) {
            return undefined;
        }
        ensureStyle();
        nativeView.layer.borderColor = undefined;
        nativeView.layer.borderWidth = 0;
        nativeView.layer.cornerRadius = 0;
        nativeView.clipsToBounds = true;
        if (nativeView["topBorderLayer"]) {
            nativeView["topBorderLayer"].removeFromSuperlayer();
        }
        if (nativeView["rightBorderLayer"]) {
            nativeView["rightBorderLayer"].removeFromSuperlayer();
        }
        if (nativeView["bottomBorderLayer"]) {
            nativeView["bottomBorderLayer"].removeFromSuperlayer();
        }
        if (nativeView["leftBorderLayer"]) {
            nativeView["leftBorderLayer"].removeFromSuperlayer();
        }
        var background = view.style._getValue(style.backgroundInternalProperty);
        if (!background || background.isEmpty()) {
            return undefined;
        }
        if (background.clipPath) {
            drawClipPath(nativeView, background);
        }
        if (background.hasUniformBorder()) {
            var borderColor = background.getUniformBorderColor();
            if (borderColor && borderColor.ios) {
                nativeView.layer.borderColor = borderColor.ios.CGColor;
            }
            else {
                nativeView.layer.borderColor = undefined;
            }
            nativeView.layer.borderWidth = background.getUniformBorderWidth();
            nativeView.layer.cornerRadius = background.getUniformBorderRadius();
        }
        else {
            var nativeViewLayerBounds = {
                left: nativeView.layer.bounds.origin.x,
                top: nativeView.layer.bounds.origin.y,
                bottom: nativeView.layer.bounds.size.height,
                right: nativeView.layer.bounds.size.width
            };
            var top = background.borderTopWidth;
            var right = background.borderRightWidth;
            var bottom = background.borderBottomWidth;
            var left = background.borderLeftWidth;
            var lto = { x: nativeViewLayerBounds.left, y: nativeViewLayerBounds.top };
            var lti = { x: nativeViewLayerBounds.left + left, y: nativeViewLayerBounds.top + top };
            var rto = { x: nativeViewLayerBounds.right, y: nativeViewLayerBounds.top };
            var rti = { x: nativeViewLayerBounds.right - right, y: nativeViewLayerBounds.top + top };
            var rbo = { x: nativeViewLayerBounds.right, y: nativeViewLayerBounds.bottom };
            var rbi = { x: nativeViewLayerBounds.right - right, y: nativeViewLayerBounds.bottom - bottom };
            var lbo = { x: nativeViewLayerBounds.left, y: nativeViewLayerBounds.bottom };
            var lbi = { x: nativeViewLayerBounds.left + left, y: nativeViewLayerBounds.bottom - bottom };
            if (top > 0 && background.borderTopColor && background.borderTopColor.ios) {
                var topBorderPath = CGPathCreateMutable();
                CGPathMoveToPoint(topBorderPath, null, lto.x, lto.y);
                CGPathAddLineToPoint(topBorderPath, null, rto.x, rto.y);
                CGPathAddLineToPoint(topBorderPath, null, rti.x, rti.y);
                CGPathAddLineToPoint(topBorderPath, null, lti.x, lti.y);
                CGPathAddLineToPoint(topBorderPath, null, lto.x, lto.y);
                var topBorderLayer = CAShapeLayer.layer();
                topBorderLayer.fillColor = background.borderTopColor.ios.CGColor;
                topBorderLayer.path = topBorderPath;
                nativeView.layer.addSublayer(topBorderLayer);
                nativeView["topBorderLayer"] = topBorderLayer;
            }
            if (right > 0 && background.borderRightColor && background.borderRightColor.ios) {
                var rightBorderPath = CGPathCreateMutable();
                CGPathMoveToPoint(rightBorderPath, null, rto.x, rto.y);
                CGPathAddLineToPoint(rightBorderPath, null, rbo.x, rbo.y);
                CGPathAddLineToPoint(rightBorderPath, null, rbi.x, rbi.y);
                CGPathAddLineToPoint(rightBorderPath, null, rti.x, rti.y);
                CGPathAddLineToPoint(rightBorderPath, null, rto.x, rto.y);
                var rightBorderLayer = CAShapeLayer.layer();
                rightBorderLayer.fillColor = background.borderRightColor.ios.CGColor;
                rightBorderLayer.path = rightBorderPath;
                nativeView.layer.addSublayer(rightBorderLayer);
                nativeView["rightBorderLayer"] = rightBorderLayer;
            }
            if (bottom > 0 && background.borderBottomColor && background.borderBottomColor.ios) {
                var bottomBorderPath = CGPathCreateMutable();
                CGPathMoveToPoint(bottomBorderPath, null, rbo.x, rbo.y);
                CGPathAddLineToPoint(bottomBorderPath, null, lbo.x, lbo.y);
                CGPathAddLineToPoint(bottomBorderPath, null, lbi.x, lbi.y);
                CGPathAddLineToPoint(bottomBorderPath, null, rbi.x, rbi.y);
                CGPathAddLineToPoint(bottomBorderPath, null, rbo.x, rbo.y);
                var bottomBorderLayer = CAShapeLayer.layer();
                bottomBorderLayer.fillColor = background.borderBottomColor.ios.CGColor;
                bottomBorderLayer.path = bottomBorderPath;
                nativeView.layer.addSublayer(bottomBorderLayer);
                nativeView["bottomBorderLayer"] = bottomBorderLayer;
            }
            if (left > 0 && background.borderLeftColor && background.borderLeftColor.ios) {
                var leftBorderPath = CGPathCreateMutable();
                CGPathMoveToPoint(leftBorderPath, null, lbo.x, lbo.y);
                CGPathAddLineToPoint(leftBorderPath, null, lto.x, lto.y);
                CGPathAddLineToPoint(leftBorderPath, null, lti.x, lti.y);
                CGPathAddLineToPoint(leftBorderPath, null, lbi.x, lbi.y);
                CGPathAddLineToPoint(leftBorderPath, null, lbo.x, lbo.y);
                var leftBorderLayer = CAShapeLayer.layer();
                leftBorderLayer.fillColor = background.borderLeftColor.ios.CGColor;
                leftBorderLayer.path = leftBorderPath;
                nativeView.layer.addSublayer(leftBorderLayer);
                nativeView["leftBorderLayer"] = leftBorderLayer;
            }
        }
        if (!background.image) {
            return background.color ? background.color.ios : undefined;
        }
        var frame = nativeView.frame;
        var boundsWidth = view.scaleX ? frame.size.width / view.scaleX : frame.size.width;
        var boundsHeight = view.scaleY ? frame.size.height / view.scaleY : frame.size.height;
        if (!boundsWidth || !boundsHeight) {
            return undefined;
        }
        var img = background.image.ios;
        var params = background.getDrawParams(boundsWidth, boundsHeight);
        if (params.sizeX > 0 && params.sizeY > 0) {
            var resizeRect = CGRectMake(0, 0, params.sizeX, params.sizeY);
            UIGraphicsBeginImageContext(resizeRect.size);
            img.drawInRect(resizeRect);
            img = UIGraphicsGetImageFromCurrentImageContext();
            UIGraphicsEndImageContext();
        }
        UIGraphicsBeginImageContextWithOptions(CGSizeFromString("{" + boundsWidth + "," + boundsHeight + "}"), false, 0.0);
        var context = UIGraphicsGetCurrentContext();
        if (background.color && background.color.ios) {
            CGContextSetFillColorWithColor(context, background.color.ios.CGColor);
            CGContextFillRect(context, CGRectMake(0, 0, boundsWidth, boundsHeight));
        }
        if (!params.repeatX && !params.repeatY) {
            img.drawAtPoint(CGPointMake(params.posX, params.posY));
        }
        else {
            var w = params.repeatX ? boundsWidth : img.size.width;
            var h = params.repeatY ? boundsHeight : img.size.height;
            CGContextSetPatternPhase(context, CGSizeMake(params.posX, params.posY));
            params.posX = params.repeatX ? 0 : params.posX;
            params.posY = params.repeatY ? 0 : params.posY;
            var patternRect = CGRectMake(params.posX, params.posY, w, h);
            img.drawAsPatternInRect(patternRect);
        }
        var bkgImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        if (flip) {
            var flippedImage = _flipImage(bkgImage);
            return UIColor.alloc().initWithPatternImage(flippedImage);
        }
        return UIColor.alloc().initWithPatternImage(bkgImage);
    }
    ios.createBackgroundUIColor = createBackgroundUIColor;
    function _flipImage(originalImage) {
        UIGraphicsBeginImageContextWithOptions(originalImage.size, false, 0.0);
        var context = UIGraphicsGetCurrentContext();
        CGContextSaveGState(context);
        CGContextTranslateCTM(context, 0.0, originalImage.size.height);
        CGContextScaleCTM(context, 1.0, -1.0);
        originalImage.drawInRect(CGRectMake(0, 0, originalImage.size.width, originalImage.size.height));
        CGContextRestoreGState(context);
        var flippedImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        return flippedImage;
    }
})(ios = exports.ios || (exports.ios = {}));
function drawClipPath(nativeView, background) {
    var path;
    var bounds = {
        left: nativeView.bounds.origin.x,
        top: nativeView.bounds.origin.y,
        bottom: nativeView.bounds.size.height,
        right: nativeView.bounds.size.width
    };
    if (bounds.right === 0 || bounds.bottom === 0) {
        return;
    }
    var clipPath = background.clipPath;
    var functionName = clipPath.substring(0, clipPath.indexOf("("));
    var value = clipPath.replace(functionName + "(", "").replace(")", "");
    if (functionName === "rect") {
        var arr = value.split(/[\s]+/);
        var top = common.cssValueToDevicePixels(arr[0], bounds.top);
        var right = common.cssValueToDevicePixels(arr[1], bounds.right);
        var bottom = common.cssValueToDevicePixels(arr[2], bounds.bottom);
        var left = common.cssValueToDevicePixels(arr[3], bounds.left);
        path = UIBezierPath.bezierPathWithRect(CGRectMake(left, top, right - left, bottom - top)).CGPath;
    }
    else if (functionName === "inset") {
        var arr = value.split(/[\s]+/);
        var topString = void 0;
        var rightString = void 0;
        var bottomString = void 0;
        var leftString = void 0;
        if (arr.length === 1) {
            topString = rightString = bottomString = leftString = arr[0];
        }
        else if (arr.length === 2) {
            topString = bottomString = arr[0];
            rightString = leftString = arr[1];
        }
        else if (arr.length === 3) {
            topString = arr[0];
            rightString = leftString = arr[1];
            bottomString = arr[2];
        }
        else if (arr.length === 4) {
            topString = arr[0];
            rightString = arr[1];
            bottomString = arr[2];
            leftString = arr[3];
        }
        var top = common.cssValueToDevicePixels(topString, bounds.bottom);
        var right = common.cssValueToDevicePixels("100%", bounds.right) - common.cssValueToDevicePixels(rightString, bounds.right);
        var bottom = common.cssValueToDevicePixels("100%", bounds.bottom) - common.cssValueToDevicePixels(bottomString, bounds.bottom);
        var left = common.cssValueToDevicePixels(leftString, bounds.right);
        path = UIBezierPath.bezierPathWithRect(CGRectMake(left, top, right - left, bottom - top)).CGPath;
    }
    else if (functionName === "circle") {
        var arr = value.split(/[\s]+/);
        var radius = common.cssValueToDevicePixels(arr[0], (bounds.right > bounds.bottom ? bounds.bottom : bounds.right) / 2);
        var y = common.cssValueToDevicePixels(arr[2], bounds.bottom);
        var x = common.cssValueToDevicePixels(arr[3], bounds.right);
        path = UIBezierPath.bezierPathWithArcCenterRadiusStartAngleEndAngleClockwise(CGPointMake(x, y), radius, 0, 360, true).CGPath;
    }
    else if (functionName === "ellipse") {
        var arr = value.split(/[\s]+/);
        var rX = common.cssValueToDevicePixels(arr[0], bounds.right);
        var rY = common.cssValueToDevicePixels(arr[1], bounds.bottom);
        var cX = common.cssValueToDevicePixels(arr[3], bounds.right);
        var cY = common.cssValueToDevicePixels(arr[4], bounds.bottom);
        var left = cX - rX;
        var top = cY - rY;
        var width = rX * 2;
        var height = rY * 2;
        path = UIBezierPath.bezierPathWithOvalInRect(CGRectMake(left, top, width, height)).CGPath;
    }
    else if (functionName === "polygon") {
        path = CGPathCreateMutable();
        var firstPoint;
        var arr = value.split(/[,]+/);
        for (var i = 0; i < arr.length; i++) {
            var xy = arr[i].trim().split(/[\s]+/);
            var point = {
                x: common.cssValueToDevicePixels(xy[0], bounds.right),
                y: common.cssValueToDevicePixels(xy[1], bounds.bottom)
            };
            if (!firstPoint) {
                firstPoint = point;
                CGPathMoveToPoint(path, null, point.x, point.y);
            }
            CGPathAddLineToPoint(path, null, point.x, point.y);
        }
        CGPathAddLineToPoint(path, null, firstPoint.x, firstPoint.y);
    }
    if (path) {
        var shape = CAShapeLayer.layer();
        shape.path = path;
        nativeView.layer.mask = shape;
        nativeView.clipsToBounds = true;
        var borderWidth = background.getUniformBorderWidth();
        var borderColor = background.getUniformBorderColor();
        if (borderWidth > 0 && borderColor instanceof color_1.Color) {
            var borderLayer = CAShapeLayer.layer();
            borderLayer.path = path;
            borderLayer.lineWidth = borderWidth * 2;
            borderLayer.strokeColor = borderColor.ios.CGColor;
            borderLayer.fillColor = utils.ios.getter(UIColor, UIColor.clearColor).CGColor;
            borderLayer.frame = nativeView.bounds;
            nativeView.layer.borderColor = undefined;
            nativeView.layer.borderWidth = 0;
            nativeView.layer.addSublayer(borderLayer);
        }
    }
}
//# sourceMappingURL=background.js.map