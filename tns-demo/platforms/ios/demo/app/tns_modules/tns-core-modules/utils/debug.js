function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./debug-common"));
var ScopeError = (function (_super) {
    __extends(ScopeError, _super);
    function ScopeError(inner, message) {
        var formattedMessage;
        if (message && inner.message) {
            formattedMessage = message + "\n > " + inner.message.replace("\n", "\n  ");
        }
        else {
            formattedMessage = message || inner.message || undefined;
        }
        _super.call(this, formattedMessage);
        this.stack = inner.stack;
        this.message = formattedMessage;
    }
    return ScopeError;
}(Error));
exports.ScopeError = ScopeError;
var SourceError = (function (_super) {
    __extends(SourceError, _super);
    function SourceError(child, source, message) {
        _super.call(this, child, message ? message + " @" + source + "" : source + "");
    }
    return SourceError;
}(ScopeError));
exports.SourceError = SourceError;
//# sourceMappingURL=debug.js.map