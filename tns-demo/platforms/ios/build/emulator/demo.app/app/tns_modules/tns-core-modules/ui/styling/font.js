var enums = require("ui/enums");
var common = require("./font-common");
var fs = require("file-system");
var utils = require("utils/utils");
var platform_1 = require("platform");
var EMULATE_OBLIQUE = true;
var OBLIQUE_TRANSFORM = CGAffineTransformMake(1, 0, 0.2, 1, 0, 0);
var DEFAULT_SERIF = "Times New Roman";
var DEFAULT_MONOSPACE = "Courier New";
var SUPPORT_FONT_WEIGHTS = parseFloat(platform_1.device.osVersion) >= 10.0;
var Font = (function (_super) {
    __extends(Font, _super);
    function Font(family, size, style, weight) {
        _super.call(this, family, size, style, weight);
    }
    Font.prototype.getUIFont = function (defaultFont) {
        if (!this._uiFont) {
            this._uiFont = createUIFont(this, defaultFont);
        }
        return this._uiFont;
    };
    Font.prototype.withFontFamily = function (family) {
        return new Font(family, this.fontSize, this.fontStyle, this.fontWeight);
    };
    Font.prototype.withFontStyle = function (style) {
        return new Font(this.fontFamily, this.fontSize, style, this.fontWeight);
    };
    Font.prototype.withFontWeight = function (weight) {
        return new Font(this.fontFamily, this.fontSize, this.fontStyle, weight);
    };
    Font.prototype.withFontSize = function (size) {
        return new Font(this.fontFamily, size, this.fontStyle, this.fontWeight);
    };
    Font.default = new Font(undefined, undefined, enums.FontStyle.normal, enums.FontWeight.normal);
    return Font;
}(common.Font));
exports.Font = Font;
function shouldUseSystemFont(fontFamily) {
    return !fontFamily ||
        fontFamily === common.genericFontFamilies.sansSerif ||
        fontFamily === common.genericFontFamilies.system;
}
function getNativeFontWeight(fontWeight) {
    switch (fontWeight) {
        case enums.FontWeight.thin:
            return UIFontWeightUltraLight;
        case enums.FontWeight.extraLight:
            return UIFontWeightThin;
        case enums.FontWeight.light:
            return UIFontWeightLight;
        case enums.FontWeight.normal:
        case "400":
        case undefined:
        case null:
            return UIFontWeightRegular;
        case enums.FontWeight.medium:
            return UIFontWeightMedium;
        case enums.FontWeight.semiBold:
            return UIFontWeightSemibold;
        case enums.FontWeight.bold:
        case "700":
            return UIFontWeightBold;
        case enums.FontWeight.extraBold:
            return UIFontWeightHeavy;
        case enums.FontWeight.black:
            return UIFontWeightBlack;
        default:
            throw new Error("Invalid font weight: \"" + fontWeight + "\"");
    }
}
function getFontFamilyRespectingGenericFonts(fontFamily) {
    if (!fontFamily) {
        return fontFamily;
    }
    switch (fontFamily.toLowerCase()) {
        case common.genericFontFamilies.serif:
            return DEFAULT_SERIF;
        case common.genericFontFamilies.monospace:
            return DEFAULT_MONOSPACE;
        default:
            return fontFamily;
    }
}
function getSystemFont(size, nativeWeight, italic, symbolicTraits) {
    var result = UIFont.systemFontOfSizeWeight(size, nativeWeight);
    if (italic) {
        var descriptor = utils.ios.getter(result, result.fontDescriptor).fontDescriptorWithSymbolicTraits(symbolicTraits);
        result = UIFont.fontWithDescriptorSize(descriptor, size);
    }
    return result;
}
function createUIFont(font, defaultFont) {
    var result;
    var size = font.fontSize || defaultFont.pointSize;
    var nativeWeight = getNativeFontWeight(font.fontWeight);
    var fontFamilies = common.parseFontFamily(font.fontFamily);
    var symbolicTraits = 0;
    if (font.isBold) {
        symbolicTraits |= 2;
    }
    if (font.isItalic) {
        symbolicTraits |= 1;
    }
    var fontDescriptorTraits = (_a = {},
        _a[UIFontSymbolicTrait] = symbolicTraits,
        _a
    );
    if (SUPPORT_FONT_WEIGHTS) {
        fontDescriptorTraits[UIFontWeightTrait] = nativeWeight;
    }
    for (var i = 0; i < fontFamilies.length; i++) {
        var fontFamily = getFontFamilyRespectingGenericFonts(fontFamilies[i]);
        if (shouldUseSystemFont(fontFamily)) {
            result = getSystemFont(size, nativeWeight, font.isItalic, symbolicTraits);
            break;
        }
        else {
            var fontAttributes = (_b = {},
                _b[UIFontDescriptorFamilyAttribute] = fontFamily,
                _b[UIFontDescriptorTraitsAttribute] = fontDescriptorTraits,
                _b
            );
            var descriptor = UIFontDescriptor.fontDescriptorWithFontAttributes(fontAttributes);
            result = UIFont.fontWithDescriptorSize(descriptor, size);
            var actualItalic = utils.ios.getter(result, result.fontDescriptor).symbolicTraits & 1;
            if (font.isItalic && !actualItalic && EMULATE_OBLIQUE) {
                descriptor = descriptor.fontDescriptorWithMatrix(OBLIQUE_TRANSFORM);
                result = UIFont.fontWithDescriptorSize(descriptor, size);
            }
            if (result.familyName === fontFamily) {
                break;
            }
            else {
                result = null;
            }
        }
    }
    if (!result) {
        result = getSystemFont(size, nativeWeight, font.isItalic, symbolicTraits);
    }
    return result;
    var _a, _b;
}
var ios;
(function (ios) {
    function registerFont(fontFile) {
        var filePath = fs.path.join(fs.knownFolders.currentApp().path, "fonts", fontFile);
        if (!fs.File.exists(filePath)) {
            filePath = fs.path.join(fs.knownFolders.currentApp().path, fontFile);
        }
        var fontData = utils.ios.getter(NSFileManager, NSFileManager.defaultManager).contentsAtPath(filePath);
        if (!fontData) {
            throw new Error("Could not load font from: " + fontFile);
        }
        var provider = CGDataProviderCreateWithCFData(fontData);
        var font = CGFontCreateWithDataProvider(provider);
        if (!font) {
            throw new Error("Could not load font from: " + fontFile);
        }
        var error = new interop.Reference();
        if (!CTFontManagerRegisterGraphicsFont(font, error)) {
            var trace = require("trace");
            if (trace.enabled) {
                trace.write("Error occur while registering font: " + CFErrorCopyDescription(error.value), trace.categories.Error, trace.messageType.error);
            }
        }
    }
    ios.registerFont = registerFont;
})(ios = exports.ios || (exports.ios = {}));
function registerFontsInFolder(fontsFolderPath) {
    var fontsFolder = fs.Folder.fromPath(fontsFolderPath);
    fontsFolder.eachEntity(function (fileEntity) {
        if (fs.Folder.exists(fs.path.join(fontsFolderPath, fileEntity.name))) {
            return true;
        }
        if (fileEntity instanceof fs.File &&
            (fileEntity.extension === ".ttf" || fileEntity.extension === ".otf")) {
            ios.registerFont(fileEntity.name);
        }
        return true;
    });
}
function registerCustomFonts() {
    var appDir = fs.knownFolders.currentApp().path;
    var fontsDir = fs.path.join(appDir, "fonts");
    if (fs.Folder.exists(fontsDir)) {
        registerFontsInFolder(fontsDir);
    }
}
registerCustomFonts();
//# sourceMappingURL=font.js.map