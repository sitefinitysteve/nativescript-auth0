require("globals");
var observable = require("data/observable");
var frame = require("ui/frame");
require("../bundle-entry-points");
var builder;
function ensureBuilder() {
    if (!builder) {
        builder = require("ui/builder");
    }
}
var platform;
function ensurePlatform() {
    if (!platform) {
        platform = require("platform");
    }
}
var fileNameResolver;
function ensureFileNameResolver() {
    if (!fileNameResolver) {
        fileNameResolver = require("file-system/file-name-resolver");
    }
}
var styleScope = undefined;
var events = new observable.Observable();
global.moduleMerge(events, exports);
exports.launchEvent = "launch";
exports.suspendEvent = "suspend";
exports.resumeEvent = "resume";
exports.exitEvent = "exit";
exports.lowMemoryEvent = "lowMemory";
exports.uncaughtErrorEvent = "uncaughtError";
exports.orientationChangedEvent = "orientationChanged";
exports.cssFile = "app.css";
function setCssFileName(cssFileName) {
    exports.cssFile = cssFileName;
}
exports.setCssFileName = setCssFileName;
exports.appSelectors = [];
exports.additionalSelectors = [];
exports.cssSelectors = [];
exports.cssSelectorVersion = 0;
exports.keyframes = {};
exports.resources = {};
function setResources(res) {
    exports.resources = res;
}
exports.setResources = setResources;
exports.onUncaughtError = undefined;
exports.onLaunch = undefined;
exports.onSuspend = undefined;
exports.onResume = undefined;
exports.onExit = undefined;
exports.onLowMemory = undefined;
exports.android = undefined;
exports.ios = undefined;
function loadCss(cssFile) {
    if (!cssFile) {
        return undefined;
    }
    var result;
    var fs = require("file-system");
    if (!styleScope) {
        styleScope = require("ui/styling/style-scope");
    }
    var cssFileName = fs.path.join(fs.knownFolders.currentApp().path, cssFile);
    if (fs.File.exists(cssFileName)) {
        var file = fs.File.fromPath(cssFileName);
        var applicationCss = file.readTextSync();
        if (applicationCss) {
            result = parseCss(applicationCss, cssFileName);
        }
    }
    return result;
}
exports.loadCss = loadCss;
function mergeCssSelectors(module) {
    module.cssSelectors = module.appSelectors.slice();
    module.cssSelectors.push.apply(module.cssSelectors, module.additionalSelectors);
    module.cssSelectorVersion++;
}
exports.mergeCssSelectors = mergeCssSelectors;
function parseCss(cssText, cssFileName) {
    if (!styleScope) {
        styleScope = require("ui/styling/style-scope");
    }
    return styleScope.StyleScope.createSelectorsFromCss(cssText, cssFileName, exports.keyframes);
}
exports.parseCss = parseCss;
function __onLiveSync() {
    if (global.errorPage) {
        global.errorPage.closeModal();
        global.errorPage = undefined;
    }
    try {
        ensureFileNameResolver();
        fileNameResolver.clearCache();
        loadCss();
        global.__onLiveSyncCore();
    }
    catch (ex) {
        ensureBuilder();
        global.errorPage = builder.parse("<Page><ScrollView><Label text=\"" + ex + "\" textWrap=\"true\" style=\"color: red;\" /></ScrollView></Page>");
        global.errorPage.showModal();
    }
}
exports.__onLiveSync = __onLiveSync;
function __onLiveSyncCore() {
    frame.reloadPage();
}
exports.__onLiveSyncCore = __onLiveSyncCore;
global.__onLiveSyncCore = __onLiveSyncCore;
function _onOrientationChanged() {
    ensurePlatform();
    platform.screen.mainScreen._invalidate();
    ensureFileNameResolver();
    fileNameResolver._invalidateResolverInstance();
}
exports._onOrientationChanged = _onOrientationChanged;
//# sourceMappingURL=application-common.js.map