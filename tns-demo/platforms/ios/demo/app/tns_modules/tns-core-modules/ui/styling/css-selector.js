var types_1 = require("utils/types");
var utils_1 = require("utils/utils");
var selectorParser = require("./css-selector-parser");
var Match;
(function (Match) {
    Match.Dynamic = true;
    Match.Static = false;
})(Match || (Match = {}));
function SelectorProperties(specificity, rarity, dynamic) {
    if (dynamic === void 0) { dynamic = false; }
    return function (cls) {
        cls.prototype.specificity = specificity;
        cls.prototype.rarity = rarity;
        cls.prototype.combinator = "";
        cls.prototype.dynamic = dynamic;
        return cls;
    };
}
var SelectorCore = (function () {
    function SelectorCore() {
    }
    SelectorCore.prototype.lookupSort = function (sorter, base) { sorter.sortAsUniversal(base || this); };
    SelectorCore = __decorate([
        SelectorProperties(0, 0, Match.Static)
    ], SelectorCore);
    return SelectorCore;
}());
exports.SelectorCore = SelectorCore;
var SimpleSelector = (function (_super) {
    __extends(SimpleSelector, _super);
    function SimpleSelector() {
        _super.apply(this, arguments);
    }
    SimpleSelector.prototype.accumulateChanges = function (node, map) {
        if (!this.dynamic) {
            return this.match(node);
        }
        else if (this.mayMatch(node)) {
            this.trackChanges(node, map);
            return true;
        }
        return false;
    };
    SimpleSelector.prototype.mayMatch = function (node) { return this.match(node); };
    SimpleSelector.prototype.trackChanges = function (node, map) {
    };
    return SimpleSelector;
}(SelectorCore));
exports.SimpleSelector = SimpleSelector;
function wrap(text) {
    return text ? " " + text + " " : "";
}
var InvalidSelector = (function (_super) {
    __extends(InvalidSelector, _super);
    function InvalidSelector(e) {
        _super.call(this);
        this.e = e;
    }
    InvalidSelector.prototype.toString = function () { return "<error: " + this.e + ">"; };
    InvalidSelector.prototype.match = function (node) { return false; };
    InvalidSelector.prototype.lookupSort = function (sorter, base) {
    };
    InvalidSelector = __decorate([
        SelectorProperties(0, 4, Match.Static)
    ], InvalidSelector);
    return InvalidSelector;
}(SimpleSelector));
exports.InvalidSelector = InvalidSelector;
var UniversalSelector = (function (_super) {
    __extends(UniversalSelector, _super);
    function UniversalSelector() {
        _super.apply(this, arguments);
    }
    UniversalSelector.prototype.toString = function () { return "*" + wrap(this.combinator); };
    UniversalSelector.prototype.match = function (node) { return true; };
    UniversalSelector = __decorate([
        SelectorProperties(0, 0, Match.Static)
    ], UniversalSelector);
    return UniversalSelector;
}(SimpleSelector));
exports.UniversalSelector = UniversalSelector;
var IdSelector = (function (_super) {
    __extends(IdSelector, _super);
    function IdSelector(id) {
        _super.call(this);
        this.id = id;
    }
    IdSelector.prototype.toString = function () { return "#" + this.id + wrap(this.combinator); };
    IdSelector.prototype.match = function (node) { return node.id === this.id; };
    IdSelector.prototype.lookupSort = function (sorter, base) { sorter.sortById(this.id, base || this); };
    IdSelector = __decorate([
        SelectorProperties(65536, 3, Match.Static)
    ], IdSelector);
    return IdSelector;
}(SimpleSelector));
exports.IdSelector = IdSelector;
var TypeSelector = (function (_super) {
    __extends(TypeSelector, _super);
    function TypeSelector(cssType) {
        _super.call(this);
        this.cssType = cssType;
    }
    TypeSelector.prototype.toString = function () { return "" + this.cssType + wrap(this.combinator); };
    TypeSelector.prototype.match = function (node) { return node.cssType === this.cssType; };
    TypeSelector.prototype.lookupSort = function (sorter, base) { sorter.sortByType(this.cssType, base || this); };
    TypeSelector = __decorate([
        SelectorProperties(1, 1, Match.Static)
    ], TypeSelector);
    return TypeSelector;
}(SimpleSelector));
exports.TypeSelector = TypeSelector;
var ClassSelector = (function (_super) {
    __extends(ClassSelector, _super);
    function ClassSelector(cssClass) {
        _super.call(this);
        this.cssClass = cssClass;
    }
    ClassSelector.prototype.toString = function () { return "." + this.cssClass + wrap(this.combinator); };
    ClassSelector.prototype.match = function (node) { return node.cssClasses && node.cssClasses.has(this.cssClass); };
    ClassSelector.prototype.lookupSort = function (sorter, base) { sorter.sortByClass(this.cssClass, base || this); };
    ClassSelector = __decorate([
        SelectorProperties(256, 2, Match.Static)
    ], ClassSelector);
    return ClassSelector;
}(SimpleSelector));
exports.ClassSelector = ClassSelector;
var AttributeSelector = (function (_super) {
    __extends(AttributeSelector, _super);
    function AttributeSelector(attribute, test, value) {
        _super.call(this);
        this.attribute = attribute;
        this.test = test;
        this.value = value;
        if (!test) {
            this.match = function (node) { return !types_1.isNullOrUndefined(node[attribute]); };
            return;
        }
        if (!value) {
            this.match = function (node) { return false; };
        }
        var escapedValue = utils_1.escapeRegexSymbols(value);
        var regexp = null;
        switch (test) {
            case "^=":
                regexp = new RegExp("^" + escapedValue);
                break;
            case "$=":
                regexp = new RegExp(escapedValue + "$");
                break;
            case "*=":
                regexp = new RegExp(escapedValue);
                break;
            case "=":
                regexp = new RegExp("^" + escapedValue + "$");
                break;
            case "~=":
                if (/\s/.test(value)) {
                    this.match = function (node) { return false; };
                    return;
                }
                regexp = new RegExp("(^|\\s)" + escapedValue + "(\\s|$)");
                break;
            case "|=":
                regexp = new RegExp("^" + escapedValue + "(-|$)");
                break;
        }
        if (regexp) {
            this.match = function (node) { return regexp.test(node[attribute] + ""); };
            return;
        }
        else {
            this.match = function (node) { return false; };
            return;
        }
    }
    AttributeSelector.prototype.toString = function () { return "[" + this.attribute + wrap(this.test) + ((this.test && this.value) || '') + "]" + wrap(this.combinator); };
    AttributeSelector.prototype.match = function (node) { return false; };
    AttributeSelector.prototype.mayMatch = function (node) { return true; };
    AttributeSelector.prototype.trackChanges = function (node, map) { map.addAttribute(node, this.attribute); };
    AttributeSelector = __decorate([
        SelectorProperties(256, 0, Match.Dynamic)
    ], AttributeSelector);
    return AttributeSelector;
}(SimpleSelector));
exports.AttributeSelector = AttributeSelector;
var PseudoClassSelector = (function (_super) {
    __extends(PseudoClassSelector, _super);
    function PseudoClassSelector(cssPseudoClass) {
        _super.call(this);
        this.cssPseudoClass = cssPseudoClass;
    }
    PseudoClassSelector.prototype.toString = function () { return ":" + this.cssPseudoClass + wrap(this.combinator); };
    PseudoClassSelector.prototype.match = function (node) { return node.cssPseudoClasses && node.cssPseudoClasses.has(this.cssPseudoClass); };
    PseudoClassSelector.prototype.mayMatch = function (node) { return true; };
    PseudoClassSelector.prototype.trackChanges = function (node, map) { map.addPseudoClass(node, this.cssPseudoClass); };
    PseudoClassSelector = __decorate([
        SelectorProperties(256, 0, Match.Dynamic)
    ], PseudoClassSelector);
    return PseudoClassSelector;
}(SimpleSelector));
exports.PseudoClassSelector = PseudoClassSelector;
var SimpleSelectorSequence = (function (_super) {
    __extends(SimpleSelectorSequence, _super);
    function SimpleSelectorSequence(selectors) {
        _super.call(this);
        this.selectors = selectors;
        this.specificity = selectors.reduce(function (sum, sel) { return sel.specificity + sum; }, 0);
        this.head = this.selectors.reduce(function (prev, curr) { return !prev || (curr.rarity > prev.rarity) ? curr : prev; }, null);
        this.dynamic = selectors.some(function (sel) { return sel.dynamic; });
    }
    SimpleSelectorSequence.prototype.toString = function () { return "" + this.selectors.join("") + wrap(this.combinator); };
    SimpleSelectorSequence.prototype.match = function (node) { return this.selectors.every(function (sel) { return sel.match(node); }); };
    SimpleSelectorSequence.prototype.mayMatch = function (node) {
        return this.selectors.every(function (sel) { return sel.mayMatch(node); });
    };
    SimpleSelectorSequence.prototype.trackChanges = function (node, map) {
        this.selectors.forEach(function (sel) { return sel.trackChanges(node, map); });
    };
    SimpleSelectorSequence.prototype.lookupSort = function (sorter, base) {
        this.head.lookupSort(sorter, base || this);
    };
    return SimpleSelectorSequence;
}(SimpleSelector));
exports.SimpleSelectorSequence = SimpleSelectorSequence;
var Selector = (function (_super) {
    __extends(Selector, _super);
    function Selector(selectors) {
        _super.call(this);
        this.selectors = selectors;
        var lastGroup;
        var groups = [];
        selectors.reverse().forEach(function (sel) {
            switch (sel.combinator) {
                case undefined:
                case " ":
                    groups.push(lastGroup = []);
                case ">":
                    lastGroup.push(sel);
                    break;
                default:
                    throw new Error("Unsupported combinator \"" + sel.combinator + "\".");
            }
        });
        this.groups = groups.map(function (g) { return new Selector.ChildGroup(g); });
        this.last = selectors[0];
        this.specificity = selectors.reduce(function (sum, sel) { return sel.specificity + sum; }, 0);
        this.dynamic = selectors.some(function (sel) { return sel.dynamic; });
    }
    Selector.prototype.toString = function () { return this.selectors.join(""); };
    Selector.prototype.match = function (node) {
        return this.groups.every(function (group, i) {
            if (i === 0) {
                node = group.match(node);
                return !!node;
            }
            else {
                var ancestor = node;
                while (ancestor = ancestor.parent) {
                    if (node = group.match(ancestor)) {
                        return true;
                    }
                }
                return false;
            }
        });
    };
    Selector.prototype.lookupSort = function (sorter, base) {
        this.last.lookupSort(sorter, this);
    };
    Selector.prototype.accumulateChanges = function (node, map) {
        if (!this.dynamic) {
            return this.match(node);
        }
        var bounds = [];
        var mayMatch = this.groups.every(function (group, i) {
            if (i === 0) {
                var nextNode = group.mayMatch(node);
                bounds.push({ left: node, right: node });
                node = nextNode;
                return !!node;
            }
            else {
                var ancestor = node;
                while (ancestor = ancestor.parent) {
                    var nextNode = group.mayMatch(ancestor);
                    if (nextNode) {
                        bounds.push({ left: ancestor, right: null });
                        node = nextNode;
                        return true;
                    }
                }
                return false;
            }
        });
        if (!mayMatch) {
            return false;
        }
        if (!map) {
            return mayMatch;
        }
        for (var i = 0; i < this.groups.length; i++) {
            var group_1 = this.groups[i];
            if (!group_1.dynamic) {
                continue;
            }
            var bound = bounds[i];
            var node_1 = bound.left;
            do {
                if (group_1.mayMatch(node_1)) {
                    group_1.trackChanges(node_1, map);
                }
            } while ((node_1 !== bound.right) && (node_1 = node_1.parent));
        }
        return mayMatch;
    };
    return Selector;
}(SelectorCore));
exports.Selector = Selector;
var Selector;
(function (Selector) {
    var ChildGroup = (function () {
        function ChildGroup(selectors) {
            this.selectors = selectors;
            this.dynamic = selectors.some(function (sel) { return sel.dynamic; });
        }
        ChildGroup.prototype.match = function (node) {
            return this.selectors.every(function (sel, i) { return (i === 0 ? node : node = node.parent) && sel.match(node); }) ? node : null;
        };
        ChildGroup.prototype.mayMatch = function (node) {
            return this.selectors.every(function (sel, i) { return (i === 0 ? node : node = node.parent) && sel.mayMatch(node); }) ? node : null;
        };
        ChildGroup.prototype.trackChanges = function (node, map) {
            this.selectors.forEach(function (sel, i) { return (i === 0 ? node : node = node.parent) && sel.trackChanges(node, map); });
        };
        return ChildGroup;
    }());
    Selector.ChildGroup = ChildGroup;
})(Selector = exports.Selector || (exports.Selector = {}));
var RuleSet = (function () {
    function RuleSet(selectors, declarations) {
        var _this = this;
        this.selectors = selectors;
        this.declarations = declarations;
        this.selectors.forEach(function (sel) { return sel.ruleset = _this; });
    }
    RuleSet.prototype.toString = function () { return this.selectors.join(", ") + " {" + this.declarations.map(function (d, i) { return ("" + (i === 0 ? " " : "") + d.property + ": " + d.value); }).join("; ") + " }"; };
    RuleSet.prototype.lookupSort = function (sorter) { this.selectors.forEach(function (sel) { return sel.lookupSort(sorter); }); };
    return RuleSet;
}());
exports.RuleSet = RuleSet;
function fromAstNodes(astRules) {
    return astRules.filter(isRule).map(function (rule) {
        var declarations = rule.declarations.filter(isDeclaration).map(createDeclaration);
        var selectors = rule.selectors.map(createSelector);
        var ruleset = new RuleSet(selectors, declarations);
        return ruleset;
    });
}
exports.fromAstNodes = fromAstNodes;
function createDeclaration(decl) {
    return { property: decl.property.toLowerCase(), value: decl.value };
}
function createSelector(sel) {
    try {
        var ast = selectorParser.parse(sel);
        if (ast.length === 0) {
            return new InvalidSelector(new Error("Empty selector"));
        }
        var selectors = ast.map(createSimpleSelector);
        var sequences = [];
        for (var seqStart = 0, seqEnd = 0, last = selectors.length - 1; seqEnd <= last; seqEnd++) {
            var sel_1 = selectors[seqEnd];
            var astComb = ast[seqEnd].comb;
            if (astComb || seqEnd === last) {
                if (seqStart === seqEnd) {
                    sel_1.combinator = astComb;
                    sequences.push(sel_1);
                }
                else {
                    var sequence = new SimpleSelectorSequence(selectors.slice(seqStart, seqEnd + 1));
                    sequence.combinator = astComb;
                    sequences.push(sequence);
                }
                seqStart = seqEnd + 1;
            }
        }
        if (sequences.length === 1) {
            return sequences[0];
        }
        else {
            return new Selector(sequences);
        }
    }
    catch (e) {
        return new InvalidSelector(e);
    }
}
function createSimpleSelector(sel) {
    if (selectorParser.isUniversal(sel)) {
        return new UniversalSelector();
    }
    else if (selectorParser.isId(sel)) {
        return new IdSelector(sel.ident);
    }
    else if (selectorParser.isType(sel)) {
        return new TypeSelector(sel.ident.replace(/-/, '').toLowerCase());
    }
    else if (selectorParser.isClass(sel)) {
        return new ClassSelector(sel.ident);
    }
    else if (selectorParser.isPseudo(sel)) {
        return new PseudoClassSelector(sel.ident);
    }
    else if (selectorParser.isAttribute(sel)) {
        if (sel.test) {
            return new AttributeSelector(sel.prop, sel.test, sel.value);
        }
        else {
            return new AttributeSelector(sel.prop);
        }
    }
}
function isRule(node) {
    return node.type === "rule";
}
function isDeclaration(node) {
    return node.type === "declaration";
}
var SelectorsMap = (function () {
    function SelectorsMap(rulesets) {
        var _this = this;
        this.id = {};
        this.class = {};
        this.type = {};
        this.universal = [];
        this.position = 0;
        rulesets.forEach(function (rule) { return rule.lookupSort(_this); });
    }
    SelectorsMap.prototype.query = function (node) {
        var _this = this;
        var selectorClasses = [
            this.universal,
            this.id[node.id],
            this.type[node.cssType]
        ];
        if (node.cssClasses) {
            node.cssClasses.forEach(function (c) { return selectorClasses.push(_this.class[c]); });
        }
        var selectors = selectorClasses
            .filter(function (arr) { return !!arr; })
            .reduce(function (cur, next) { return cur.concat(next); }, []);
        var selectorsMatch = new SelectorsMatch();
        selectorsMatch.selectors = selectors
            .filter(function (sel) { return sel.sel.accumulateChanges(node, selectorsMatch); })
            .sort(function (a, b) { return a.sel.specificity - b.sel.specificity || a.pos - b.pos; })
            .map(function (docSel) { return docSel.sel; });
        return selectorsMatch;
    };
    SelectorsMap.prototype.sortById = function (id, sel) { this.addToMap(this.id, id, sel); };
    SelectorsMap.prototype.sortByClass = function (cssClass, sel) {
        this.addToMap(this.class, cssClass, sel);
    };
    SelectorsMap.prototype.sortByType = function (cssType, sel) {
        this.addToMap(this.type, cssType, sel);
    };
    SelectorsMap.prototype.sortAsUniversal = function (sel) { this.universal.push(this.makeDocSelector(sel)); };
    SelectorsMap.prototype.addToMap = function (map, head, sel) {
        this.position++;
        var list = map[head];
        if (list) {
            list.push(this.makeDocSelector(sel));
        }
        else {
            map[head] = [this.makeDocSelector(sel)];
        }
    };
    SelectorsMap.prototype.makeDocSelector = function (sel) {
        return { sel: sel, pos: this.position++ };
    };
    return SelectorsMap;
}());
exports.SelectorsMap = SelectorsMap;
var SelectorsMatch = (function () {
    function SelectorsMatch() {
        this.changeMap = new Map();
    }
    SelectorsMatch.prototype.addAttribute = function (node, attribute) {
        var deps = this.properties(node);
        if (!deps.attributes) {
            deps.attributes = new Set();
        }
        deps.attributes.add(attribute);
    };
    SelectorsMatch.prototype.addPseudoClass = function (node, pseudoClass) {
        var deps = this.properties(node);
        if (!deps.pseudoClasses) {
            deps.pseudoClasses = new Set();
        }
        deps.pseudoClasses.add(pseudoClass);
    };
    SelectorsMatch.prototype.properties = function (node) {
        var set = this.changeMap.get(node);
        if (!set) {
            this.changeMap.set(node, set = {});
        }
        return set;
    };
    return SelectorsMatch;
}());
exports.SelectorsMatch = SelectorsMatch;
//# sourceMappingURL=css-selector.js.map