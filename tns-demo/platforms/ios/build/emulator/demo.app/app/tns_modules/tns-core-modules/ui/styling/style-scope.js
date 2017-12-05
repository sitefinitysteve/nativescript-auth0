var trace = require("trace");
var cssSelector = require("ui/styling/css-selector");
var cssParser = require("css");
var application = require("application");
var keyframeAnimation = require("ui/animation/keyframe-animation");
var cssAnimationParser = require("./css-animation-parser");
var observable = require("ui/core/dependency-observable");
var utils_1 = require("utils/utils");
var css_selector_1 = require("ui/styling/css-selector");
var style_property_1 = require("ui/styling/style-property");
var special_properties_1 = require("ui/builder/special-properties");
var animationsSymbol = Symbol("animations");
var types;
function ensureTypes() {
    if (!types) {
        types = require("utils/types");
    }
}
var fs;
function ensureFS() {
    if (!fs) {
        fs = require("file-system");
    }
}
var pattern = /('|")(.*?)\1/;
var CssState = (function () {
    function CssState(view, match) {
        this.view = view;
        this.match = match;
    }
    Object.defineProperty(CssState.prototype, "changeMap", {
        get: function () {
            return this.match.changeMap;
        },
        enumerable: true,
        configurable: true
    });
    CssState.prototype.apply = function () {
        var _this = this;
        this.view.style._resetCssValues();
        var matchingSelectors = this.match.selectors.filter(function (sel) { return sel.dynamic ? sel.match(_this.view) : true; });
        matchingSelectors.forEach(function (s) { return applyDescriptors(_this.view, s.ruleset); });
    };
    return CssState;
}());
exports.CssState = CssState;
var StyleScope = (function () {
    function StyleScope() {
        this._statesByKey = {};
        this._viewIdToKey = {};
        this._localCssSelectors = [];
        this._localCssSelectorVersion = 0;
        this._localCssSelectorsAppliedVersion = 0;
        this._applicationCssSelectorsAppliedVersion = 0;
        this._keyframes = {};
    }
    Object.defineProperty(StyleScope.prototype, "css", {
        get: function () {
            return this._css;
        },
        set: function (value) {
            this._cssFileName = undefined;
            this.setCss(value);
        },
        enumerable: true,
        configurable: true
    });
    StyleScope.prototype.addCss = function (cssString, cssFileName) {
        this.setCss(cssString, cssFileName, true);
    };
    StyleScope.prototype.setCss = function (cssString, cssFileName, append) {
        if (append === void 0) { append = false; }
        this._css = this._css && append ? this._css + cssString : cssString;
        if (cssFileName) {
            this._cssFileName = cssFileName;
        }
        this._reset();
        var parsedSelectors = StyleScope.createSelectorsFromCss(this._css, cssFileName, this._keyframes);
        if (append) {
            this._localCssSelectors.push.apply(this._localCssSelectors, parsedSelectors);
        }
        else {
            this._localCssSelectors = parsedSelectors;
        }
        this._localCssSelectorVersion++;
        this.ensureSelectors();
    };
    StyleScope.prototype.getKeyframeAnimationWithName = function (animationName) {
        var keyframes = this._keyframes[animationName];
        if (keyframes !== undefined) {
            var animation = new keyframeAnimation.KeyframeAnimationInfo();
            animation.keyframes = cssAnimationParser.CssAnimationParser.keyframesArrayFromCSS(keyframes);
            return animation;
        }
        return undefined;
    };
    StyleScope.createSelectorsFromCss = function (css, cssFileName, keyframes) {
        try {
            var pageCssSyntaxTree = css ? cssParser.parse(css, { source: cssFileName }) : null;
            var pageCssSelectors = [];
            if (pageCssSyntaxTree) {
                pageCssSelectors = pageCssSelectors.concat(StyleScope.createSelectorsFromImports(pageCssSyntaxTree, keyframes));
                pageCssSelectors = pageCssSelectors.concat(StyleScope.createSelectorsFromSyntaxTree(pageCssSyntaxTree, keyframes));
            }
            return pageCssSelectors;
        }
        catch (e) {
            trace.write("Css styling failed: " + e, trace.categories.Error, trace.messageType.error);
        }
    };
    StyleScope.createSelectorsFromImports = function (tree, keyframes) {
        var selectors = [];
        ensureTypes();
        if (!types.isNullOrUndefined(tree)) {
            var imports = tree["stylesheet"]["rules"].filter(function (r) { return r.type === "import"; });
            for (var i = 0; i < imports.length; i++) {
                var importItem = imports[i]["import"];
                var match = importItem && importItem.match(pattern);
                var url = match && match[2];
                if (!types.isNullOrUndefined(url)) {
                    ensureFS();
                    var appDirectory = fs.knownFolders.currentApp().path;
                    var fileName = resolveFileNameFromUrl(url, appDirectory, fs.File.exists);
                    if (fileName !== null) {
                        var file = fs.File.fromPath(fileName);
                        var text = file.readTextSync();
                        if (text) {
                            selectors = selectors.concat(StyleScope.createSelectorsFromCss(text, fileName, keyframes));
                        }
                    }
                }
            }
        }
        return selectors;
    };
    StyleScope.prototype.ensureSelectors = function () {
        var toMerge = [];
        if ((this._applicationCssSelectorsAppliedVersion !== application.cssSelectorVersion) ||
            (this._localCssSelectorVersion !== this._localCssSelectorsAppliedVersion) ||
            (!this._mergedCssSelectors)) {
            toMerge.push(application.cssSelectors);
            this._applicationCssSelectorsAppliedVersion = application.cssSelectorVersion;
            toMerge.push(this._localCssSelectors);
            this._localCssSelectorsAppliedVersion = this._localCssSelectorVersion;
            for (var keyframe in application.keyframes) {
                this._keyframes[keyframe] = application.keyframes[keyframe];
            }
        }
        if (toMerge.length > 0) {
            this._mergedCssSelectors = toMerge.filter(function (m) { return !!m; }).reduce(function (merged, next) { return merged.concat(next); }, []);
            this._applyKeyframesOnSelectors();
        }
        else {
            return false;
        }
        this._selectors = new css_selector_1.SelectorsMap(this._mergedCssSelectors);
        return true;
    };
    StyleScope.prototype.applySelectors = function (view) {
        this.ensureSelectors();
        var state = this._selectors.query(view);
        var nextState = new CssState(view, state);
        view._setCssState(nextState);
    };
    StyleScope.prototype.query = function (node) {
        this.ensureSelectors();
        return this._selectors.query(node).selectors;
    };
    StyleScope.createSelectorsFromSyntaxTree = function (ast, keyframes) {
        var nodes = ast.stylesheet.rules;
        nodes.filter(isKeyframe).forEach(function (node) { return keyframes[node.name] = node; });
        var rulesets = cssSelector.fromAstNodes(nodes);
        rulesets.forEach(function (rule) { return rule[animationsSymbol] = cssAnimationParser.CssAnimationParser.keyframeAnimationsFromCSSDeclarations(rule.declarations); });
        return rulesets;
    };
    StyleScope.prototype._reset = function () {
        this._statesByKey = {};
        this._viewIdToKey = {};
    };
    StyleScope.prototype._applyKeyframesOnSelectors = function () {
        for (var i = this._mergedCssSelectors.length - 1; i >= 0; i--) {
            var ruleset = this._mergedCssSelectors[i];
            var animations = ruleset[animationsSymbol];
            if (animations !== undefined) {
                for (var _i = 0, animations_1 = animations; _i < animations_1.length; _i++) {
                    var animation = animations_1[_i];
                    var keyframe = this._keyframes[animation.name];
                    if (keyframe !== undefined) {
                        animation.keyframes = cssAnimationParser.CssAnimationParser.keyframesArrayFromCSS(keyframe);
                    }
                }
            }
        }
    };
    StyleScope.prototype.getAnimations = function (ruleset) {
        return ruleset[animationsSymbol];
    };
    return StyleScope;
}());
exports.StyleScope = StyleScope;
function resolveFileNameFromUrl(url, appDirectory, fileExists) {
    var fileName = types.isString(url) ? url.trim() : "";
    if (fileName.indexOf("~/") === 0) {
        fileName = fileName.replace("~/", "");
    }
    var local = fs.path.join(appDirectory, fileName);
    if (fileExists(local)) {
        return local;
    }
    var external = fs.path.join(appDirectory, "tns_modules", fileName);
    if (fileExists(external)) {
        return external;
    }
    return null;
}
exports.resolveFileNameFromUrl = resolveFileNameFromUrl;
function applyInlineSyle(view, style) {
    try {
        var syntaxTree = cssParser.parse("local { " + style + " }", undefined);
        var filteredDeclarations = syntaxTree.stylesheet.rules.filter(isRule)[0].declarations.filter(isDeclaration);
        applyInlineStyle(view, filteredDeclarations);
    }
    catch (ex) {
        trace.write("Applying local style failed: " + ex, trace.categories.Error, trace.messageType.error);
    }
}
exports.applyInlineSyle = applyInlineSyle;
function isRule(node) {
    return node.type === "rule";
}
function isDeclaration(node) {
    return node.type === "declaration";
}
function isKeyframe(node) {
    return node.type === "keyframes";
}
function applyDescriptors(view, ruleset) {
    var modifier = observable.ValueSource.Css;
    ruleset.declarations.forEach(function (d) { return style_property_1.withStyleProperty(d.property, d.value, function (property, value) {
        if (types.isString(property)) {
            var propertyName = property;
            var attrHandled = false;
            var specialSetter = special_properties_1.getSpecialPropertySetter(propertyName);
            if (!attrHandled && specialSetter) {
                specialSetter(view, value);
                attrHandled = true;
            }
            if (!attrHandled && propertyName in view) {
                view[propertyName] = utils_1.convertString(value);
            }
        }
        else {
            var resolvedProperty = property;
            try {
                view.style._setValue(resolvedProperty, value, modifier);
            }
            catch (ex) {
                if (trace.enabled) {
                    trace.write("Error setting property: " + resolvedProperty.name + " view: " + view + " value: " + value + " " + ex, trace.categories.Style, trace.messageType.error);
                }
            }
        }
    }); });
    var ruleAnimations = ruleset[animationsSymbol];
    if (ruleAnimations && view.isLoaded && view._nativeView !== undefined) {
        var _loop_1 = function(animationInfo) {
            var animation = keyframeAnimation.KeyframeAnimation.keyframeAnimationFromInfo(animationInfo, modifier);
            if (animation) {
                view._registerAnimation(animation);
                animation.play(view)
                    .then(function () { view._unregisterAnimation(animation); })
                    .catch(function (e) { view._unregisterAnimation(animation); });
            }
        };
        for (var _i = 0, ruleAnimations_1 = ruleAnimations; _i < ruleAnimations_1.length; _i++) {
            var animationInfo = ruleAnimations_1[_i];
            _loop_1(animationInfo);
        }
    }
}
function applyInlineStyle(view, declarations) {
    declarations.forEach(function (d) { return style_property_1.withStyleProperty(d.property, d.value, function (property, value) {
        var resolvedProperty = property;
        view.style._setValue(resolvedProperty, value, observable.ValueSource.Local);
    }); });
}
//# sourceMappingURL=style-scope.js.map