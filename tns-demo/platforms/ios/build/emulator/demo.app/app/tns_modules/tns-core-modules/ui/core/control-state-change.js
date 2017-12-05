var ObserverClass = (function (_super) {
    __extends(ObserverClass, _super);
    function ObserverClass() {
        _super.apply(this, arguments);
    }
    ObserverClass.prototype.observeValueForKeyPathOfObjectChangeContext = function (path, obj, change, context) {
        if (path === "selected") {
            this["_owner"]._onSelectedChanged();
        }
        else if (path === "enabled") {
            this["_owner"]._onEnabledChanged();
        }
        else if (path === "highlighted") {
            this["_owner"]._onHighlightedChanged();
        }
    };
    return ObserverClass;
}(NSObject));
var ControlStateChangeListener = (function () {
    function ControlStateChangeListener(control, callback) {
        this._observing = false;
        this._observer = ObserverClass.alloc();
        this._observer["_owner"] = this;
        this._control = control;
        this._callback = callback;
    }
    ControlStateChangeListener.prototype.start = function () {
        if (!this._observing) {
            this._control.addObserverForKeyPathOptionsContext(this._observer, "highlighted", 1, null);
            this._observing = true;
            this._updateState();
        }
    };
    ControlStateChangeListener.prototype.stop = function () {
        if (this._observing) {
            this._observing = false;
            this._control.removeObserverForKeyPath(this._observer, "highlighted");
        }
    };
    ControlStateChangeListener.prototype._onEnabledChanged = function () {
        this._updateState();
    };
    ControlStateChangeListener.prototype._onSelectedChanged = function () {
        this._updateState();
    };
    ControlStateChangeListener.prototype._onHighlightedChanged = function () {
        this._updateState();
    };
    ControlStateChangeListener.prototype._updateState = function () {
        var state = "normal";
        if (this._control.highlighted) {
            state = "highlighted";
        }
        this._callback(state);
    };
    return ControlStateChangeListener;
}());
exports.ControlStateChangeListener = ControlStateChangeListener;
//# sourceMappingURL=control-state-change.js.map